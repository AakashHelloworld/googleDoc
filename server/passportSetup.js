const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require("./RoueModel/UserModel")

const GOOGLE_CLIENT_ID = "131920247749-bp0nrn3t5r56m7474cu655vsfog7d964.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.serializeUser((user, done)=>{
  // console.log(user, "serial"
  done(null, user.GoogleId)
})

passport.deserializeUser((id, done)=>{
  User.findOne({GoogleId:id}).then((user)=>{
    console.log(user, "deseria")
    done(null, user)
  }) 
})
 
 

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID, 
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/auth/google/callback"
  },
   async(accessToken, refreshToken, profile, done)=>{
      const user ={
        GoogleId: profile.id, 
        Username: profile.displayName,
        Image: profile.photos[0].value,
        Email: profile.emails[0].value
      }
      console.log(user) 
      User.findOne({GoogleId: `${profile.id}` }).then((currentUser)=>{
        if(currentUser){
          console.log("User is:",currentUser )
          done(null, currentUser)
        }else{
          new User({...user}).save().then((newUser)=>{
            console.log("User is:",newUser )
            done(null, newUser)
  
          })
        }
      })
  } 
)); 

