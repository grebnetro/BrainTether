import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding BrainTether database...');

  // Clean existing data
  await prisma.subtask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.moodLog.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.user.deleteMany();

  // Create primary user
  const user = await prisma.user.create({
    data: {
      id: 'user-1',
      name: 'Alex Morgan',
      email: 'alex@braintether.app',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'USER',
      themePreference: 'DARK',
    },
  });

  // Create therapist user
  const therapist = await prisma.user.create({
    data: {
      id: 'therapist-1',
      name: 'Dr. Evelyn Reed',
      email: 'dr.reed@mindcare.org',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      role: 'THERAPIST',
      themePreference: 'LIGHT',
    },
  });

  // Goals
  const goal1 = await prisma.goal.create({
    data: {
      id: 'goal-1',
      userId: user.id,
      title: 'Declutter Living Space',
      description: 'Reduce visual overload & create a peaceful home sanctuary',
      category: 'Space',
      color: '#10b981',
    },
  });

  const goal2 = await prisma.goal.create({
    data: {
      id: 'goal-2',
      userId: user.id,
      title: 'Financial Peace of Mind',
      description: 'Tackle unread bills, taxes, & organize subscriptions without panic',
      category: 'Money',
      color: '#f59e0b',
    },
  });

  const goal3 = await prisma.goal.create({
    data: {
      id: 'goal-3',
      userId: user.id,
      title: 'Nourish Daily Health',
      description: 'Consistent sleep, hydration, and gentle movement',
      category: 'Health',
      color: '#14b8a6',
    },
  });

  // Tasks
  await prisma.task.create({
    data: {
      id: 'task-1',
      userId: user.id,
      goalId: goal2.id,
      title: 'Open pile of unopened tax mail on desk',
      description: 'Set a timer for 10 mins. Sort into keep/shred without overthinking.',
      status: 'TODO',
      priority: 'HIGH',
      stressPoints: 9, // Severe Avoidance
      category: 'Money',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      assignedPartnerId: 'partner-1',
      subtasks: {
        create: [
          { title: 'Bring envelope opener & trash bin to desk', completed: true },
          { title: 'Open top 3 envelopes', completed: false },
          { title: 'File important documents in green folder', completed: false },
        ],
      },
    },
  });

  await prisma.task.create({
    data: {
      id: 'task-2',
      userId: user.id,
      goalId: goal1.id,
      title: 'Fold mountain of clean laundry',
      description: 'Listen to favourite podcast while folding shirts only.',
      status: 'TODO',
      priority: 'MEDIUM',
      stressPoints: 6,
      category: 'Household',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      subtasks: {
        create: [
          { title: 'Put on 20-min comedy podcast', completed: true },
          { title: 'Fold T-shirts first', completed: false },
          { title: 'Put socks in drawer', completed: false },
        ],
      },
    },
  });

  await prisma.task.create({
    data: {
      id: 'task-3',
      userId: user.id,
      goalId: goal3.id,
      title: '15-minute gentle morning stretch',
      description: 'Low pressure movement to wake up body stiffness',
      status: 'COMPLETED',
      priority: 'LOW',
      stressPoints: 1,
      category: 'Health',
      subtasks: {
        create: [
          { title: 'Mat stretch', completed: true },
        ],
      },
    },
  });

  // Habits
  await prisma.habit.create({
    data: {
      id: 'habit-1',
      userId: user.id,
      goalId: goal3.id,
      title: 'Drink 500ml water upon waking',
      description: 'Hydrate brain before checking phone',
      frequency: 'DAILY',
      targetDays: 21,
      streakCount: 14,
      lastLogged: new Date(),
      historyJson: JSON.stringify(['2026-07-29', '2026-07-30']),
    },
  });

  await prisma.habit.create({
    data: {
      id: 'habit-2',
      userId: user.id,
      goalId: goal1.id,
      title: '5-minute evening space reset',
      description: 'Return 3 objects to their designated homes',
      frequency: 'DAILY',
      targetDays: 21,
      streakCount: 19,
      lastLogged: new Date(),
      historyJson: JSON.stringify(['2026-07-28', '2026-07-29', '2026-07-30']),
    },
  });

  // Mood Logs
  await prisma.moodLog.create({
    data: {
      userId: user.id,
      score: 4,
      energy: 4,
      notes: 'Had a productive body doubling session in the morning.',
    },
  });

  await prisma.moodLog.create({
    data: {
      userId: user.id,
      score: 2,
      energy: 2,
      notes: 'Anxiety spiked seeing stack of mail. High avoidance feeling.',
    },
  });

  console.log('BrainTether database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
