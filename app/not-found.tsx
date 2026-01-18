'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const NotFound = () => {
  const location = usePathname();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location,
    );
  }, [location]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-6xl font-bold text-foreground">404</h1>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium text-foreground mb-2">
            Page not found
          </p>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
