import React, { Fragment } from "react";
import io from "socket.io-client"
import { useState, useEffect } from "react"
import ToDoList from './ToDoList';
import MusicPlayer from "./MusicPlayer";
import Chat from "./Chat";
import Room from "./Room";

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

    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(username));
    }, [username]);

    useEffect(() => {
        localStorage.setItem('room', JSON.stringify(room));
    }, [room]);

    return (
        <div
          style={{
            display: "flex",
            padding: "0 1vw "
          }}
        >
            {/* {!showChat ? ( */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      height: "60vh",
                    }}
                  >
                    <div
                      style={{
                        background: "#FED6D7",
                        padding: "5vh",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                        margin: "1vw"
                      }}
                    >
                      <h3>Join A Chat</h3>
                      <input
                        style={{
                          padding: "2vh 1vw",
                          margin: " 1vh auto",
                          border: "none", 
                          borderRadius: "10px",
                          outline: "none"
                        }}
                        type="text" placeholder="Your Name..." onChange={(e)=>setUsername(e.target.value)}/>
                      <input
                        style={{
                          padding: "2vh 1vw",
                          margin: " 1vh auto",
                          border: "none", 
                          borderRadius: "10px",
                          outline: "none"
                        }}
                        type="text" placeholder="Room ID" onChange={(e)=>setRoom(e.target.value)}/>
                      <button
                        style={{
                          padding: "2vh 1vw",
                          margin: " 1vh 3vw",
                          border: "none", 
                          borderRadius: "10px",
                          background: "#EB6CAC",
                          color: "white", 
                          fontWeight: "bolder"
                        }}
                        onClick={joinRoom}
                      >Join</button>
                    </div>
                    
                    <Room></Room>
                  </div>
                    
                    <MusicPlayer></MusicPlayer>
                </div>
                
                <ToDoList></ToDoList>
                
                
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