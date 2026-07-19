import {createTransport} from 'nodemailer'

// Create a transporter using SMTP
const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// create send email function
// for us it send email
const sendEmail = async ({to, subject,body}: {to: string;subject: string;body: string;})=>{
const response=await transporter.sendMail({
    // store sender email id in env variable->for now empty string
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
})
return response;
}

export default sendEmail;