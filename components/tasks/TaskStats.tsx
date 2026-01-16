import { Task } from '@/types/task';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: ListTodo,
      className: 'text-foreground',
    },
    {
      label: 'To Do',
      value: todo,
      icon: Circle,
      className: 'text-muted-foreground',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Clock,
      className: 'text-primary',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      className: 'text-green-600',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={stat.className}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
