import { Badge } from '@/components/ui/badge';
import { TaskStatus } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskStatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  todo: {
    label: 'To Do',
    className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-primary text-primary-foreground hover:bg-primary/80',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20',
  },
};

export function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
