const express = require('express')
const connectToDB = require('./database/db')
require('dotenv').config();
const { Server } = require('socket.io')
const http = require('http')

const port = process.env.PORT;

const cors = require('cors');
const { default: Room } = require('./model/Room');

const app = express();

// Socket part
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {

    console.log(`User connected on `, socket.id);

    socket.on('join_room', async (roomName) => {
        try {
            socket.join(roomName);
            console.log(`${socket.id} joined room ${roomName}`);

            const room = await Room.findOne({ roomName });

            if (!room) {
                await Room.create({ roomName });
                console.log(`Room created: ${roomName} `);
            }
        } catch (error) {
            console.error("Error in joining room ", error.message);
        }


    })

    socket.on('send_message', async (data) => {
        const { room, username, message, time } = data;
        const msg = { username, message, time };


        try {
            await Room.updateOne(
                { roomName: room },
                { $push: { messages: msg } }
            )

            io.to(room).emit('receive_message', msg);
        }
        catch (err) {
            console.error('Error in pushing message ', err.message);
        }
    })

    socket.on('leave_room', (roomName) => {
        socket.leave(roomName);
        console.log(`${socket.id} left room: ${roomName}`);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected ", socket.id);
    })

})




app.use(cors());
connectToDB();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use(express.json());

app.use('/api/', require('./routes/CreateUser'))
app.use('/api/', require('./routes/DisplayData'))
app.use('/api/', require('./routes/CheckOut'))
app.use('/api/', require('./routes/getOrderData'))
app.use('/api/', require('./routes/googlelogin'))
app.use('/api/', require('./routes/getRoomMessages'));

server.listen(port, () => {
    console.log(`🚀 Server + Socket.IO running on port ${port}`);
})
