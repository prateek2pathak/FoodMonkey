const express= require('express')
const connectToDB = require('./database/db')
require('dotenv').config();

const port = process.env.PORT;

const cors = require('cors')

const app=express();
app.use(cors());
connectToDB();

app.get('/',(req, res)=>{
    res.send('Hello World');
})

app.use(express.json());

app.use('/api/',require('./routes/CreateUser'))
app.use('/api/',require('./routes/DisplayData'))
app.use('/api/',require('./routes/CheckOut'))
app.use('/api/',require('./routes/getOrderData'))

app.listen(port,()=>{
    console.log(`Server running on port no. ${port}`);
})
