"use strict";
const nodemailer = require("nodemailer");

exports.sendMail = async (sender, phone, email, message, file) => {

    let account = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });


    let mailOptions = {
        from: '"Oliver Bunda" <foo@example.com>',
        to: "bar@example.com, baz@example.com",
        subject: "Message from Mieterengel Site",
        text: "Dear Contributory! You have a message from " + sender + " ! " + sender + " write the following message: " + message + ". " + sender + " contact information: phone: " + phone + ", email: " + email + ".",
        html: "<h1>Dear Contributory!</h1><p><h2> You have a message from " + sender + " !</h2></p><p> " + sender + " write the following message:</p><p> " + message + ". </p><p><h2>" + sender + " contact information:</h2></p><p> phone: " + phone + ",</p><p> email: " + email + ".</p>",
        attachments: [
            {
                filename: file + ".pdf",
                path: './uploads/' + file + ".pdf"

            }]
    };


    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));



    return info;

};
