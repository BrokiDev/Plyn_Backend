import { createTransport } from 'nodemailer';
import { config } from 'dotenv';

config({ path: '.env' });

export const sendEmail = async (option: {
  email: string;
  subject: string;
  message: string;
}): Promise<void> => {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Plyn Notification" <notify-plyn@bryantr.dev>',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(mailOptions);
};
