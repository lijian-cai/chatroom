const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app     = express()
// npm install --save socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// express帮你设置模板引擎
app.set('view engine', 'ejs');
// express-session
app.use(session({
  secret: 'chatroom',
  resave: true,
  saveUninitialized:true,
  cookie: { maxAge: 60000*20 } // session expires in 20 min
 }));
// body-parser parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

io.on('connection', (socket) => {
  socket.on('chat message', (username, msg) => {
    io.emit('chat message', username, msg);
  });
});

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  let name = req.body.name
  if(name){
    req.session.name = name
    res.redirect('/chatroom')
  }else{
    res.redirect('/')
  }
})

app.get('/chatroom', (req, res) => {
  if(req.session.name){
    let name = req.session.name
    res.render('chatroom', {'name': name})
  }else{
    res.redirect('/')
  }
})

// set static routes
app.use(express.static('public'))

// app.listen(3000)
server.listen(3000);