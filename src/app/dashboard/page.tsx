'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { KanbanBoard } from '../../components/kanban/KanbanBoard';
import { TaskModal } from '../../components/kanban/TaskModal';
import { CalendarView } from '../../components/calendar/CalendarView';
import { HabitsTracker } from '../../components/habits/HabitsTracker';
import { MoodAnalytics } from '../../components/mood/MoodAnalytics';
import { BodyDoubling } from '../../components/accountability/BodyDoubling';
import { TherapistPortal } from '../../components/therapist/TherapistPortal';
import { AboutView } from '../../components/about/AboutView';
import { OverwhelmModal } from '../../components/focus/OverwhelmModal';
import { OnboardingWizard } from '../../components/onboarding/OnboardingWizard';
import { AmbientPlayer } from '../../components/audio/AmbientPlayer';
import { TaskCategory, Task, TaskStatus } from '../../types';

export default function DashboardPage() {
  const { activeView, addTask, updateUserProfile } = useApp();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [newTaskInitialStatus, setNewTaskInitialStatus] = useState<TaskStatus>('TODO');
  const [isOverwhelmModalOpen, setIsOverwhelmModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const handleOpenNewTaskModal = (status: TaskStatus = 'TODO') => {
    setTaskToEdit(null);
    setNewTaskInitialStatus(status);
    setIsNewTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsNewTaskModalOpen(true);
  };

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('braintether_onboarding_completed');
    if (!hasSeenGuide) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('braintether_onboarding_completed', 'true');
    setIsOnboardingOpen(false);
  };

  const handleSaveProfile = (profileData: { name: string; avatarUrl: string }) => {
    updateUserProfile(profileData);
  };

  const handleCreateFirstTask = (taskData: { title: string; stressPoints: number; category: TaskCategory }) => {
    addTask({
      title: taskData.title,
      description: 'First actionable task created during onboarding.',
      stressPoints: taskData.stressPoints,
      category: taskData.category,
      priority: taskData.stressPoints > 7 ? 'HIGH' : 'MEDIUM',
      status: 'TODO',
    });
    handleCompleteOnboarding();
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'kanban':
        return (
          <KanbanBoard 
            onOpenNewTaskModal={() => handleOpenNewTaskModal('TODO')} 
            onOpenNewTaskModalWithStatus={(status) => handleOpenNewTaskModal(status)}
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
      case 'about':
        return <AboutView />;
      default:
        return (
          <KanbanBoard 
            onOpenNewTaskModal={() => handleOpenNewTaskModal('TODO')} 
            onOpenNewTaskModalWithStatus={(status) => handleOpenNewTaskModal(status)}
            onEditTask={handleEditTask}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-zen-bg-light dark:bg-zen-bg-dark text-slate-800 dark:text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header 
          onOpenNewTaskModal={() => handleOpenNewTaskModal('TODO')}
          onOpenOverwhelmModal={() => setIsOverwhelmModalOpen(true)}
          onOpenTutorial={() => setIsOnboardingOpen(true)}
        />

        <main className="p-6 max-w-7xl mx-auto w-full flex-1">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & Audio Synth */}
      <TaskModal 
        isOpen={isNewTaskModalOpen} 
        onClose={() => {
          setIsNewTaskModalOpen(false);
          setTaskToEdit(null);
        }} 
        initialStatus={newTaskInitialStatus}
        taskToEdit={taskToEdit}
      />

      <OverwhelmModal 
        isOpen={isOverwhelmModalOpen} 
        onClose={() => setIsOverwhelmModalOpen(false)} 
      />

      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={handleCompleteOnboarding}
        onSaveProfile={handleSaveProfile}
        onCreateFirstTask={handleCreateFirstTask}
      />

      <AmbientPlayer />

    </div>
  );
}
