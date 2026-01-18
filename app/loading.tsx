'use client';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
