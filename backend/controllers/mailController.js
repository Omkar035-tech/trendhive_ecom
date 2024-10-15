
// ###########  BRAVO GMAIL #############

// import nodemailer from 'nodemailer';  // Correct import for nodemailer

// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false,
//     auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//     },
// });

// // async..await is not allowed in the global scope, must use a wrapper
// const fireMail = async (req, res) => {
//     const { emailID, HTMLmsg, subject, body } = req.body;
//     try {
//         const info = await transporter.sendMail({
//             from: process.env.SMTP_EMAIL, // sender address
//             to: emailID, // dynamic email receiver
//             subject: subject, // dynamic subject
//             text: body, // dynamic plain text body
//             html: HTMLmsg, // dynamic HTML body
//         });

//         if (info.messageId) {
//             res.json({ success: true, msg: 'Mail sent to your mentioned email ID' });
//         } else {
//             res.json({ success: false, msg: 'Check the email ID and try later' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, msg: 'Failed to send email. Please try again later.' });
//     }
// };

// export default fireMail;


// ###########  BRAVO SMTP #############

// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_PORT === '465', // true for port 465, false for other ports
//     auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//     },
//     logger: true,
//     debug: true, // Enable debug output
// });

// // Mail sending function
// const fireMail = async (req, res) => {
//     const { emailID, HTMLmsg, subject, body } = req.body;

//     try {
//         // Verify SMTP connection
//         await transporter.verify();

//         const info = await transporter.sendMail({
//             from: process.env.SMTP_BRAVO_MAIL, // sender address
//             to: emailID, // dynamic email receiver
//             subject: subject, // dynamic subject
//             text: body, // dynamic plain text body
//             html: HTMLmsg, // dynamic HTML body
//         });

//         if (info.messageId) {
//             res.json({ success: true, msg: 'Mail sent to your mentioned email ID' });
//         } else {
//             res.json({ success: false, msg: 'Check the email ID and try later' });
//         }
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, msg: 'Failed to send email. Please try again later.' });
//     }
// };

// export default fireMail;



//################  API SMTP BRAVO ###########

const fireMail = async (req, res) => {
    const { emailID, HTMLmsg, subject, body } = req.body;

    try {
        // Make the POST request to Brevo API
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': process.env.BREVO_API_KEY,  // Use Brevo API Key from environment variables
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: { email: process.env.SMTP_EMAIL },  // The sender's email address
                to: [{ email: emailID }],  // The recipient's email address
                subject: subject,  // Subject of the email
                htmlContent: HTMLmsg,  // HTML content of the email
                textContent: body,  // Plain text content of the email
            }),
        });

        // Check if the email was successfully sent
        if (response.status === 201) {
            res.json({ success: true, msg: 'Mail sent to your mentioned email ID' });
        } else {
            const errorData = await response.json();
            console.error('Error sending email:', errorData);
            res.status(500).json({ success: false, msg: 'Failed to send email. Check email ID and try again later.' });
        }
    } catch (error) {
        console.error('Error sending email via Brevo API:', error);
        res.status(500).json({ success: false, msg: 'Failed to send email. Please try again later.' });
    }
};

export default fireMail;
