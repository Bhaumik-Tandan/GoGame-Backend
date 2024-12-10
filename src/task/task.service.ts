import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  // Create a new task, associating it with the userId
  async create(createTaskDto, user: string) {
    const newTask = new this.taskModel({ ...createTaskDto, user });
    return await newTask.save(); // Save the task directly
  }

  // Find all tasks for the authenticated user
  async findAll(user: string) {
    return await this.taskModel.find({ user }).exec(); // Filter tasks by userId
  }

  async findOne(id: string, user: string) {
    return await this.taskModel.findOne({ _id: id, user }).exec();
  }
  
  async update(id: string, updateTaskDto, user: string) {
    return await this.taskModel.findOneAndUpdate({ _id: id, user }, updateTaskDto, { new: true }).exec();
  }
  
  async remove(id: string, user: string) {
    return await this.taskModel.deleteOne({ _id: id, user }).exec();
  }
  
}
