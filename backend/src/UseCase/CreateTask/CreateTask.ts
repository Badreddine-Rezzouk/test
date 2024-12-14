// CreateTask.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from '../SaveTask/SaveTaskDto';
import { Task } from '@prisma/client';

@Injectable()
export default class CreateTask
  implements UseCase<Promise<Task>, [SaveTaskDto]>{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validate DTO
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Task name is required.');
    }

    try {
      // Create a new task in the database
      const newTask = await this.taskRepository.save(null, {
        // Pass `null` for the ID
        name: dto.name, // Only pass fields required for creation
      });

      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new InternalServerErrorException('Failed to create the task.');
    }
  }
}
