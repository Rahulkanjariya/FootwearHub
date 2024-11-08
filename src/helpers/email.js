const nodemailer = require('nodemailer');

/**
 * This function is use for send an email
 * 
 * @param {string} to -Recipient's email address
 * @param {string} subject -Subject of the email
 * @param {string} text -Text content of the email
 */
async function sendEmail(to, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_SMTP,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "your email",
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports = { 
    sendEmail 
};
