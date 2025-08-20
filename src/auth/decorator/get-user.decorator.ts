import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthenticatedRequest extends Express.Request {
  user: {
    id: string;
    email: string;
    // Add other user properties as needed
    [key: string]: any;
  };
}

// Generic version for type safety
export const GetUser = createParamDecorator(
  <T = any>(data: string | undefined, ctx: ExecutionContext): T => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!request.user) {
      throw new Error('User not found in request');
    }

    if (data) {
      return request.user[data] as T;
    }

    return request.user as T;
  },
);
