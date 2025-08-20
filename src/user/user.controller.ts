import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import type { User } from 'generated/prisma';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log(user);
    return user;
  }

  @Patch('me')
  editUser() {}
}
