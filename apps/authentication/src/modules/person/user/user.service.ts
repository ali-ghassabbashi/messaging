import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { UserNotFoundRpcException } from '@messaging-app/backend-shared/exceptions';
import { UserEntity } from '@messaging-app/backend-shared/entities';
import { CreateUserDto, SignInDto, UpdateUserDto } from '@messaging-app/backend-shared/dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>) {
  }

  async findByIdOrFailed(id: string, throwError = true): Promise<UserEntity> {
    if (!id) return;
    const user = await this._userRepository.findOne({ where: { id } });
    if (!user && throwError)
      throw new UserNotFoundRpcException('there is no user with this id.');
    return user;
  }

  async findByCredentialsOrFailed(signInDto: SignInDto, throwError = true): Promise<UserEntity> {
    const qb = this._userRepository.createQueryBuilder('user');
    if (signInDto.username)
      qb.where('username =: username', { username: signInDto.username });
    else qb.where('email = :email', { email: signInDto.email });
    const user = await qb.getOne();
    if (!user && throwError)
      throw new NotFoundException('there is no user this this credentials');
    return user;
  }

  searchByUsername(searchString: string): Promise<UserEntity[]> {
    return this._userRepository
      .createQueryBuilder('user')
      .select('user.username')
      .where('user.username like :username', { username: `%${searchString}%` })
      .getMany();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.findByIdOrFailed(id);
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const createdUser = this._userRepository.create(createUserDto);
      return this._userRepository.save(createdUser);
    } catch (err: any) {
      console.log('an error occurred in creating new user', err);
      throw new RpcException(err);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findByIdOrFailed(id);
    try {
      const updatedUser = this._userRepository.create({
        ...user,
        ...updateUserDto
      });
      return this._userRepository.save(updatedUser);
    } catch (err: any) {
      console.log('an error occurred in updating an existing user', err);
      throw new RpcException(err);
    }
  }
}
