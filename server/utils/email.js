const nodemailer = require('nodemailer');

const sendEmail = async option =>{
    try{
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port : 2525,
        service: 'gmail',
        secure: false,
        auth: {
            user: 'aakashbandhuaryal@gmail.com',
            pass: 'xppc mcoy rflo rbib'
              },
              tls: {
                rejectUnauthorized: false
            } 
            }); 
    const mailOptions = {
        from: 'AAKASH BANDHU ARYAL <kingaadarsh606@gmail.com>',
        to: option.Email,
        subject: option.subject, 
        html: option.html
        
    }
    await transporter.sendMail(mailOptions);
    }catch(err){
        console.log("Email Not send") 
        console.log(err)
    }

} 

module.exports = sendEmail;