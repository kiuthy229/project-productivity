import React, { Fragment } from "react";
import io from "socket.io-client"
import { useState, useEffect } from "react"
import Chat from "./Chat";
import Room from "./Room";
import app from "../firebase-config";

const socket = io.connect("http://localhost:3000");

function JoinRoom(props){
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    // const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username !== "" && room !== ""){
            socket.emit("join_room", room)
            props.history.push(`/room/${room}`);
            // setShowChat(true);
        }
    }

    const logout = () => {
        app.auth().signOut();
      }

    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(username));
    }, [username]);

    useEffect(() => {
        localStorage.setItem('room', JSON.stringify(room));
    }, [room]);

    return (
        <div>
            {/* {!showChat ? ( */}
                <div>
                    <h3>Join A Chat</h3>
                    <input type="text" placeholder="Your Name..." onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="text" placeholder="Room ID" onChange={(e)=>setRoom(e.target.value)}/>
                    <button onClick={joinRoom}>Join A Room</button>
                    <button onClick = {logout}>Logout</button>
                </div>
            {/* ) : (
                 <Fragment>
                     <Chat socket={socket} username={username} room={room} />
                     <Room/>
                 </Fragment>
             )} */}
        </div>
    )
}

export default JoinRoom;