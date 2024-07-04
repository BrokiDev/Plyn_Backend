import { db } from '../../utils/db.server';
import { createTokenVerificationService, TokenType } from '../token';
import { sendEmail } from '../../utils/Emails';

export const resendVerificationEmailService = async (
  email: string,
): Promise<
  | {
      status: string;
      message: string;
    }
  | undefined
> => {
  const emailFound = await db.users.findFirst({
    where: {
      email,
    },
  });

  if (!emailFound) {
    return await Promise.resolve({
      status: 'success',
      message:
        'If your Email is in our database. you gonna receive a new email to reset your password',
    });
  }

  const tokenEmail = await createTokenVerificationService(
    { uuid: emailFound.uuid },
    TokenType.EMAIL_VERIFICATION,
  );

  sendEmail({
    email: '',
    subject: 'Email Verification',
    message: `Click the link to verify your email: ${process.env.CLIENT_URL}/verify-email/${tokenEmail}`,
  });
};
