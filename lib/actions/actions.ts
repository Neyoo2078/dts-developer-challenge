'use server';

import { TaskStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface TaskData {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
}

//CreateTask
export async function createTask(data: TaskData) {
  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: new Date(data.dueDate),
      },
    });

    revalidatePath('/');
    console.log(task);
    return { success: true, task };
  } catch (error) {
    return { success: false, error: 'Failed to create task' };
  }
}

//Get All Tasks
export async function getTasks() {
  const task = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
  
  return task;
}

//Get Task by ID
export async function getTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id },
  });
}

//Update Status
export async function updateTaskStatus(id: string, data: TaskData) {
  await prisma.task.update({
    where: { id },
    data,
  });

  revalidatePath('/');
}

export async function updateTaskStatusOnly(taskId: string, status: TaskStatus) {
  // Strict validation
  if (!Object.values(TaskStatus).includes(status)) {
    throw new Error('Invalid task status');
  }

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      status, // ONLY field allowed
    },
  });

  // Refresh UI cache
  revalidatePath('/');

  return task;
}

//Delete Task
export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath('/');
}
