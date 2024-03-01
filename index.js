const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieparser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const  MongoStore = require('connect-mongo');
app.use(express.static('./assets'));
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use express router
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

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
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});