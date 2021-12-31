import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserRepository } from 'src/users/domain/repository';
import { User } from 'src/users/domain/user';

export class UserRepositoryImplement implements UserRepository {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  async save(data: User | User[]): Promise<void> {
    const createdUser = new this.userModel(data);
    console.log(createdUser);
    await createdUser.save();
    return;
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findOne({ id });
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return await this.userModel.find().where('id').in(ids).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
