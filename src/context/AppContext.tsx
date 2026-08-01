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
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;

  // Stress Metrics
  totalDailyStressPoints: number;
  completedDailyStressPoints: number;

  // Habits
  addHabit: (habit: Omit<Habit, 'id' | 'streakCount' | 'currentStreak' | 'completedDates' | 'history'>) => void;
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
  name: 'Demo User',
  email: 'guest@braintether.app',
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
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('braintether_profile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          setUserProfile(parsed);

          if (parsed.email && parsed.email !== 'guest@braintether.app') {
            const savedTasks = localStorage.getItem(`braintether_tasks_${parsed.email}`);
            if (savedTasks) {
              setTasks(JSON.parse(savedTasks));
            } else {
              setTasks([]); // Fresh clean workspace for new personal accounts!
            }
          }
        } catch (e) {
          console.error('Failed to parse saved profile', e);
        }
      }
    }
  }, []);

  const saveTasks = (newTasks: Task[], email?: string) => {
    const targetEmail = email || userProfile.email;
    if (typeof window !== 'undefined' && targetEmail && targetEmail !== 'guest@braintether.app') {
      localStorage.setItem(`braintether_tasks_${targetEmail}`, JSON.stringify(newTasks));
    }
  };

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
    setUserProfile(prev => {
      const updated = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('braintether_profile', JSON.stringify(updated));
        if (updated.email && updated.email !== 'guest@braintether.app') {
          const saved = localStorage.getItem(`braintether_tasks_${updated.email}`);
          if (!saved) {
            setTasks([]);
            localStorage.setItem(`braintether_tasks_${updated.email}`, JSON.stringify([]));
          } else {
            try {
              setTasks(JSON.parse(saved));
            } catch {
              setTasks([]);
            }
          }
        }
      }
      return updated;
    });
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => {
      const updated = [newTask, ...prev];
      saveTasks(updated);
      return updated;
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => {
      const updated = prev.map(t => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
      saveTasks(updated);
      return updated;
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prev => {
      const updated = prev.filter(t => t.id !== id);
      saveTasks(updated);
      return updated;
    });
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => {
      const updated = prev.map(t =>
        t.id === taskId
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
          : t
      );
      saveTasks(updated);
      return updated;
    });
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

  const addHabit = (habitData: Omit<Habit, 'id' | 'streakCount' | 'currentStreak' | 'completedDates' | 'history'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: `habit-${Date.now()}`,
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
        const completedList = h.completedDates || [];
        if (completedList.includes(today)) return h; // already completed today
        const newDates = [...completedList, today];
        const newStreak = (h.currentStreak || 0) + 1;
        return {
          ...h,
          completedDates: newDates,
          currentStreak: newStreak,
          streakCount: Math.max(h.streakCount || 0, newStreak),
        };
      })
    );
  };

  const addMoodLog = (score: number, energy: number, notes?: string) => {
    const newLog: MoodLog = {
      id: `mood-${Date.now()}`,
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
        const q = t.title.toLowerCase();

        let autoSteps: { title: string }[] = [];

        if (q.includes('tire') || q.includes('car') || q.includes('auto')) {
          autoSteps = [
            { title: '🔍 Research tire size, speed rating & compare price deals (15m)' },
            { title: '📞 Call 2 local tire shops to verify stock & schedule appointment (10m)' },
            { title: '🚗 Drive car to service center & hand over keys (20m)' },
            { title: '☕ Wait in lounge or body-double while installation completes (45m)' },
          ];
        } else if (q.includes('tax') || q.includes('mail') || q.includes('bill') || q.includes('paper')) {
          autoSteps = [
            { title: '✂️ Open mail envelope & sort into action vs archive pile (5m)' },
            { title: '📄 Scan/photo document for digital records (5m)' },
            { title: '💳 Pay online or schedule payment due date (10m)' },
          ];
        } else if (q.includes('clean') || q.includes('kitchen') || q.includes('counter') || q.includes('room')) {
          autoSteps = [
            { title: '🧽 Clear trash & empty dishes into sink (5m)' },
            { title: '🧼 Wipe down main counter surface (5m)' },
            { title: '🗑️ Take out trash bag & reset room (3m)' },
          ];
        } else if (q.includes('doctor') || q.includes('refill') || q.includes('med') || q.includes('health')) {
          autoSteps = [
            { title: '📞 Call clinic/pharmacy or open patient portal (5m)' },
            { title: '📅 Confirm appointment slot or prescription pickup (5m)' },
            { title: '💊 Set phone reminder for medication or appointment (2m)' },
          ];
        } else {
          autoSteps = [
            { title: `🔍 Clarify first 5-minute action step for "${t.title}" (5m)` },
            { title: '🧰 Gather required tabs, links, tools or phone numbers (5m)' },
            { title: '⚡ Execute initial 15-minute focus session without overthinking (15m)' },
            { title: '🏁 Review result & mark task complete (5m)' },
          ];
        }

        const generatedSubtasks = autoSteps.map((s, idx) => ({
          id: `st-${Date.now()}-${idx + 1}`,
          taskId,
          title: s.title,
          completed: false,
        }));

        return {
          ...t,
          subtasks: [...(t.subtasks || []), ...generatedSubtasks],
          stressPoints: Math.max(1, t.stressPoints - 2), // De-escalate stress points when broken down!
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const totalDailyStressPoints = tasks
    .filter(t => t.status !== 'COMPLETED')
    .reduce((acc, curr) => acc + curr.stressPoints, 0);

  const completedDailyStressPoints = tasks
    .filter(t => t.status === 'COMPLETED')
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
