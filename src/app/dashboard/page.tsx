'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { CalendarView } from '@/components/calendar/CalendarView';
import { HabitsTracker } from '@/components/habits/HabitsTracker';
import { MoodAnalytics } from '@/components/mood/MoodAnalytics';
import { BodyDoubling } from '@/components/accountability/BodyDoubling';
import { TherapistPortal } from '@/components/therapist/TherapistPortal';
import { TaskModal } from '@/components/kanban/TaskModal';
import { OverwhelmModal } from '@/components/focus/OverwhelmModal';
import { Task, TaskStatus } from '@/types';

export default function DashboardPage() {
  const { activeView } = useApp();

  // Task Modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalInitialStatus, setModalInitialStatus] = useState<TaskStatus>('TODO');
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Overwhelm Modal state
  const [isOverwhelmOpen, setIsOverwhelmOpen] = useState(false);

  const handleOpenNewTaskModal = () => {
    setTaskToEdit(null);
    setModalInitialStatus('TODO');
    setIsTaskModalOpen(true);
  };

  const handleOpenNewTaskWithStatus = (status: TaskStatus) => {
    setTaskToEdit(null);
    setModalInitialStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const renderMainView = () => {
    switch (activeView) {
      case 'kanban':
        return (
          <KanbanBoard
            onOpenNewTaskModalWithStatus={handleOpenNewTaskWithStatus}
            onEditTask={handleEditTask}
          />
        );
      case 'calendar':
        return <CalendarView />;
      case 'habits':
        return <HabitsTracker />;
      case 'mood':
        return <MoodAnalytics />;
      case 'accountability':
        return <BodyDoubling />;
      case 'therapist':
        return <TherapistPortal />;
      default:
        return (
          <KanbanBoard
            onOpenNewTaskModalWithStatus={handleOpenNewTaskWithStatus}
            onEditTask={handleEditTask}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zen-bg-light dark:bg-zen-bg-dark transition-colors duration-300">
      
      {/* Left Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <Header 
          onOpenNewTaskModal={handleOpenNewTaskModal} 
          onOpenOverwhelmModal={() => setIsOverwhelmOpen(true)}
        />

        {/* View Content */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {renderMainView()}
        </main>
      </div>

      {/* Task Creation/Editing Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        initialStatus={modalInitialStatus}
        taskToEdit={taskToEdit}
      />

      {/* Executive Dysfunction Overwhelm Modal */}
      <OverwhelmModal
        isOpen={isOverwhelmOpen}
        onClose={() => setIsOverwhelmOpen(false)}
      />
    </div>
  );
}
