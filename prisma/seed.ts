import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding BrainTether database...');

  // Clean existing data
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
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      hasCompletedOnboarding: true,
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
    },
  });

  // Habits
  await prisma.habit.create({
    data: {
      id: 'habit-1',
      userId: user.id,
      title: 'Drink 500ml water upon waking',
      description: 'Hydrate brain before checking phone',
      targetDays: 21,
      currentStreak: 14,
      completedDates: JSON.stringify(['2026-07-29', '2026-07-30']),
    },
  });

  // Mood Logs
  await prisma.moodLog.create({
    data: {
      userId: user.id,
      energyLevel: 4,
      stressLevel: 3,
      moodTag: 'Focus',
      notes: 'Had a productive body doubling session in the morning.',
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
