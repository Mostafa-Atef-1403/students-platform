import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { InstructorSidebar } from './InstructorSidebar';

interface InstructorLayoutProps {
  children: ReactNode;
}

export function InstructorLayout({ children }: InstructorLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 sticky top-0 z-40">
            <SidebarTrigger className="mr-4" />
          </header>
          <div className="flex-1 p-6 bg-background">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
