const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require("./RoueModel/UserModel")

const GOOGLE_CLIENT_ID = "131920247749-bp0nrn3t5r56m7474cu655vsfog7d964.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"



passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      const user ={
        GoogleId: profile.id,
        Username: profile.displayName,
        Image: profile.photos[0].value
      }
      done(null, profile)
  } 
));

passport.serializeUser((user, done)=>{
  done(null, user)
})

passport.deserializeUser((user, done)=>{
  done(null, user)
})
 