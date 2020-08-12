import app from './app'
import http from 'http'
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

})

server.listen(3030,()=>{console.log('Application started at PORT 3030')})

export default server