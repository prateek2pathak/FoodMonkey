// /sockets/socketHandler.js

const Room = require("../model/Room");


const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected on ${socket.id}`);

        socket.on('join_room', async (roomName) => {
            try {
                socket.join(roomName);
                console.log(`${socket.id} joined room ${roomName}`);

                const room = await Room.findOne({ roomName });
                if (!room) {
                    await Room.create({ roomName });
                    console.log(`Room created: ${roomName}`);
                }
            } catch (error) {
                console.error("Error in joining room ", error.message);
            }
        });

        socket.on('send_message', async (data) => {
            const { room, username, message, time } = data;
            const msg = { username, message, time };

            try {
                await Room.updateOne(
                    { roomName: room },
                    { $push: { messages: msg } }
                );

                io.to(room).emit('receive_message', msg);
            } catch (err) {
                console.error('Error in pushing message ', err.message);
            }
        });

        socket.on('leave_room', (roomName) => {
            socket.leave(roomName);
            console.log(`${socket.id} left room: ${roomName}`);
        });

        socket.on('disconnect', () => {
            console.log("User disconnected ", socket.id);
        });
    });
}

module.exports = socketHandler;
