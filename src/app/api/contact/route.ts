import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, service, status, message } = await req.json();

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.afrihost.com", // Replace with Afrihost's SMTP server
      port: 587, // Default SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Afrihost email address
        pass: process.env.EMAIL_PASSWORD, // Your Afrihost email password
      },
    });

    // Email content
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`, // Sender address
      to: "info@molendesports.com", // Recipient address
      subject: "New Contact Form Submission", // Subject line
      text: `
        Full Name: ${fullName}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Status: ${status}
        Message: ${message}
      `, // Plain text body
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Message:</strong> ${message}</p>
      `, // HTML body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Return error response
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed." },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "Method not allowed." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Method not allowed." },
    { status: 405 }
  );
}