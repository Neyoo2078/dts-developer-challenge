import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskStatusBadge } from './TaskStatusBadge';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isOverdue = isPast(task.dueDate) && task.status !== 'completed';
  const isDueToday = isToday(task.dueDate);

  return (
    <Card className="group transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={cn(
              'text-lg font-semibold line-clamp-2',
              task.status === 'completed' && 'line-through text-muted-foreground'
            )}
          >
            {task.title}
          </CardTitle>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(task)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(task)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onStatusChange(task)}
            className="focus:outline-none"
          >
            <TaskStatusBadge status={task.status} className="cursor-pointer" />
          </button>
          <div
            className={cn(
              'flex items-center gap-1.5 text-sm',
              isOverdue && 'text-destructive',
              isDueToday && !isOverdue && 'text-amber-600',
              !isOverdue && !isDueToday && 'text-muted-foreground'
            )}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(task.dueDate, 'MMM d, yyyy')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
