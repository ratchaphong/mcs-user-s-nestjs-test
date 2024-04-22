import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserResponseEntity } from './entities/create-user-response.entity';
import { CreateUserEntity } from './entities/create-user.entity';
import { omit } from 'lodash';
import { GetTokenDto } from './dto/get-token.dto';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<CreateUserResponseEntity> {
    const { password, address, ...rest } = data;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const result = await this.prismaService.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        address: address ? { create: address } : undefined,
      },
      include: {
        address: true,
      },
    });

    const addressData = result.address
      ? omit(result.address, ['id', 'profileId'])
      : null;
    const newData = {
      ...result,
      address: addressData,
    };

    return {
      user: new CreateUserEntity(omit(newData, ['username', 'password'])),
    };
  }

  async getToken(data: GetTokenDto): Promise<string> {
    const { email } = data;
    // if (!email) throw new BadRequestException('Email is required');
    if (!email)
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Email is required',
      });

    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    // if (!user) throw new NotFoundException('User not found');
    if (!user)
      throw new RpcException({
        code: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });

    const payload = { sub: user.userId, email: user.email, role: user.role };
    return await this.jwtService.signAsync(payload);
  }

  async update(data: UpdateUserDto) {
    let message = `This action updates that ${data.email}`;
    return message;
  }
}
