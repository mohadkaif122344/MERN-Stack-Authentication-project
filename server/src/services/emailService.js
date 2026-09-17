import transporter from "../config/nodemailer.js";

export const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to Our Application",

    text: `Welcome to our application. Your account has been created with email id: ${email}`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">
        <h2>Welcome to Our Application </h2>

        <p>Your account has been created successfully.</p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>Thank you for joining us!</p>
      </div>
    `,
  };
 await transporter.sendMail(mailOptions);
};

// Verify OTP Email
export const sendVerifyOtpEmail = async (email, name, otp) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Account Verification OTP",

    html: `
      <h2>Hello ${name}</h2>
      <p>Your verification OTP is:</p>
      <h1>${otp}</h1>
      <p>OTP is valid for 10 minutes.</p>
    `,
  });
};

//Password reset OTP
export const sendResetOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Hello ${email}</h2>
      <p>Your password reset OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
    `,
  });
};