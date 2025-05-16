import nodemailer from "nodemailer";
import {
    MAILTRAP_HOST,
    MAILTRAP_PORT,
    MAILTRAP_USER,
    MAILTRAP_PASS,
} from "./config.js";

function generateHTML(items) {
    return `
    <h2>📰 Latest News</h2>
    <ul>
      ${items
          .map(
              (item) => `
        <li>
          <a href="${item.link}">${item.title}</a><br/>
          <small>${item.pubDate}</small>
        </li>
      `
          )
          .join("")}
    </ul>
  `;
}

const transporter = nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port: Number(MAILTRAP_PORT),
    auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS,
    },
});

export async function sendEmail(recipients, items) {
    const html = generateHTML(items);

    const mailOptions = {
        from: '"NewsBot" <news@example.com>',
        to: recipients.join(","),
        subject: "📰 Your Daily News Digest",
        html,
    };

    await transporter.sendMail(mailOptions);
}
