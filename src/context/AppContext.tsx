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
import { MINDSTATE_AVATARS } from '../components/onboarding/OnboardingWizard';

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
  name: 'Michael Ortenberg',
  email: 'michael.ortenberg@gmail.com',
  avatarUrl: MINDSTATE_AVATARS[9].url,
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

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      userId: 'user-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId || !t.subtasks) return t;
        const updatedSubtasks = t.subtasks.map(st =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        return { ...t, subtasks: updatedSubtasks, updatedAt: new Date().toISOString() };
      })
    );
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'streakCount' | 'currentStreak' | 'completedDates' | 'history'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: `habit-${Date.now()}`,
      userId: 'user-1',
      streakCount: 0,
      currentStreak: 0,
      completedDates: [],
      history: [],
    };
    setHabits(prev => [newHabit, ...prev]);
  };

  const logHabitCompletion = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== habitId) return h;
        if (h.completedDates.includes(today)) return h; // already completed today
        const newDates = [...h.completedDates, today];
        const newStreak = h.currentStreak + 1;
        return {
          ...h,
          completedDates: newDates,
          currentStreak: newStreak,
          streakCount: Math.max(h.streakCount, newStreak),
        };
      })
    );
  };

  const addMoodLog = (score: number, energy: number, notes?: string) => {
    const newLog: MoodLog = {
      id: `mood-${Date.now()}`,
      userId: 'user-1',
      timestamp: new Date().toISOString(),
      score,
      energy,
      notes,
    };
    setMoodLogs(prev => [newLog, ...prev]);
  };

  const toggleTherapistPermission = (field: keyof TherapistPermission) => {
    setTherapistPermission(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const startBodyDoubling = (taskSummary: string, durationMinutes = 25) => {
    setBodyDoublingSession({
      active: true,
      partner: INITIAL_PARTNERS[0],
      startTime: new Date().toISOString(),
      durationMinutes,
      taskSummary,
    });
  };

  const endBodyDoubling = () => {
    setBodyDoublingSession(prev => ({ ...prev, active: false }));
  };

  const breakDownTaskWithAI = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId) return t;
        const generatedSubtasks = [
          { id: `st-${Date.now()}-1`, title: `Clarify first 5-minute action step for "${t.title}"`, completed: false },
          { id: `st-${Date.now()}-2`, title: 'Gather links, tabs & documents needed', completed: false },
          { id: `st-${Date.now()}-3`, title: 'Draft initial outline or preliminary draft', completed: false },
          { id: `st-${Date.now()}-4`, title: 'Review and mark task complete', completed: false },
        ];
        return {
          ...t,
          subtasks: [...(t.subtasks || []), ...generatedSubtasks],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const totalDailyStressPoints = tasks
    .filter(t => t.status !== 'DONE')
    .reduce((acc, curr) => acc + curr.stressPoints, 0);

  const completedDailyStressPoints = tasks
    .filter(t => t.status === 'DONE')
    .reduce((acc, curr) => acc + curr.stressPoints, 0);

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
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
