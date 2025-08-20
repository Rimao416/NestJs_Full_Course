import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // Retirez 'email' du décorateur @Body()
    console.log({
      dto,
      body: dto,
    });
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin() {
    return { msg: 'I am signed in' };
  }
}
