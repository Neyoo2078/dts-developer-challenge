import Image from 'next/image';
import { Home as Homes } from '@/components/Home';
import { getTasks } from '@/lib/actions/actions';

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Homes task={tasks} />
    </div>
  );
}
