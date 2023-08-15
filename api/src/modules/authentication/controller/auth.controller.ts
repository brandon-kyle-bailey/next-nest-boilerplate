import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginResponseDto } from '../dto/login.response.dto';
import { LoginRequestDto } from '../dto/login.request.dto';
import { RegisterRequestDto } from '../dto/register.request.dto';
import { RegisterResponseDto } from '../dto/register.response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUseCase } from '../use-case/register/register.use-case';
import { LoginUseCase } from '../use-case/login/login.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LoginUseCase)
    readonly loginUseCase: LoginUseCase,
    @Inject(RegisterUseCase)
    readonly registerUseCase: RegisterUseCase,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'user has been logged in.',
  })
  @Post('user/login')
  async login(@Body() input: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.loginUseCase.execute({
      email: input.email,
      password: input.password,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'user has been registered.',
  })
  @Post('user/register')
  async register(
    @Body() input: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return await this.registerUseCase.execute({
      name: input.name,
      email: input.email,
      password: input.password,
      image: input.image,
    });
  }
}
