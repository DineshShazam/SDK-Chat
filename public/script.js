const socket = io('/')
// create peer and make the connect
var peer = new Peer({
    host: location.hostname,
    port: 3030,
    path: '/peer-js',

})

var GirdVideo = document.getElementById('grid-video');
var myVideo = document.createElement('video');
myVideo.muted = true;



// got the video stream from the browser
var MyVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream => {



    MyVideoStream = stream,
    addVideoStream(myVideo, stream);

    //answering to the call process
    peer.on('call', call => {

        call.answer(stream);
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {

            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('User-Joined', (userId) => {

        ConnecToNewUser(userId, stream);
    })

    

}).catch(err => console.log('Error while cathing the stream ' + err));


// add the stream to our element and bind to the view






// Once peer connection is ready 
peer.on('open', id => {

    // Requesting to Join room 
    socket.emit('join-room', Room_Id, id)

})


const ConnecToNewUser = (userId, stream) => {

    // Call and get the stream and create the div stream for them 
    try {
        
        var call = peer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })

    } catch (error) {
        console.log(error);
    }





}


const addVideoStream = (video, stream) => {


    // combine the stream to the created video element 
    video.srcObject = stream

    // play the video 
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })

    GirdVideo.append(video)

}