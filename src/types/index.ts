export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'WAITING' | 'COMPLETED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TaskCategory = 
  | 'Household' 
  | 'Money' 
  | 'Self-Care' 
  | 'Work' 
  | 'Health' 
  | 'General';

export type ViewType = 
  | 'kanban' 
  | 'calendar' 
  | 'habits' 
  | 'mood' 
  | 'accountability' 
  | 'therapist'
  | 'about';

export type ThemeMode = 'light' | 'dark';

export type StressLevelRange = 'ALL' | 'LOW' | 'MID' | 'HIGH'; // LOW (1-3), MID (4-6), HIGH (7-10)

export interface Subtask {
  id: string;
  taskId?: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  stressPoints: number; // 1 (low avoidance) to 10 (paralyzing avoidance)
  category: TaskCategory;
  goalId?: string;
  dueDate?: string;
  estimatedMinutes?: number;
  assignedPartnerId?: string;
  createdAt: string;
  updatedAt: string;
  subtasks?: Subtask[];
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  targetDate?: string;
  color: string;
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  category?: TaskCategory;
  streakCount: number;
  currentStreak: number;
  completedDates: string[]; // YYYY-MM-DD
  history: (string | { date: string; completed: boolean })[];
  frequency?: string;
  targetDays?: number;
}

export interface MoodLog {
  id: string;
  timestamp: string;
  score: number; // 1 (overwhelmed) to 10 (radiant flow)
  energy: number; // 1 (drained) to 10 (hyperfocus)
  energyLevel?: number;
  stressLevel?: number;
  createdAt?: string;
  notes?: string;
}

export interface AccountabilityPartner {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  status: 'ONLINE' | 'IN_SESSION' | 'OFFLINE';
  activeTask?: string;
}

export interface BodyDoublingSession {
  active: boolean;
  status?: 'ACTIVE' | 'IDLE' | 'COMPLETED';
  partnerName?: string;
  partner?: AccountabilityPartner;
  startTime?: string;
  durationMinutes: number;
  taskSummary?: string;
}

export interface TherapistPermission {
  allowMoodView: boolean;
  allowStressView: boolean;
  allowNotesView: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  avatarTheme?: 'fun-emoji' | 'bottts' | 'adventurer' | 'lorelei' | 'pixel-art';
  dailyStressCeiling: number;
  defaultSoundscape: string;
  therapistAccessCode?: string;
}
