import { Injectable } from '@nestjs/common';
import { SearchUsersResponseEntity } from './entities/search-users-response.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchUserEntity } from './entities/search-user.entity';
import { SearchUserResponseEntity } from './entities/search-user-response.entity';
import { omit } from 'lodash';
import { AddressDto } from 'src/user/dto/address-dto';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<SearchUsersResponseEntity> {
    const results = await this.prismaService.user.findMany({
      include: {
        address: true,
      },
      // orderBy: { sequence: 'asc' },
    });

    return {
      users: results.map((e) => {
        const user = omit(e, ['password', 'username', 'role']);
        const address = e.address ? omit(e.address, ['id', 'profileId']) : null;
        return {
          ...user,
          address: address,
        };
      }),
    };
  }

  async findOne(userId: string): Promise<SearchUserResponseEntity> {
    const result = await this.prismaService.user.findUnique({
      where: { userId },
      include: {
        address: true,
      },
      // orderBy: { sequence: 'asc' },
    });

    const addressData = result.address
      ? omit(result.address, ['id', 'profileId'])
      : null;
    const newData = {
      ...result,
      address: addressData,
    };

    return {
      user: new SearchUserEntity(omit(newData, ['password', 'username'])),
    };
  }
}
