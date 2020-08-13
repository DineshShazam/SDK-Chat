const express = require('express')
const path = require('path')
const { uuid } = require('uuidv4');
const handlebars = require('express-handlebars')

const app = express();

// Set the view engine
app.set('view engine','hbs')

// render css file
app.use(express.static(path.join(__dirname+'/public')))

  
// configure express handlebars  
app.engine('hbs',handlebars({
    layoutsDir:__dirname+'/views/layouts',      
    extname:'hbs' 
}))

app.get('/',(req,res) => {  
    
   res.render('lbody',{layout:'login'});

});

app.get('/vid-room',(req,res) => {
    res.redirect(`/${uuid()}`)
})

app.get('/:roomid',(req,res) => {
   
    res.render('body',{layout:'index',room_id:req.params.roomid});

})




module.exports = app 


// "@babel/core": "^7.9.6",
// "@babel/node": "^7.8.7",
// "@babel/plugin-transform-runtime": "^7.9.6",
// "@babel/preset-env": "^7.9.6",

