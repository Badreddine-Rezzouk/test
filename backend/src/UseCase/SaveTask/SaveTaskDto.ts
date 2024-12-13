export default class SaveTaskDto {
  // Make id optional, as Prisma auto-generates it during task creation
  id?: number | null; // id is optional or can be null when creating tasks

  name: string;
}
