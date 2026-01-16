'use client';

import { useState, useMemo, useEffect } from 'react';
import { Task, CreateTaskData, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskStats } from '@/components/tasks/TaskStats';
import { DeleteTaskDialog } from '@/components/tasks/DeleteTaskDialog';
import { StatusChangeDialog } from '@/components/tasks/StatusChangeDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createTask, updateTaskStatusOnly } from '@/lib/actions/actions';
import { updateTaskStatus } from '@/lib/actions/actions';
import { deleteTask } from '@/lib/actions/actions';

export const Home = ({ task }: { task: any }) => {
  // const { /*tasks,*/ createTask, updateTask, deleteTask, updateTaskStatus } =
  //   useTasks();
  const { toast } = useToast();

  const [taskUpdate, settaskUpdate] = useState<Task[]>([]);

  useEffect(() => {
    settaskUpdate([...task]);
  }, [task]);

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Status change dialog state
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [taskToChangeStatus, setTaskToChangeStatus] = useState<Task | null>(
    null
  );

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'createdAt' | 'title'>(
    'dueDate'
  );

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let result = [...taskUpdate];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((task) => task.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'createdAt':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [taskUpdate, search, statusFilter, sortBy]);

  // Handlers
  const handleCreateTask = () => {
    setEditingTask(undefined);
    setFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: CreateTaskData) => {
    if (editingTask) {
      updateTaskStatus(editingTask.id, data);
      toast({
        title: 'Task updated',
        description: 'The task has been updated successfully.',
      });
    } else {
      createTask(data);
      toast({
        title: 'Task created',
        description: 'The task has been created successfully.',
      });
    }
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      toast({
        title: 'Task deleted',
        description: 'The task has been deleted successfully.',
        variant: 'destructive',
      });
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleStatusClick = (task: Task) => {
    setTaskToChangeStatus(task);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = (status: TaskStatus) => {
    if (taskToChangeStatus) {
      updateTaskStatusOnly(taskToChangeStatus.id, status);
      toast({
        title: 'Status updated',
        description: `Task status changed to ${status.replace('_', ' ')}.`,
      });
    }
    setTaskToChangeStatus(null);
  };

  return (
    <div className="min-h-screen bg-background  w-full">
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Task Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your tasks efficiently
            </p>
          </div>
          {/* Cleared */}
          <Button onClick={handleCreateTask} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            New Task
          </Button>
        </div>
        {/* Stats */} {/* Cleared */}
        <TaskStats tasks={taskUpdate} />
        {/* Filters */} {/* Cleared Memo*/}
        <TaskFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
        {/* Task List  Clear*/}
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteClick}
          onStatusChange={handleStatusClick}
        />
        {/* Dialogs */}
        <TaskForm
          open={formOpen}
          onOpenChange={setFormOpen}
          task={editingTask}
          onSubmit={handleFormSubmit}
        />
        <DeleteTaskDialog
          task={taskToDelete}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
        />
        <StatusChangeDialog
          task={taskToChangeStatus}
          open={statusDialogOpen}
          onOpenChange={setStatusDialogOpen}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};
