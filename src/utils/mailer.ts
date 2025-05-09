import { userModel } from "@/models/userModel";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export const sendmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = uuidv4();

    if (emailType === "VERIFY") {
      await userModel.findOneAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 36000000,
        },
      });
    } else if (emailType === "RESET") {
      await userModel.findOneAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 36000000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const verifyEmailHtml = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`;

    const resetPasswordHtml = `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetPassword?token=${hashedToken}</p>`;

    const mailOptions = {
      from: '"Ayush Soni 👻" <ayusoni86@gmail.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
      text: "Hello world?",
      html: emailType === "VERIFY" ? verifyEmailHtml : resetPasswordHtml,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
