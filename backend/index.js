require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sendEmail = (subject, html) => {
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `noreply ${process.env.SMTP_EMAIL}`,
        to: process.env.SMTP_EMAIL,
        html,
        subject,
    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (response) {
            return true;
        }
        return false;
    });
};

app.post("/send-mail", (req, res) => {
    const {firstName, lastName, email, subject, message} = req.body;  // FIXME form?

    let html = `<div>First Name: ${firstName}</div>`;
    html += `<div>Last Name: ${lastName}</div>`;
    html += `<div>Email: ${email}</div>`;
    html += `<br />`;
    html += `<p>${message}</p>`;

    sendEmail(subject, html);

    res.send("ok");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    if (!err) console.log(`server running on port ${PORT}`);
    else console.log(err);
});
