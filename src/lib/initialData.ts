import { Task, Goal, Habit, MoodLog, AccountabilityPartner, BodyDoublingSession, TherapistPermission } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Grocery shopping for weekly meal prep',
    description: 'Buy fresh produce, protein, and pantry essentials for healthy lunches.',
    status: 'TODO',
    priority: 'HIGH',
    stressPoints: 7,
    category: 'Grocery shopping',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'st-1', title: 'Make grocery list in notes app', completed: true },
      { id: 'st-2', title: 'Drive to grocery store', completed: false },
    ],
  },
  {
    id: 'task-2',
    title: 'Schedule oil change & vehicle inspection',
    description: 'Call service shop to schedule oil change and check tire pressure.',
    status: 'TODO',
    priority: 'MEDIUM',
    stressPoints: 5,
    category: 'Oil change',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Review quarterly expense reporting & tax prep',
    description: 'Export receipts and match invoices for digital archiving.',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    stressPoints: 9,
    category: 'Expense reporting',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'st-3', title: 'Download bank CSV statement', completed: true },
      { id: 'st-4', title: 'Categorize software subscriptions', completed: false },
    ],
  },
  {
    id: 'task-4',
    title: 'Refactor core modules & bug fixing',
    description: 'Resolve state sync bug and update API error handling.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    stressPoints: 6,
    category: 'Bug fixing',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Prescription pickups at local pharmacy',
    description: 'Pick up monthly refill before weekend trip.',
    status: 'WAITING',
    priority: 'MEDIUM',
    stressPoints: 4,
    category: 'Prescription pickups',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'Deep cleaning oven scrub & kitchen reset',
    description: 'Use eco cleaner and wipe down all kitchen counter surfaces.',
    status: 'COMPLETED',
    priority: 'LOW',
    stressPoints: 3,
    category: 'Oven scrub',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: 'Drink 500ml water upon waking',
    description: 'Hydrate brain before checking phone',
    category: 'Self-Care',
    frequency: 'DAILY',
    targetDays: 21,
    currentStreak: 14,
    streakCount: 14,
    completedDates: ['2026-07-29', '2026-07-30'],
    history: [{ date: '2026-07-29', completed: true }, { date: '2026-07-30', completed: true }],
  },
  {
    id: 'habit-2',
    title: 'Screen-free 30 mins before bed',
    description: 'Read or listen to audio book to calm nervous system',
    category: 'Self-Care',
    frequency: 'DAILY',
    targetDays: 21,
    currentStreak: 8,
    streakCount: 8,
    completedDates: ['2026-07-28', '2026-07-29'],
    history: [{ date: '2026-07-28', completed: true }, { date: '2026-07-29', completed: true }],
  },
  {
    id: 'habit-3',
    title: '5-minute evening space reset',
    description: 'Return 3 objects to their designated homes',
    category: 'Household',
    frequency: 'DAILY',
    targetDays: 21,
    currentStreak: 19,
    streakCount: 19,
    completedDates: ['2026-07-28', '2026-07-29', '2026-07-30'],
    history: [{ date: '2026-07-28', completed: true }, { date: '2026-07-29', completed: true }, { date: '2026-07-30', completed: true }],
  },
  {
    id: 'habit-4',
    title: 'Weekly bank balance sanity check',
    description: 'Gentle glance at numbers without shame',
    category: 'Money',
    frequency: 'WEEKLY',
    targetDays: 12,
    currentStreak: 5,
    streakCount: 5,
    completedDates: ['2026-07-24'],
    history: [{ date: '2026-07-24', completed: true }],
  }
];

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'goal-1',
    title: 'Tax & Financial Peace of Mind',
    description: 'Complete quarterly tax filings on time without last-minute panic',
    category: 'Money',
    targetDate: '2026-08-15',
    color: '#059669', // Emerald
  },
  {
    id: 'goal-2',
    title: 'Calm Living Space & Reduced Friction',
    description: 'Keep key household areas functional so executive function stays low',
    category: 'Household',
    targetDate: '2026-08-30',
    color: '#0d9488', // Teal
  },
  {
    id: 'goal-3',
    title: 'Consistent Physical Well-Being',
    description: 'Maintain preventive health appointments and gentle daily movement',
    category: 'Health',
    targetDate: '2026-09-01',
    color: '#6366f1', // Indigo
  }
];

export const INITIAL_MOOD_LOGS: MoodLog[] = [
  {
    id: 'mood-1',
    timestamp: '2026-07-28T09:15:00.000Z',
    createdAt: '2026-07-28T09:15:00.000Z',
    score: 4,
    energy: 3,
    stressLevel: 7,
    energyLevel: 3,
    notes: 'Morning brain fog and slight dread about taxes.',
  },
  {
    id: 'mood-2',
    timestamp: '2026-07-29T14:30:00.000Z',
    createdAt: '2026-07-29T14:30:00.000Z',
    score: 7,
    energy: 8,
    stressLevel: 4,
    energyLevel: 8,
    notes: 'Had a productive 25-minute body doubling session! Felt grounded.',
  },
  {
    id: 'mood-3',
    timestamp: '2026-07-30T10:00:00.000Z',
    createdAt: '2026-07-30T10:00:00.000Z',
    score: 8,
    energy: 7,
    stressLevel: 3,
    energyLevel: 7,
    notes: 'Clean desk reset gave me instant calm.',
  }
];

export const INITIAL_PARTNERS: AccountabilityPartner[] = [
  {
    id: 'partner-1',
    name: 'Sarah Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'Focus Partner (UX Designer)',
    status: 'IN_SESSION',
    activeTask: 'Designing App Wireframes',
  },
  {
    id: 'partner-2',
    name: 'Marcus Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Focus Partner (Writer)',
    status: 'ONLINE',
    activeTask: 'Drafting Chapter 4',
  },
  {
    id: 'partner-3',
    name: 'Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'Focus Partner (Developer)',
    status: 'ONLINE',
    activeTask: 'Refactoring API endpoints',
  }
];

export const INITIAL_BODY_DOUBLING: BodyDoublingSession = {
  active: false,
  status: 'IDLE',
  durationMinutes: 25,
  partnerName: 'Sarah Chen',
  partner: INITIAL_PARTNERS[0],
};

export const INITIAL_THERAPIST_ACCESS: TherapistPermission = {
  allowMoodView: true,
  allowStressView: true,
  allowNotesView: false,
};
