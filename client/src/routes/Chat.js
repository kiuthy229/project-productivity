import React, { useEffect, useState, useRef } from "react";

function Chat ({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    return <div
                style={{
                    background: "white",
                    padding: "5vh",
                    height: "18vh",
                    borderRadius: "10px",
                    margin: "0.5vw",
                    overflow: "auto",
                    width: "78%",
                }}  
                className="chat-window">
            <div
                className="chat-header"
            >
            <h3
                style={{
                    fontWeight: "bold",
                    color: "#EB6CAC"
                }}
            >Live Chat</h3>
            </div>
            <div className="chat-body">
            <div className="message-container">
                {messageList.map((messageContent) => {
                return (
                    <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                    >
                    <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
            <div className="chat-footer">
            <input
                style={{
                    padding: "2vh 1vw",
                    margin: " 1vh auto",
                    border: "none", 
                    borderRadius: "10px",
                    outline: "none", 
                    background: "#FED6D7"
                }}
                type="text"
                value={currentMessage}
                placeholder="Hey..."
                onChange={(event) => {
                setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
                }}
            />
            <button
                style={{
                    padding: "2vh 1vw",
                    margin: " 0.5vh auto",
                    border: "none", 
                    borderRadius: "10px",
                    background: "#EB6CAC",
                    color: "white", 
                    fontWeight: "bolder",
                    marginLeft: "0.8vh",

                  }}
                onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
}

export default Chat;