import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    description: 'Email',
    default: 'email',
  })
  email: string;

  @ApiProperty({
    required: false,
    description: 'Phone',
    default: 'phone',
  })
  phone: string;
}
