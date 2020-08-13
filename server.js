const app = require('./app')
const http = require('http')
const server = http.Server(app);
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peer-js',peerServer)

// once socket connection established get the instance 
io.on('connection', socket => {
    
    socket.on('join-room',(room_id,userId) => {

        socket.join(room_id).broadcast.emit('User-Joined',userId);

        socket.on('message', (msg,name) => {
            console.log('message method called '+name)
            io.to(room_id).emit('create-msg',msg,name)
        })

        socket.on('user-disconnect', room => {
            console.log('disconnect method called '+room)
            socket.leave(room)
            socket.to(room).broadcast.emit('user-disconnected')
        })
        
    })

    

    // socket.on('disconnect', (room) => {
    //     console.log('disconnect method2 called')
    //     socket.to(room).broadcast.emit('user-disconnected',userId)
    // })
    // heroku apps:destroy [YOUR-APP-HERE]

})

server.listen(process.env.PORT || 3030,()=>{console.log(`Application started at PORT ${process.env.PORT}`)})

// export default server
