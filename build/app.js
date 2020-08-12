"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var app = (0, _express["default"])(); // Set the view engine

app.set('view engine', 'hbs'); // render css file

app.use(_express["default"]["static"](_path["default"].join(__dirname + '/public'))); // configure express handlebars  

app.engine('hbs', (0, _expressHandlebars["default"])({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));
app.get('/', function (req, res) {
  res.render('lbody', {
    layout: 'login'
  });
});
app.get('/vid-room', function (req, res) {
  res.redirect("/".concat((0, _uuid.v4)()));
});
app.get('/:roomid', function (req, res) {
  res.render('body', {
    layout: 'index',
    room_id: req.params.roomid
  });
});
var _default = app;
exports["default"] = _default;