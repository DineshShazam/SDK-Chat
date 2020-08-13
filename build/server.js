"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

var server = _http["default"].Server(_app["default"]);

var io = require('socket.io')(server);

var _require = require('peer'),
    ExpressPeerServer = _require.ExpressPeerServer;

var peerServer = ExpressPeerServer(server, {
  debug: true
});

_app["default"].use('/peer-js', peerServer); // once socket connection established get the instance 


io.on('connection', function (socket) {
  socket.on('join-room', function (room_id, userId) {
    socket.join(room_id).broadcast.emit('User-Joined', userId);
    socket.on('message', function (msg, name) {
      console.log('message method called ' + name);
      io.to(room_id).emit('create-msg', msg, name);
    });
    socket.on('user-disconnect', function (room) {
      console.log('disconnect method called ' + room);
      socket.leave(room);
      socket.to(room).broadcast.emit('user-disconnected');
    });
  }); // socket.on('disconnect', (room) => {
  //     console.log('disconnect method2 called')
  //     socket.to(room).broadcast.emit('user-disconnected',userId)
  // })
});
server.listen(process.env.PORT || 3030, function () {
  console.log(`Application started at PORT ${process.env.PORT || 3030}`);
});
var _default = server;
exports["default"] = _default;