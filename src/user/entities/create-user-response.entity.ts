import { ApiProperty } from '@nestjs/swagger';
import { CreateUserEntity } from './create-user.entity';

export class CreateUserResponseEntity {
  @ApiProperty({
    description: '',
    default: CreateUserEntity,
  })
  user: CreateUserEntity;
}
