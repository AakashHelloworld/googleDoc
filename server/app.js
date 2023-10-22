const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const passport = require('passport')
const app = express(); 
const passportSetup = require("./passportSetup")
const cors = require("cors");
const cookieParser = require("cookie-parser") 
const Doc = require("./Route/DocRoute") 
const Auth = require("./Route/AuthRouter")
const cookieSession = require('cookie-session')

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE; 
console.log(DB)
mongoose.set('strictQuery', true);

mongoose.connect(DB,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then((con)=>{ 
    console.log("sucessful database")   
});
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys:['helloWorld123'], 
    maxAge: 25*60*60*100
}
))

app.use(passport.initialize());
app.use(passport.session()) 

app.use(cors({
    credentials: true, 
    origin: ["http://localhost:3000"]
}));



app.use(cookieParser());

app.use('/api/docs', Doc)
app.use('/api/auth', Auth)
module.exports = app 
 