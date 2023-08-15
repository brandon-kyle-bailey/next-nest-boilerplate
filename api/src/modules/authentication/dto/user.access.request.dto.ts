import { ApiProperty } from '@nestjs/swagger';

export class UserAccessDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
