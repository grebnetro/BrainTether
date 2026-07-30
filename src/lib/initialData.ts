import { Goal, Task, Habit, MoodLog, BodyDoublingSession, AccountabilityPartner, TherapistPermission } from '../types';

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'goal-1',
    title: 'Declutter Living Space',
    description: 'Reduce visual overload & create a peaceful home sanctuary',
    category: 'Household',
    color: '#10b981', // Emerald
  },
  {
    id: 'goal-2',
    title: 'Financial Peace of Mind',
    description: 'Tackle unread bills, taxes, & organize subscriptions without panic',
    category: 'Money',
    color: '#f59e0b', // Amber
  },
  {
    id: 'goal-3',
    title: 'Nourish Daily Health',
    description: 'Consistent sleep, hydration, and gentle movement',
    category: 'Health',
    color: '#14b8a6', // Teal
  },
  {
    id: 'goal-4',
    title: 'Deep Work Projects',
    description: 'Progress on creative portfolio with micro-steps',
    category: 'Work',
    color: '#8b5cf6', // Purple
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    goalId: 'goal-2',
    title: 'Open pile of unopened tax mail on desk',
    description: 'Set a timer for 10 mins. Sort into keep/shred without overthinking.',
    status: 'TODO',
    priority: 'HIGH',
    stressPoints: 9, // HIGH STRESS / AVOIDANCE
    category: 'Money',
    dueDate: '2026-08-02T17:00:00.000Z',
    assignedPartnerId: 'partner-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-1', taskId: 'task-1', title: 'Bring envelope opener & trash bin to desk', completed: true },
      { id: 'sub-2', taskId: 'task-1', title: 'Open top 3 envelopes', completed: false },
      { id: 'sub-3', taskId: 'task-1', title: 'File important documents in green folder', completed: false },
    ],
  },
  {
    id: 'task-2',
    goalId: 'goal-1',
    title: 'Fold mountain of clean laundry',
    description: 'Listen to favourite podcast while folding shirts only.',
    status: 'TODO',
    priority: 'MEDIUM',
    stressPoints: 6, // MID STRESS
    category: 'Household',
    dueDate: '2026-07-31T20:00:00.000Z',
    assignedPartnerId: 'partner-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-4', taskId: 'task-2', title: 'Put on 20-min comedy podcast', completed: true },
      { id: 'sub-5', taskId: 'task-2', title: 'Fold T-shirts first', completed: false },
      { id: 'sub-6', taskId: 'task-2', title: 'Put socks in drawer', completed: false },
    ],
  },
  {
    id: 'task-3',
    goalId: 'goal-3',
    title: 'Schedule dentist check-up appointment',
    description: 'Call Dr. Miller or use online portal. High phone call anxiety.',
    status: 'TODO',
    priority: 'HIGH',
    stressPoints: 8, // HIGH AVOIDANCE
    category: 'Health',
    dueDate: '2026-08-05T12:00:00.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-7', taskId: 'task-3', title: 'Write down phone script / dates needed', completed: false },
      { id: 'sub-8', taskId: 'task-3', title: 'Make the 2-minute call', completed: false },
    ],
  },
  {
    id: 'task-4',
    goalId: 'goal-4',
    title: 'Draft Project Architecture diagram',
    description: 'Outline core data flow modules for client demo',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    stressPoints: 4, // LOW-MID
    category: 'Work',
    dueDate: '2026-07-30T18:00:00.000Z',
    assignedPartnerId: 'partner-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-9', taskId: 'task-4', title: 'Skim requirements doc', completed: true },
      { id: 'sub-10', taskId: 'task-4', title: 'Draw boxes for frontend & backend API', completed: true },
      { id: 'sub-11', taskId: 'task-4', title: 'Add Database schema nodes', completed: false },
    ],
  },
  {
    id: 'task-5',
    goalId: 'goal-3',
    title: 'Refill 7-day pill organizer',
    description: 'Morning vitamins & prescriptions',
    status: 'IN_PROGRESS',
    priority: 'LOW',
    stressPoints: 2, // LOW STRESS
    category: 'Self-Care',
    dueDate: '2026-07-30T21:00:00.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-12', taskId: 'task-5', title: 'Grab pill bottles from cabinet', completed: true },
      { id: 'sub-13', taskId: 'task-5', title: 'Fill Mon-Sun slots', completed: false },
    ],
  },
  {
    id: 'task-6',
    goalId: 'goal-1',
    title: 'Wipe kitchen counters & clear sink',
    description: 'Quick night routine clear',
    status: 'COMPLETED',
    priority: 'LOW',
    stressPoints: 3,
    category: 'Household',
    dueDate: '2026-07-29T22:00:00.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-14', taskId: 'task-6', title: 'Load dishwasher', completed: true },
      { id: 'sub-15', taskId: 'task-6', title: 'Wipe counter spray', completed: true },
    ],
  },
  {
    id: 'task-7',
    goalId: 'goal-3',
    title: '15-minute gentle morning stretch',
    description: 'Low pressure movement to wake up body stiffness',
    status: 'COMPLETED',
    priority: 'LOW',
    stressPoints: 1,
    category: 'Health',
    dueDate: '2026-07-30T09:00:00.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-16', taskId: 'task-7', title: 'Mat stretch', completed: true }
    ],
  }
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: 'Drink 500ml water upon waking',
    description: 'Hydrate brain before checking phone',
    frequency: 'DAILY',
    targetDays: 21,
    currentStreak: 14,
    streakCount: 14,
    completedDates: ['2026-07-29', '2026-07-30'],
    history: ['2026-07-29', '2026-07-30'],
  },
  {
    id: 'habit-2',
    title: 'Screen-free 30 mins before bed',
    description: 'Read or listen to audio book to calm nervous system',
    frequency: 'DAILY',
    targetDays: 21,
    currentStreak: 8,
    streakCount: 8,
    completedDates: ['2026-07-28', '2026-07-29'],
    history: ['2026-07-28', '2026-07-29'],
  },
  {
    id: 'habit-3',
    title: '5-minute evening space reset',
    description: 'Return 3 objects to their designated homes',
    frequency: 'DAILY',
    targetDays: 21,
    currentStreak: 19,
    streakCount: 19,
    completedDates: ['2026-07-28', '2026-07-29', '2026-07-30'],
    history: ['2026-07-28', '2026-07-29', '2026-07-30'],
  },
  {
    id: 'habit-4',
    title: 'Weekly bank balance sanity check',
    description: 'Gentle glance at numbers without shame',
    frequency: 'WEEKLY',
    targetDays: 12,
    currentStreak: 5,
    streakCount: 5,
    completedDates: ['2026-07-19', '2026-07-26'],
    history: ['2026-07-19', '2026-07-26'],
  }
];

