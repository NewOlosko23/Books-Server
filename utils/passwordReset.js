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
          Subject: "Password Reset",
          HTMLPart: `
            <h3>Reset your password</h3>
            <p>Click below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
          `,
        },
      ],
    });
    console.log("Password reset email sent");
  } catch (err) {
    console.error("Mailjet error:", err);
  }
};
