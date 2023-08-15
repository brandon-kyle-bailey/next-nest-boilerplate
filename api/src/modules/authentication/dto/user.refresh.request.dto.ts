import { ApiProperty } from '@nestjs/swagger';

export class UserRefreshDto {
  @ApiProperty()
  refresh_token: string;
}
