import { Task, Goal, Habit, MoodLog, AccountabilityPartner, BodyDoublingSession, TherapistPermission } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'File quarterly tax documents',
    description: 'Gather invoices from Q2 and upload receipts to accounting portal',
    status: 'TODO',
    priority: 'HIGH',
    stressPoints: 9,
    category: 'Money',
    dueDate: '2026-08-05',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-1', taskId: 'task-1', title: 'Download bank statements for April-June', completed: true },
      { id: 'sub-2', taskId: 'task-1', title: 'Log into tax portal and verify login', completed: false },
      { id: 'sub-3', taskId: 'task-1', title: 'Submit 1099 records', completed: false }
    ],
  },
  {
    id: 'task-2',
    title: 'Schedule dentist checkup',
    description: 'Call Dr. Smith office for teeth cleaning appointment',
    status: 'TODO',
    priority: 'MEDIUM',
    stressPoints: 7,
    category: 'Health',
    dueDate: '2026-08-02',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-4', taskId: 'task-2', title: 'Find insurance card in wallet', completed: true },
      { id: 'sub-5', taskId: 'task-2', title: 'Call office receptionist', completed: false }
    ],
  },
  {
    id: 'task-3',
    title: 'Organize pantry top shelf',
    description: 'Clear expired canned goods and group spices into labeled bins',
    status: 'TODO',
    priority: 'LOW',
    stressPoints: 4,
    category: 'Household',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-6', taskId: 'task-3', title: 'Throw out expired items', completed: false },
      { id: 'sub-7', taskId: 'task-3', title: 'Wipe down shelf surface', completed: false }
    ],
  },
  {
    id: 'task-4',
    title: 'Draft project proposal outline',
    description: 'Brainstorm key milestones and budget estimates for client presentation',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    stressPoints: 8,
    category: 'Work',
    dueDate: '2026-08-01',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-8', taskId: 'task-4', title: 'List 3 core value propositions', completed: true },
      { id: 'sub-9', taskId: 'task-4', title: 'Draft timeline slide', completed: true },
      { id: 'sub-10', taskId: 'task-4', title: 'Review with team lead', completed: false }
    ],
  },
  {
    id: 'task-5',
    title: 'Replace HVAC air filter',
    description: 'Install 20x25x1 MERV 11 filter in main hallway intake',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    stressPoints: 3,
    category: 'Household',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-11', taskId: 'task-5', title: 'Unpack filter box', completed: true }
    ],
  },
  {
    id: 'task-6',
    title: 'Renew driver license online',
    description: 'Complete DMV renewal form and upload vision proof',
    status: 'WAITING',
    priority: 'HIGH',
    stressPoints: 6,
    category: 'General',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-12', taskId: 'task-6', title: 'Take vision test at eye doctor', completed: true },
      { id: 'sub-13', taskId: 'task-6', title: 'Waiting for optometrist report PDF', completed: false }
    ],
  },
  {
    id: 'task-7',
    title: '10-minute morning stretch',
    description: 'Gentle mobility routine for lower back and neck relief',
    status: 'COMPLETED',
    priority: 'LOW',
    stressPoints: 2,
    category: 'Self-Care',
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
