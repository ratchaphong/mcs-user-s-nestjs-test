import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseEntity } from './entities/create-user-response.entity';
import { GetTokenDto } from './dto/get-token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  async register(
    @Payload() request: CreateUserDto,
  ): Promise<CreateUserResponseEntity> {
    return this.userService.register(request);
  }

  @MessagePattern({ cmd: 'token' })
  async getToken(@Payload() request: GetTokenDto): Promise<string> {
    return this.userService.getToken(request);
  }

  @MessagePattern({ cmd: 'update_profile' })
  async update(@Payload() request: UpdateUserDto) {
    return this.userService.update(request);
  }
}
