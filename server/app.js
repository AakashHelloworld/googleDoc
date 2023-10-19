const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const passport = require('passport');
const app = express(); 
const cors = require("cors");
const cookieParser = require("cookie-parser")
const Doc = require("./Route/DocRoute")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));


app.use(passport.initialize());
app.use(passport.session())

const GOOGLE_CLIENT_ID = "131920247749-bp0nrn3t5r56m7474cu655vsfog7d964.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.use(cookieParser());
app.use('/api/docs',Doc )
module.exports = app 
