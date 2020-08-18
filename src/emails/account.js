const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'amanpra333@gmail.com',
        subject:'Welcome to Laladukaan',
        text:  `Hello ${name}, welcome to the laladukaan website!`
    })
}
module.exports = {
    sendWelcomeEmail
}