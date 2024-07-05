import { createHash, randomBytes } from 'crypto';
import { db } from '../../utils/db.server';
import { TokenType } from '../../interfaces/tokenType';

export const createTokenVerificationService = async (
  user: { uuid: string },
  type: TokenType,
): Promise<string> => {
  const resetToken = randomBytes(32).toString('hex');
  const token = createHash('sha256').update(resetToken).digest('hex');

  await db.user_tokens.create({
    data: {
      token,
      type,
      expiredAt: new Date(Date.now() + 10 * 60 * 1000),
      used: false,
      createdAt: new Date(),
      user: {
        connect: {
          uuid: user.uuid,
        },
      },
    },
  });

  console.log({ resetToken, token });

  return resetToken;
};
