import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    // ✅ req.user est défini par JwtStrategy.validate()
    console.log(req.user);
    return {
      message: 'User profile',
      user: req.user,
    };
  }
}
