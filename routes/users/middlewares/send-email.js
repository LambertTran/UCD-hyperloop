/** =================================
                Packages
**==================================*/
const nodemailer = require('nodemailer');
let emailIdentity;
try{
  emailIdentity = require('../../../identity/email-identity');
} catch(e) {
  emailIdentity = require('../../../identity-heroku/email-identity');
}

/** =================================
                Body
**==================================*/

const HandleSendEmail = (message) => {
    let transporter = nodemailer.createTransport({
      service:'gmail',
      host:'smtp.gmail.com',
      auth:emailIdentity,
    });

    let mailOptions = {
      from:"UCD-Hyperloop",
      to: "lb.tran648@gmail.com",
      subject:"Sponsor Contact",
      text: message
    }
    return transporter.sendMail(mailOptions)
      .then(() => {
        return Promise.resolve()
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject();
      })
}

module.exports = HandleSendEmail;