const express = require('express');
const app = express();
const fs = require('fs');
const httpServer = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(httpServer,{cors: {
    origin:'http://localhost:4200',
    methods:['GET',"POST"],
    credentials:true
}});

// connecting to DB
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chat')
.then(()=>{console.log('database connected')})
.catch((error)=>{console.log(error)});

//creating schema
const {userModel} = require('./schema')(mongoose);

//.keys

const jwt_private = fs.readFileSync('./keys/jwt_private.key');
const jwt_public = fs.readFileSync('./keys/jwt_public.key');
//middleware
io.use((socket,next)=>{
    console.log(socket.handshake.auth.token);
    next();

});

//main section
io.on('connection',(socket)=>{
    console.log('socket connected');
    require('./routes/createAccount')(socket,userModel,{private:jwt_private,public:jwt_public});
    
});

httpServer.listen(80,()=>{
    console.log('server running')
})