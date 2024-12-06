import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import UserSchema from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name)
    private userModel: Model<typeof UserSchema>,
  ) {}
  async create(createUserBody) {
    const createdUser = new this.userModel(createUserBody);
    return createdUser.save();
  }

  async findByUsername(username) {
    return await this.userModel.findOne
    ({ username }).exec();
  }


  async findById(id) {
    return await this.userModel.findById(id).exec();
  }
}
