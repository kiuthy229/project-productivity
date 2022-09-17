import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as cocossd from "@tensorflow-models/coco-ssd"
import { drawRect } from "./utilities";

const socket = io.connect("http://localhost:3000")

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <Webcam playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const canvasRef = useRef(null);
    const roomID = props.match.params.roomID;

    const runCoco = async () => {
        const net = await cocossd.load();
        
        //  Loop and detect hands
        setInterval(() => {
          detect(net);
        }, 10);
    };
    
    const detect = async (net) => {
        // Check data is available
        if (
          typeof userVideo.current !== "undefined" &&
          userVideo.current !== null &&
          userVideo.current.video.readyState === 4
        ) {
          const video = userVideo.current.video;
        //   const videoWidth = userVideo.current.video.videoWidth;
        //   const videoHeight = userVideo.current.video.videoHeight;
    
        //   userVideo.current.video.width = videoWidth;
        //   userVideo.current.video.height = videoHeight;
    
        //   canvasRef.current.width = videoWidth;
        //   canvasRef.current.height = videoHeight;
    
          const obj = await net.detect(video);
          for (var i in obj){
            if(obj[i].class === "cell phone" || obj[i].class === "remote"){
              console.log("are you holding a phone?")
            }
          }
    
          // Draw mesh
        //   const ctx = canvasRef.current.getContext("2d");
    
        //   drawRect(obj, ctx);
        }
    };
    
    useEffect(()=>{runCoco()},[]);

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Container>
            <Webcam muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </Container>
    );
};

export default Room;
