import { ApiProperty } from '@nestjs/swagger';

export class UserRevokeDto {
  @ApiProperty()
  id: string;
}
