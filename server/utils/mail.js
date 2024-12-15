// const path = require("path");

// // Environmental Variables
// require("dotenv").config({ path: path.resolve(__dirname, '../.env') });

// const URL = process.env.CLIENT_HOST_URL
// const API_KEY = process.env.SENDGRID_KEY
// const SENDER_EMAIL = process.env.SENDER_EMAIL

// const sgMail = require("@sendgrid/mail");
// const { activationTemplate, forgotPasswordTemplate, userRoleChangedEmailTemplate, userBlockEmailTemplate } = require("./mailTemplates");

// sgMail.setApiKey(API_KEY);

// // Sends Email For Activate Account
// const activationEmail = async ({ to, token }) => {
//     const message = {
//         to: [to],
//         from: {
//             name: 'uBlogit',
//             email: SENDER_EMAIL
//         },
//         subject: 'Activate your account',
//         html: activationTemplate(URL, token)
//     }
//     try {
//         await sgMail.send(message);
//         console.log('Activation Link Email Sent...')
//     } catch (err) {
//         console.log(err)
//     }
// }

// // Sends Email For Reset Password
// const forgotPasswordEmail = async ({ to, token }) => {
//     const message = {
//         to: [to],
//         from: {
//             name: 'uBlogit',
//             email: SENDER_EMAIL
//         },
//         subject: 'Reset your Password',
//         html: forgotPasswordTemplate(URL, token)
//     }
//     try {
//         await sgMail.send(message);
//         console.log('Reset Password Email Sent...')
//     } catch (err) {
//         console.log(err)
//     }
// }

// // Sends Email when user role changed
// const userRoleChangedEmail = async ({ to, isAdminNow }) => {
//     const message = {
//         to: [to],
//         from: {
//             name: 'uBlogit',
//             email: SENDER_EMAIL
//         },
//         subject: 'Your role have been changed',
//         html: userRoleChangedEmailTemplate(URL, isAdminNow)
//     }
//     try {
//         await sgMail.send(message);
//         console.log('User role changed Email Sent...')
//     } catch (err) {
//         console.log(err)
//     }
// }

// // Sends Email when user block/unblock
// const userBlockEmail = async ({ to, isBlockNow }) => {
//     const message = {
//         to: [to],
//         from: {
//             name: 'uBlogit',
//             email: SENDER_EMAIL
//         },
//         subject: 'Your status have been changed',
//         html: userBlockEmailTemplate(URL, isBlockNow)
//     }
//     try {
//         await sgMail.send(message);
//         console.log('User status changed Email Sent...')
//     } catch (err) {
//         console.log(err)
//     }
// }
// module.exports = {
//     activationEmail,
//     forgotPasswordEmail,
//     userRoleChangedEmail,
//     userBlockEmail
// }

const nodemailer = require("nodemailer");
const path = require("path");

// Environmental Variables
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });

const URL = process.env.CLIENT_HOST_URL;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASS = process.env.EMAIL_PASS;

const { activationTemplate, forgotPasswordTemplate, userRoleChangedEmailTemplate, userBlockEmailTemplate } = require("./mailTemplates");

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // Use STARTTLS
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASS,
    },
});

// Sends Email For Activate Account
const activationEmail = async ({ to, token }) => {
    const message = {
        to: to,
        from: {
            name: 'uBlogit',
            address: EMAIL_USERNAME,
        },
        subject: 'Activate your account',
        html: activationTemplate(URL, token),
    };
    try {
        await transporter.sendMail(message);
        console.log('Activation Link Email Sent...');
    } catch (err) {
        console.error('Error sending activation email:', err);
    }
};

// Sends Email For Reset Password
const forgotPasswordEmail = async ({ to, token }) => {
    const message = {
        to: to,
        from: {
            name: 'uBlogit',
            address: EMAIL_USERNAME,
        },
        subject: 'Reset your Password',
        html: forgotPasswordTemplate(URL, token),
    };
    try {
        await transporter.sendMail(message);
        console.log('Reset Password Email Sent...');
    } catch (err) {
        console.error('Error sending reset password email:', err);
    }
};

// Sends Email when user role changed
const userRoleChangedEmail = async ({ to, isAdminNow }) => {
    const message = {
        to: to,
        from: {
            name: 'uBlogit',
            address: EMAIL_USERNAME,
        },
        subject: 'Your role has been changed',
        html: userRoleChangedEmailTemplate(URL, isAdminNow),
    };
    try {
        await transporter.sendMail(message);
        console.log('User role changed Email Sent...');
    } catch (err) {
        console.error('Error sending user role changed email:', err);
    }
};

// Sends Email when user block/unblock
const userBlockEmail = async ({ to, isBlockNow }) => {
    const message = {
        to: to,
        from: {
            name: 'uBlogit',
            address: EMAIL_USERNAME,
        },
        subject: 'Your status has been changed',
        html: userBlockEmailTemplate(URL, isBlockNow),
    };
    try {
        await transporter.sendMail(message);
        console.log('User status changed Email Sent...');
    } catch (err) {
        console.error('Error sending user status changed email:', err);
    }
};

module.exports = {
    activationEmail,
    forgotPasswordEmail,
    userRoleChangedEmail,
    userBlockEmail,
};
