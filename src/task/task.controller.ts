import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Use the guard to ensure the user is authenticated
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Endpoint to create a new task
  @Post()
  create(@Body() createTaskDto, @Req() req) {
    const userId = req.user.id; // Extract user ID from the request
    return this.taskService.create(createTaskDto, userId); // Pass the userId to the service
  }

  // Endpoint to fetch all tasks for the authenticated user
  @Get()
  findAll(@Req() req) {
    const userId = req.user.id; // Extract user ID from the request
    return this.taskService.findAll(userId); // Pass the userId to the service
  }

  // Endpoint to fetch a specific task by ID
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id; // Ensure the user ID is passed for security
    return this.taskService.findOne(id, userId); // Pass the userId to the service
  }

  // Endpoint to update a task
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto, @Req() req) {
    const userId = req.user.id; // Ensure the user ID is passed for security
    return this.taskService.update(id, updateTaskDto, userId); // Pass the userId to the service
  }

  // Endpoint to delete a task
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id; // Ensure the user ID is passed for security
    return this.taskService.remove(id, userId); // Pass the userId to the service
  }
}
