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
  implements UseCase<Promise<boolean>, [id: number]>
{
  private prisma: any;
  constructor(private readonly taskRepository: TaskRepository) {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validate DTO
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Task name is required.');
    }

    try {
      // Create a new task in the database
      const newTask = await this.prisma.task.create({
        data: {
          name: dto.name,
        },
      });

      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);

      // Handle specific Prisma errors if needed
      throw new InternalServerErrorException('Failed to create the task.');
    }
  }
}
