export type ViewType = 
  | 'kanban' 
  | 'calendar' 
  | 'habits' 
  | 'mood' 
  | 'accountability' 
  | 'therapist';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';

export type TaskCategory = 'Household' | 'Money' | 'Self-Care' | 'Work' | 'Health' | 'General';

export type StressLevelRange = 'ALL' | 'LOW' | 'MID' | 'HIGH';

export interface Subtask {
  id: string;
  taskId?: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: string;
  color: string;
}

export interface Task {
  id: string;
  userId: string;
  goalId?: string;
  goal?: Goal;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  stressPoints: number; // 1 - 10
  category: TaskCategory;
  dueDate?: string;
  assignedPartnerId?: string;
  assignedPartnerName?: string;
  assignedPartnerAvatar?: string;
  createdAt: string;
  subtasks: Subtask[];
}

export interface Habit {
  id: string;
  userId: string;
  goalId?: string;
  goal?: Goal;
  title: string;
  description?: string;
  frequency: 'DAILY' | 'WEEKLY';
  targetDays: number;
  streakCount: number;
  lastLogged?: string;
  history: string[]; // ISO date strings
}

export interface MoodLog {
  id: string;
  userId: string;
  score: number; // 1 to 5
  energy: number; // 1 to 5
  notes?: string;
  loggedAt: string; // ISO date string
}

export interface BodyDoublingSession {
  id: string;
  hostName: string;
  hostAvatar: string;
  partnerName?: string;
  partnerAvatar?: string;
  durationMinutes: number;
  elapsedSeconds: number;
  status: 'WAITING' | 'ACTIVE' | 'FINISHED';
  myTaskSummary: string;
  partnerTaskSummary?: string;
  sharedNote?: string;
}

export interface AccountabilityPartner {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'ONLINE' | 'IN_SESSION' | 'OFFLINE';
  lastEncouragement?: string;
}

export interface TherapistPermission {
  allowMoodView: boolean;
  allowStressView: boolean;
  allowNotesView: boolean;
  accessCode: string;
  therapistName?: string;
  therapistEmail?: string;
}
