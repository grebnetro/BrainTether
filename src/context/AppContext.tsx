'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Task, Goal, Habit, MoodLog, ViewType, TaskStatus, TaskCategory, 
  StressLevelRange, BodyDoublingSession, AccountabilityPartner, TherapistPermission, UserProfile 
} from '../types';
import { 
  INITIAL_TASKS, INITIAL_GOALS, INITIAL_HABITS, INITIAL_MOOD_LOGS, 
  INITIAL_PARTNERS, INITIAL_BODY_DOUBLING, INITIAL_THERAPIST_ACCESS 
} from '../lib/initialData';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (t: 'dark' | 'light') => void;

  activeView: ViewType;
  setActiveView: (v: ViewType) => void;

  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  tasks: Task[];
  goals: Goal[];
  habits: Habit[];
  moodLogs: MoodLog[];
  partners: AccountabilityPartner[];
  bodyDoublingSession: BodyDoublingSession;
  therapistPermission: TherapistPermission;

  // Filtering
  stressFilter: StressLevelRange;
  setStressFilter: (r: StressLevelRange) => void;
  categoryFilter: TaskCategory | 'ALL';
  setCategoryFilter: (c: TaskCategory | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;

  // Stress Metrics
  totalDailyStressPoints: number;
  completedDailyStressPoints: number;

  // Habits
  addHabit: (habit: Omit<Habit, 'id' | 'userId' | 'streakCount' | 'currentStreak' | 'completedDates' | 'history'>) => void;
  logHabitCompletion: (habitId: string) => void;

  // Mood
  addMoodLog: (score: number, energy: number, notes?: string) => void;

  // Therapist Access
  toggleTherapistPermission: (field: keyof TherapistPermission) => void;

  // Body Doubling
  startBodyDoubling: (taskSummary: string, durationMinutes?: number) => void;
  endBodyDoubling: () => void;
  
  // Quick AI Breakdown
  breakDownTaskWithAI: (taskId: string) => void;
}

const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex@braintether.app',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  dailyStressCeiling: 30,
  defaultSoundscape: 'rain',
  therapistAccessCode: 'BT-772-MIND',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [activeView, setActiveView] = useState<ViewType>('kanban');

  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [goals] = useState<Goal[]>(INITIAL_GOALS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(INITIAL_MOOD_LOGS);
  const [partners] = useState<AccountabilityPartner[]>(INITIAL_PARTNERS);
  const [bodyDoublingSession, setBodyDoublingSession] = useState<BodyDoublingSession>(INITIAL_BODY_DOUBLING);
  const [therapistPermission, setTherapistPermission] = useState<TherapistPermission>(INITIAL_THERAPIST_ACCESS);

  const [stressFilter, setStressFilter] = useState<StressLevelRange>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (t: 'dark' | 'light') => {
    setThemeState(t);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const totalDailyStressPoints = tasks
    .filter(t => t.status !== 'COMPLETED')
    .reduce((acc, curr) => acc + curr.stressPoints, 0);

  const completedDailyStressPoints = tasks
    .filter(t => t.status === 'COMPLETED')
    .reduce((acc, curr) => acc + curr.stressPoints, 0);

  const addTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const subs = t.subtasks || [];
      return {
        ...t,
        subtasks: subs.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st)
      };
    }));
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'streakCount' | 'currentStreak' | 'completedDates' | 'history'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: `habit-${Date.now()}`,
      currentStreak: 1,
      streakCount: 1,
      completedDates: [new Date().toISOString().split('T')[0]],
      history: [new Date().toISOString().split('T')[0]],
    };
    setHabits(prev => [newHabit, ...prev]);
  };

  const logHabitCompletion = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev => prev.map(h => {
      if (h.id !== habitId) return h;
      const dates = h.completedDates || h.history || [];
      const alreadyDoneToday = dates.includes(today);
      if (alreadyDoneToday) return h;
      const current = h.currentStreak || h.streakCount || 0;
      return {
        ...h,
        currentStreak: current + 1,
        streakCount: current + 1,
        completedDates: [...dates, today],
        history: [...dates, today]
      };
    }));
  };

  const addMoodLog = (score: number, energy: number, notes?: string) => {
    const newLog: MoodLog = {
      id: `mood-${Date.now()}`,
      energyLevel: energy,
      stressLevel: score,
      moodTag: score > 7 ? 'Anxious' : 'Focus',
      notes,
      createdAt: new Date().toISOString(),
    };
    setMoodLogs(prev => [newLog, ...prev]);
  };

  const toggleTherapistPermission = (field: keyof TherapistPermission) => {
    setTherapistPermission(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const startBodyDoubling = (taskSummary: string, durationMinutes = 25) => {
    setBodyDoublingSession({
      id: `session-${Date.now()}`,
      partnerName: 'Maya Chen',
      partnerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      status: 'ACTIVE',
      soundscape: 'rain',
    });
  };

  const endBodyDoubling = () => {
    setBodyDoublingSession(prev => ({
      ...prev,
      status: 'COMPLETED'
    }));
  };

  const breakDownTaskWithAI = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const existingSubs = t.subtasks || [];
      const generatedSteps = [
        { id: `sub-ai-1-${Date.now()}`, taskId: t.id, title: 'Step 1: Set a 5-minute timer & prepare workspace', completed: false },
        { id: `sub-ai-2-${Date.now()}`, taskId: t.id, title: 'Step 2: Do only the smallest initial action (1 minute)', completed: false },
        { id: `sub-ai-3-${Date.now()}`, taskId: t.id, title: 'Step 3: Pause and reward yourself with a deep breath', completed: false },
      ];
      return {
        ...t,
        subtasks: [...existingSubs, ...generatedSteps],
        stressPoints: Math.max(1, t.stressPoints - 2)
      };
    }));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        activeView,
        setActiveView,
        userProfile,
        updateUserProfile,
        tasks,
        goals,
        habits,
        moodLogs,
        partners,
        bodyDoublingSession,
        therapistPermission,
        stressFilter,
        setStressFilter,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleSubtask,
        totalDailyStressPoints,
        completedDailyStressPoints,
        addHabit,
        logHabitCompletion,
        addMoodLog,
        toggleTherapistPermission,
        startBodyDoubling,
        endBodyDoubling,
        breakDownTaskWithAI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
