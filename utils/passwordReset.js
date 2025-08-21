import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  "77f88844f6df9fce5cb22b9e26e99208",
  "154555a4c469adef3981fd2c1284e31e"
);

export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "support@booksarc.co.ke",
            Name: "BooksArc",
          },
          To: [{ Email: email }],
          Subject: "Reset Your Password - BooksArc",
          HTMLPart: `
          <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f7f8fa; padding:40px 0; text-align:center;">
            <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
              
              <h2 style="color:#2c3e50; margin-bottom:20px;">BooksArc Password Reset</h2>
              <p style="color:#555; font-size:16px; line-height:1.6; margin-bottom:25px;">
                We received a request to reset your BooksArc account password.  
                Click the button below to create a new one.
              </p>
              
              <a href="${resetUrl}" 
                style="display:inline-block; background-color:#1a73e8; color:#fff; 
                       padding:14px 24px; border-radius:6px; text-decoration:none; 
                       font-weight:bold; font-size:16px; margin-bottom:25px;">
                Reset Password
              </a>
              
              <p style="color:#888; font-size:14px; line-height:1.6; margin-top:20px;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>
              <p style="word-break:break-all; font-size:14px; color:#1a73e8; margin-bottom:30px;">
                <a href="${resetUrl}" style="color:#1a73e8; text-decoration:none;">${resetUrl}</a>
              </p>
              
              <p style="font-size:12px; color:#aaa; line-height:1.6; margin-top:30px;">
                If you didn’t request a password reset, you can safely ignore this email.  
                This link will expire in 1 hour.
              </p>
              
              <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />
              
              <p style="font-size:12px; color:#999;">
                &copy; ${new Date().getFullYear()} BooksArc. All rights reserved.
              </p>
            </div>
          </div>
          `,
        },
      ],
    });
    console.log("Password reset email sent");
  } catch (err) {
    console.error("Mailjet error:", err);
  }
};
