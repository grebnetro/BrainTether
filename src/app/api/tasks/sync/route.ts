import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const email = session?.user?.email || body.email;
    const tasks = body.tasks;

    if (!email || !Array.isArray(tasks)) {
      return NextResponse.json({ error: 'Email and tasks array required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: session?.user?.name || email.split('@')[0],
          image: session?.user?.image,
        },
      });
    }

    // Delete previous task entries for this user before saving updated batch
    await prisma.task.deleteMany({
      where: { userId: user.id },
    });

    if (tasks.length > 0) {
      // Filter unique IDs to avoid primary key collision
      const usedIds = new Set<string>();
      const safeTasks = tasks.map((t: any, idx: number) => {
        let taskId = typeof t.id === 'string' && t.id.length > 3 ? t.id : `task-${Date.now()}-${idx}`;
        if (usedIds.has(taskId)) {
          taskId = `task-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`;
        }
        usedIds.add(taskId);

        return {
          id: taskId,
          userId: user.id,
          title: t.title || 'Untitled Task',
          description: t.description || '',
          status: t.status || 'TODO',
          priority: t.priority || 'MEDIUM',
          stressPoints: typeof t.stressPoints === 'number' ? t.stressPoints : 5,
          category: t.category || 'General',
          dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
        };
      });

      await prisma.task.createMany({
        data: safeTasks,
      });
    }

    return NextResponse.json({ success: true, count: tasks.length });
  } catch (error: any) {
    console.error('Task Sync Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
