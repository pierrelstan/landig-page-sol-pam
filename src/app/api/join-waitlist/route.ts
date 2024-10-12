// app/api/join-waitlist/route.ts
import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
 
    const waitlistPath = path.join(process.cwd(), 'src/data', 'waitlist.txt');
    fs.appendFileSync(waitlistPath, `${email}\n`);

    // Configure Nodemailer transporter
    // const transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_SERVER,
    //   port: Number(process.env.EMAIL_PORT),
    //   secure: false, // Use true for 465 (SSL), false for other ports like 587 (TLS)
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    // Email content
    // const mailOptions = {
    //   from: process.env.EMAIL_FROM, // Sender address
    //   to: email,                    // Receiver's email
    //   subject: 'You have successfully subscribed!', // Subject line
    //   text: 'Thank you for joining our waitlist. You will be the first to know when we launch!',
    //   html: `
    //     <h1>Welcome to Our Website!</h1>
    //     <p>Hi,</p>
    //     <p>Thank you for joining our waitlist. We will keep you updated about our launch!</p>
    //     <p>Best regards,<br />The Team</p>
    //   `,
    // };

    // // Send the email
    // await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Successfully joined waitlist and email sent' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to join waitlist or send email' }, { status: 500 });
  }
}
