const socket = io('/')
// create peer and make the connect
var peer = new Peer({
    host: '/',
    port: 3030,
    path: '/peer-js',

})

var GirdVideo = document.getElementById('grid-video');
var myVideo = document.createElement('video');
//myVideo.muted = true;
const peers = {}


// got the video stream from the browser
var MyVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream =>   {



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

// Chat Box

let text = $('input')

$('html').keydown((e) => {

    if(e.which == 13 && text.val().length !== 0) {
        console.log(text.val())
        const Display_name = localStorage.getItem("user_name");
        console.log(Display_name);
        socket.emit('message',text.val(),Display_name);
        text.val('')   
    }
})

socket.on('create-msg', (msg,name) => {
    console.log('message from server',name)
    const user_name = name.replace(/["']/g, "");

    $('ul').append(`<li class="message">
    <b style="color:white">${user_name}<b><br/>
    <p style="color:white">${msg}</p>
    
    </li>`)
    scrollToBottom()
})
   

//End meeting

//user disconnection
socket.on('user-disconnected',userId => {
    
    console.log('Disconnected user ID '+userId);
    window.location.href="https://www.google.com/search?q=thank+you&rlz=1C1CHBF_enIN869IN869&sxsrf=ALeKk01LQ4NftgHcSd4gmgFPuMe0tM4MkA:1597085351227&tbm=isch&source=iu&ictx=1&fir=zKF8kOHsIFFwjM%252Cx7IMqoz-WuMcBM%252C_&vet=1&usg=AI4_-kQBo2TVXhKzI6HF0u-mY19JXicA8A&sa=X&ved=2ahUKEwiLqqTIppHrAhWkH7cAHQnoAUIQ9QEwHXoECAEQMg&biw=1536&bih=760#imgrc=zKF8kOHsIFFwjM"
    
})

}).catch(err => console.log('Error while cathing the stream ' + err));




// Once peer connection is ready 
peer.on('open', id => {
    const NumUsers = id;
    console.log('Number of users joined '+NumUsers)
    // Requesting to Join room 
    console.log(Room_Id)
    socket.emit('join-room', Room_Id, id)

})


// function LeaveRoom(room) { 
//     console.log(room)
//     socket.emit('room-disconnect',room) 
// }

const LeaveRoom = (room) => {
    alert('You Gonna leave the room')
    socket.emit('user-disconnect',room)
    localStorage.removeItem('user_name');
    window.location.href="/"

}




const ConnecToNewUser = (userId, stream) => {

    // Call and get the stream and create the div stream for them 
    try {
        
        var call = peer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
        call.on('close',()=> {
            video.remove();
        })

        peers[userId] = call // add call to disconnect in future

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









//@desc Control Functionality in bottom 

// CHAT BOX scroll down 

const scrollToBottom = () => {
    let chat = $('.main_chat_window');
    chat.scrollTop(chat.prop("scrollHeight"))
}

// working with the bottom Audio controls 
const MuteUnmute = () => {

    console.log('Button clicked for audio')
    //get the auido 
    const enabled = MyVideoStream.getAudioTracks()[0].enabled

    if(enabled) {
        //muting the audio
        MyVideoStream.getAudioTracks()[0].enabled = false;
        //change the control style
        setUnmuteButton();
    }
    else {
        MyVideoStream.getAudioTracks()[0].enabled = true;
        setMuteButton();
    }
}

const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }


  // stop and play video 

  const playStop = () => {

    console.log('Video button clicked')
      const enabled = MyVideoStream.getVideoTracks()[0].enabled;

      if(enabled) {
          console.log('Turning off vid')
          MyVideoStream.getVideoTracks()[0].enabled = false;
          console.log(MyVideoStream.getVideoTracks()[0].enabled)
          setPlayVideo()
      }
      else {
        console.log('Turning on vid')
        setStopVideo()
        MyVideoStream.getVideoTracks()[0].enabled = true;
        
      }
  }

  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  } 