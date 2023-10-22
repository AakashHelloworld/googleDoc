const express = require('express');
const passport = require('passport');
const router = express.Router();
const Doc = require("../RoueModel/UserModel")

const CLIENT_URL = 'http://localhost:3000/home'

router.route('/login/failed').get((req,res)=>{
    res.status(401).json({
        success: false,
        message: 'failure'
    })
}) 

router.route('/login/success').get((req,res)=>{ 

    // console.log("Hello") 
    if(req.user){  
    res.status(200).json({
        message: 'success',
        user: req.user
    })
}else{ 
    res.status(200).json({
        message: 'failure'
    })
    } 
}) 

router.route('/logout').get((req,res)=>{
    res.logout();
    res.redirect(CLIENT_URL);
}
)




router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));


router.route('/google/callback').get(passport.authenticate('google',{
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))





module.exports = router; 

