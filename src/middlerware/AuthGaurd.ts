import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { HttpError } from 'src/utils';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(PreAuthMiddleware.name);

  constructor(private prismaClient: PrismaClient) {}

  async use(req: Request, res: Response, next: () => void) {
    const apiKey = req.headers.authorization;
    const userId = req.body?.userId;
    try {
      if (apiKey != null && apiKey != '' && userId && userId !== '') {
        const isValid = await this.isValidRequest(apiKey, userId);
        if (isValid) {
          next();
        } else {
          PreAuthMiddleware.accessDenied(req.url, res);
        }
      } else {
        PreAuthMiddleware.accessDenied(req.url, res);
      }
    } catch (e) {
      this.logger.error('Invalid apiKey');
      throw HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `something went wrong while validating apiKey. and ${e}`,
      );
    }
  }

  private static accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'access denied',
    });
  }

  private async isValidRequest(apiKey: string, userId: string) {
    const res = await this.prismaClient.subscription.findUnique({
      where: {
        apiKey: apiKey,
      },
    });

    const isUserValid = userId === res?.userId;

    if (res && isUserValid) {
      return true;
    } else {
      return false;
    }
  }
}
