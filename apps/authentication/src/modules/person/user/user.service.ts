import { UserEntity, CreateUserDto, UpdateUserDto, SignInDto } from '@messaging-app/backend-shared';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByCredentialsOrFailed(signInDto: SignInDto, throwError = true): Promise<UserEntity> {
    const qb = this._userRepository.createQueryBuilder('user');
    if(signInDto.username) qb.where('username =: username', {username: signInDto.username});
    else qb.where('email =: email', {email: signInDto.email});
    const user = await qb.getOne();
    if(!user && throwError) throw new NotFoundException('threr is no user this this credentials');
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
      console.log('an error ocurred in creating new user', err);
      throw err;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findByIdOrFailed(id);
    try {
      const updatedUser = this._userRepository.create({...user, ...updateUserDto});
      return this._userRepository.save(updatedUser);
    } catch (err: unknown) {
      console.log('an error ocurred in updating an existing user', err);
      throw err;
    }
  }
}
