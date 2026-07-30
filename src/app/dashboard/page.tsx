'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { KanbanBoard } from '../../components/kanban/KanbanBoard';
import { CalendarView } from '../../components/calendar/CalendarView';
import { HabitsTracker } from '../../components/habits/HabitsTracker';
import { MoodAnalytics } from '../../components/mood/MoodAnalytics';
import { BodyDoublingRoom } from '../../components/accountability/BodyDoublingRoom';
import { TherapistReview } from '../../components/therapist/TherapistReview';
import { AboutView } from '../../components/about/AboutView';
import { NewTaskModal } from '../../components/tasks/NewTaskModal';
import { OverwhelmModal } from '../../components/tasks/OverwhelmModal';
import { OnboardingWizard } from '../../components/onboarding/OnboardingWizard';
import { AmbientPlayer } from '../../components/audio/AmbientPlayer';
import { TaskCategory } from '../../types';

export default function DashboardPage() {
  const { activeView, addTask, userProfile, updateUserProfile } = useApp();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isOverwhelmModalOpen, setIsOverwhelmModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

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
        return <KanbanBoard onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)} />;
      case 'calendar':
        return <CalendarView />;
      case 'habits':
        return <HabitsTracker />;
      case 'mood':
        return <MoodAnalytics />;
      case 'accountability':
        return <BodyDoublingRoom />;
      case 'therapist':
        return <TherapistReview accessCode="BT-772-MIND" isReadonly={false} />;
      case 'about':
        return <AboutView />;
      default:
        return <KanbanBoard onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen bg-zen-bg-light dark:bg-zen-bg-dark text-slate-800 dark:text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header 
          onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
          onOpenOverwhelmModal={() => setIsOverwhelmModalOpen(true)}
          onOpenTutorial={() => setIsOnboardingOpen(true)}
        />

        <main className="p-6 max-w-7xl mx-auto w-full flex-1">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & Audio Synth */}
      <NewTaskModal 
        isOpen={isNewTaskModalOpen} 
        onClose={() => setIsNewTaskModalOpen(false)} 
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
