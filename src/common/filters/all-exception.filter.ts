import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { webhook } from '../configs/discord-webhook.config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const statusCode = httpStatus.toString();
    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const message = exception instanceof Error ? exception.message : exception;
    const timestamp = new Date().toISOString();

    webhook.error(path, timestamp, message.toString());

    httpAdapter.reply(
      ctx.getResponse(),
      {
        statusCode,
        path,
      },
      httpStatus,
    );
  }
}
