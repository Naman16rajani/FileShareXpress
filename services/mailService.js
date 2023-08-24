const nodemailer = require("nodemailer");
module.exports = async ({ from, to, subject, text, html }) => {
    console.log(from, to, subject, text);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: process.env.MAIL_USER, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    }, (err, response) => {
        if (err) {
            console.log("error >> ", err);
        } else {
            console.log("response >> ", response);
        }
    });
}