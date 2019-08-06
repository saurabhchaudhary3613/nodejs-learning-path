// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: 'saurabh3613@gmail.com',
//   from: 'saurabh3613@gmail.com',
//   subject: 'test email for email notification 2',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

//sgMail.send(msg);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'saurabh3613@gmail.com',
        subject: 'Thanks for joining task manager app !',
        text: `Welcome to the app ${name}. Let me know how you got along with the app`
    })
}
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'saurabh3613@gmail.com',
        subject: 'Soory to see you go !',
        text: `Good bye ${name}. Feel free to join us back !`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}