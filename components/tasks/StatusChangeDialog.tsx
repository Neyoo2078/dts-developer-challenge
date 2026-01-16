import { Task, TaskStatus } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskStatusBadge } from './TaskStatusBadge';

interface StatusChangeDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (status: TaskStatus) => void;
}

const statusOptions: TaskStatus[] = ['todo', 'in_progress', 'completed'];

export function StatusChangeDialog({
  task,
  open,
  onOpenChange,
  onStatusChange,
}: StatusChangeDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
          <DialogDescription>
            Select a new status for "{task.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={task.status === status ? 'secondary' : 'outline'}
              className="justify-start gap-3"
              onClick={() => {
                onStatusChange(status);
                onOpenChange(false);
              }}
            >
              <TaskStatusBadge status={status} />
              {task.status === status && (
                <span className="text-xs text-muted-foreground ml-auto">Current</span>
              )}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
