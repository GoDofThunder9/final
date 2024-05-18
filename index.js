const express = require('express'); 
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieparser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const  MongoStore = require('connect-mongo');
const path = require("path");
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const customMware = require('./config/middleware');
// setup the chat server to be used with socket.io


const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket.js').chatSockets(chatServer);
const io = require("socket.io")(chatSockets, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"]
    }
  });
chatServer.listen(5000); 
console.log('chat server is listening on port 5000');
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
// use express router
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');    
app.use(express.static('assets'));
app.use(express.static('js'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(session({
    name: 'authentication-1',
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: 
    {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/name' ,autoRemove:'disabled'})
    
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
