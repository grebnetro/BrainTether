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

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  stressPoints: number; // 1 (low avoidance) to 10 (paralyzing avoidance)
  category: TaskCategory;
  dueDate?: string;
  assignedPartnerId?: string;
  createdAt: string;
  updatedAt: string;
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
  targetDays: number; // ADHD 21-day streak milestone
  currentStreak: number;
  completedDates: string[]; // ISO date strings
  category: TaskCategory;
}

export interface MoodLog {
  id: string;
  energyLevel: number; // 1 (drained) to 5 (vibrant)
  stressLevel: number; // 1 (calm) to 10 (overwhelmed)
  moodTag: string; // e.g. "Focus", "Anxious", "Calm", "Burnout"
  notes?: string;
  createdAt: string;
}

export interface BodyDoublingSession {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  status: 'IDLE' | 'ACTIVE' | 'COMPLETED';
  soundscape: 'rain' | 'brown' | 'ocean' | 'none';
  startedAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  dailyStressCeiling: number; // threshold before warning (default: 30)
  defaultSoundscape: string;
  therapistAccessCode: string;
}
