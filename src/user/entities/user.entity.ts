import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { AddressDto } from '../dto/address-dto';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'User ID',
    example: 'userId',
  })
  userId: string;

  @ApiProperty({
    description: 'Email',
    example: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
  })
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'Phone',
    example: 'phone',
  })
  phone: string;

  @ApiProperty({
    description: 'Role',
    example: $Enums.Role.User,
  })
  role: $Enums.Role;

  @ApiProperty({
    description: 'Address',
  })
  address: AddressDto;
}
