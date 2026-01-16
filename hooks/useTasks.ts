import { useState, useCallback } from 'react';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: generateId(),
    title: 'Review project requirements',
    description:
      'Go through the project documentation and understand all requirements',
    status: 'completed',
    dueDate: new Date(Date.now() - 86400000),
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: generateId(),
    title: 'Design database schema',
    description: 'Create the database schema for the task management system',
    status: 'in_progress',
    dueDate: new Date(Date.now() + 86400000),
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Implement API endpoints',
    status: 'todo',
    dueDate: new Date(Date.now() + 172800000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Write unit tests',
    description: 'Add comprehensive unit tests for all API endpoints',
    status: 'todo',
    dueDate: new Date(Date.now() + 259200000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const createTask = useCallback((data: CreateTaskData): Task => {
    const newTask: Task = {
      id: generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const getTaskById = useCallback(
    (id: string): Task | undefined => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const updateTask = useCallback(
    (id: string, data: UpdateTaskData): Task | undefined => {
      let updatedTask: Task | undefined;
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            updatedTask = { ...task, ...data, updatedAt: new Date() };
            return updatedTask;
          }
          return task;
        })
      );
      return updatedTask;
    },
    []
  );

  const deleteTask = useCallback((id: string): boolean => {
    let deleted = false;
    setTasks((prev) => {
      const filtered = prev.filter((task) => task.id !== id);
      deleted = filtered.length < prev.length;
      return filtered;
    });
    return deleted;
  }, []);

  const updateTaskStatus = useCallback(
    (id: string, status: Task['status']): Task | undefined => {
      return updateTask(id, { status });
    },
    [updateTask]
  );

  return {
    tasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
}
