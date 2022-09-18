require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    console.log(`User connected ${socket.id}`)

    socket.on("join_room", roomID => {
        console.log("joined")
        // socket.join(roomID)
        console.log(`User with iD : ${socket.id} joined room ${roomID}`)
        if (users[roomID]) {
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("send message", (data) => {
        socket.to(data.room).emit("receive message", data);
      });
    

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));