export const INITIAL_MOOD_LOGS: MoodLog[] = [
  {
    id: 'mood-1',
    energyLevel: 4,
    stressLevel: 4,
    score: 4,
    energy: 4,
    moodTag: 'Focus',
    notes: 'Had a productive body doubling session in the morning. Felt grounded.',
    createdAt: '2026-07-30T10:00:00.000Z',
  },
  {
    id: 'mood-2',
    energyLevel: 2,
    stressLevel: 2,
    score: 2,
    energy: 2,
    moodTag: 'Anxious',
    notes: 'Anxiety spiked seeing stack of mail. High avoidance feeling.',
    createdAt: '2026-07-29T19:30:00.000Z',
  },
  {
    id: 'mood-3',
    energyLevel: 5,
    stressLevel: 5,
    score: 5,
    energy: 5,
    moodTag: 'Calm',
    notes: 'Finished tax mail subtask! Big relief.',
    createdAt: '2026-07-28T16:00:00.000Z',
  },
  {
    id: 'mood-4',
    energyLevel: 3,
    stressLevel: 3,
    score: 3,
    energy: 3,
    moodTag: 'Focus',
    notes: 'Steady day, neutral energy.',
    createdAt: '2026-07-27T12:00:00.000Z',
  },
  {
    id: 'mood-5',
    energyLevel: 1,
    stressLevel: 1,
    score: 1,
    energy: 1,
    moodTag: 'Burnout',
    notes: 'Executive dysfunction morning. Took extra break and forgave myself.',
    createdAt: '2026-07-26T11:00:00.000Z',
  }
];

export const INITIAL_PARTNERS: AccountabilityPartner[] = [
  {
    id: 'partner-1',
    name: 'Maya Chen',
    email: 'maya@braintether.app',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'IN_SESSION',
    currentTask: 'Setting 25 mins timer with you now 💪',
  },
  {
    id: 'partner-2',
    name: 'Leo Vance',
    email: 'leo@braintether.app',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'ONLINE',
    currentTask: 'Tackling 9-point stress task!',
  },
  {
    id: 'partner-3',
    name: 'Dr. Evelyn Reed (Therapist)',
    email: 'dr.reed@mindcare.org',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    status: 'OFFLINE',
    currentTask: 'Clinical review available',
  }
];

export const INITIAL_BODY_DOUBLING: BodyDoublingSession = {
  id: 'session-101',
  hostName: 'Alex Morgan (You)',
  hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  partnerName: 'Maya Chen',
  partnerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  durationMinutes: 25,
  elapsedSeconds: 840, // 14 mins elapsed
  status: 'ACTIVE',
  myTaskSummary: 'Drafting Project Architecture diagram & filing mail',
  partnerTaskSummary: 'Reviewing quarterly budget spreadsheet',
  sharedNote: 'Quiet focused session • Soft ambient lo-fi soundscape playing',
  soundscape: 'rain',
};

export const INITIAL_THERAPIST_ACCESS: TherapistPermission = {
  allowMoodView: true,
  allowStressView: true,
  allowNotesView: false,
};
