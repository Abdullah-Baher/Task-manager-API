const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abdobaher36@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}


const sendWhyCancelEmail = (email,  name) => {
    sgMail.send({
        to: email,
        from: 'abdobaher36@gmail.com',
        subject: 'Canceling Profile',
        text: `Hello ${name}, why are you canceling your account did something happen?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendWhyCancelEmail
}