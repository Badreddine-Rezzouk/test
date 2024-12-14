import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    id: number,
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    // If `data` has no `id`, it's a creation
    if (!data.id) {
      // Make sure to exclude `id` when creating
      const { ...createData } = data as Prisma.TaskCreateInput; // `id` should not be included in creation
      return this.prisma.task.create({
        data: createData, // Pass only creation data (no `id`)
      });
    } else {
      const { ...updateData } = data as Prisma.TaskUpdateInput;
      return this.prisma.task.update({
        where: {
          id: id as number, // `id` goes in the `where` clause for updates
        },
        data: updateData, // Update the other fields
      });
      // If `id` is provided, it's an update
    }
  }
}
