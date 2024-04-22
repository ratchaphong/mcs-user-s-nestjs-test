import { ApiProperty } from '@nestjs/swagger';

export class GetTokenDto {
  @ApiProperty({
    required: true,
    description: 'Email',
    default: 'email',
  })
  email: string;
}
