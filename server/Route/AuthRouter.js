const express = require('express');
const passport = require('passport');
const router = express.Router();


const CLIENT_URL = 'http://localhost:3000'

router.route('/login/failed').get((req,res)=>{
    res.statusCode(401).json({
        success: false,
        message: 'failure'
    })
})

router.route('/login/success').get((req,res)=>{ 
    if(req.user){
    res.statusCode(200).json({
        success: false,
        message: 'failure'
    })}
})

router.route('/logout').get((req,res)=>{
    res.logout();
    res.redirect(CLIENT_URL);
}
)




router.route('/google').get(passport.authenticate('google', { scope: ['profile'] }));


router.route('/google/callback').get(passport.authenticate('google',{
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))

module.exports = router; 

