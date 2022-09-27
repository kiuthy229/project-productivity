import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import ToDoList from './ToDoList';

const socket = io.connect("http://localhost:3000")

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <Webcam width={300} height={300} playsInline autoPlay ref={ref} />
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
    // const roomID = useParams();

    const [username, setUsername] = useState(() => {
        const saved = window.localStorage.getItem("username");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    const [roomID, setRoomID] = useState(() => {
        const saved = window.localStorage.getItem("username");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

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
          const videoWidth = userVideo.current.video.videoWidth;
          const videoHeight = userVideo.current.video.videoHeight;
    
          userVideo.current.video.width = videoWidth;
          userVideo.current.video.height = videoHeight;
    
          const obj = await net.detect(video);
          for (var i in obj){
            if(obj[i].class === "cell phone" || obj[i].class === "remote"){
              alert(`are you holding a ${obj[i].class}`)
            }
          }
        }
    };
    
    useEffect(()=>{runCoco()},[]);

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join_room", roomID);
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
            <Chat socket={socket} username={username} room={roomID} />
        </Container>
    );
};

export default Room;
