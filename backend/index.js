const express = require('express')
const connectToDB = require('./database/db')
require('dotenv').config();
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors');
const socketHandler = require('./sockets/socketHandler');


const port = process.env.PORT;


const app = express();



// Socket part
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

socketHandler(io);



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

app.get('/disconnect-all', (req, res) => {
    const sockets = io.of("/").sockets;

    for (const [id, socket] of sockets) {
        console.log("Forcefully disconnecting:", id);
        socket.disconnect(true);
    }

    res.send("✅ All sockets disconnected.");
});

server.listen(port, () => {
    console.log(`🚀 Server + Socket.IO running on port ${port}`);
})
