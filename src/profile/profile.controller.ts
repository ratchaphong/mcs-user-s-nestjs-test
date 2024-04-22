import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchUsersResponseEntity } from './entities/search-users-response.entity';
import { SearchUserResponseEntity } from './entities/search-user-response.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern({ cmd: 'get_profiles' })
  async findAll(): Promise<SearchUsersResponseEntity> {
    return this.profileService.findAll();
  }

  @MessagePattern({ cmd: 'get_profile' })
  async findOne(@Payload() userId: string): Promise<SearchUserResponseEntity> {
    return this.profileService.findOne(userId);
  }
}
