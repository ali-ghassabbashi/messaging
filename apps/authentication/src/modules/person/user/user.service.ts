import { UserEntity, CreateUserDto, UpdateUserDto } from '@messaging-app/backend-shared';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>) {}
  
  async findByIdOrFailed(id: string, throwError = true): Promise<UserEntity> {
    const user = await this._userRepository.findOne({where: { id }});
    if(!user && throwError) throw new NotFoundException('there is no user with this id.');
    return user;
  }

  findAll(): Promise<UserEntity[]> {
    return this._userRepository.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.findByIdOrFailed(id);
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const createdUser = this._userRepository.create(createUserDto);
      return this._userRepository.save(createdUser);
    } catch(err: unknown) {
      const errorMessage = 'an error ocurred in creating new user';
      console.log(errorMessage, err);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findByIdOrFailed(id);
    try {
      const updatedUser = this._userRepository.create({...user, ...updateUserDto});
      return this._userRepository.save(updatedUser);
    } catch (err: unknown) {
      const errorMessage = 'an error ocurred in updating an existing user';
      console.log(errorMessage, err);
      throw new InternalServerErrorException(errorMessage);
    }
  }
}
