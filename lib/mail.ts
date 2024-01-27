import nodemailer from 'nodemailer';

export async function sendMail({to, subject, body}: {to:string, subject:string, body:string}) {
    // send email
    const { SMPT_EMAIL, SMPT_GMAIL_PASS } = process.env;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMPT_EMAIL,
            pass: SMPT_GMAIL_PASS,
        },
    });

    try {
        const testResult = await transport.verify();
        console.log("Test Result of Email: ", testResult);
    } catch (error) {
        console.log(error);
    }
}