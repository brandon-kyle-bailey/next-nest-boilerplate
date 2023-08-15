import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { UserAccessDto } from '../dto/user.access.request.dto';
import { UserTokenDto } from '../dto/user.token.dto';
import { UserRevokeDto } from '../dto/user.revoke.request.dto';
import { UserRegisterDto } from '../dto/user.register.request.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from '../../common/guards/jwt-auth-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthenticationService)
    readonly authenticationService: AuthenticationService,
  ) {}

  @Post('user/access')
  async access(@Body() input: UserAccessDto): Promise<UserTokenDto> {
    return await this.authenticationService.access(input);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/revoke')
  async revoke(
    @Body() input: UserRevokeDto,
    @Request() req: any,
  ): Promise<string> {
    console.log(`req`, req);
    return await this.authenticationService.revoke(input);
  }

  @Post('user/register')
  async register(@Body() input: UserRegisterDto): Promise<UserTokenDto> {
    return await this.authenticationService.register(input);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('user/refresh')
  async refresh(
    @Request() req: { user: { refresh_token: string } },
  ): Promise<UserTokenDto> {
    return await this.authenticationService.refresh({
      refresh_token: req.user.refresh_token,
    });
  }
}
