import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
//import TaskRepository from '../../Repositories/TaskRepository';
import { PrismaService } from '../../PrismaService';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly prisma: PrismaService) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validate DTO
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Task name is required.');
    }

    try {
      let task: Task;

      if (dto.id) {
        // If `id` is provided, update the existing task
        task = await this.prisma.task.update({
          where: { id: dto.id },
          data: { name: dto.name },
        });
      } else {
        // If no `id`, create a new task
        task = await this.prisma.task.create({
          data: { name: dto.name },
        });
      }

      return task;
    } catch (error) {
      console.error('Error saving task:', error);

      // Handle specific Prisma errors if necessary (e.g., record not found, constraint violations)
      throw new InternalServerErrorException('Failed to save the task.');
    }
  }
}