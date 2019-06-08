const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'test@example.com',
        subject: `Welcome ${name}`,
        text: `Hi ${name}, welcomeeeee!!`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'test@example.com',
        subject: `Bye bye ${name}`,
        text: `Hi ${name}, byeeeeeeeee!!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

