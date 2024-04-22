import { ApiProperty } from '@nestjs/swagger';
import { SearchUserEntity } from './search-user.entity';

export class SearchUsersResponseEntity {
  @ApiProperty({
    description: '',
    isArray: true,
  })
  users: SearchUserEntity[];
}
