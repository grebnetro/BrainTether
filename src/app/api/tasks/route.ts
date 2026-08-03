import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get('email');
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || emailParam;

    if (!email) {
      return NextResponse.json([]);
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        tasks: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    return NextResponse.json(user.tasks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, status, priority, stressPoints, category, goalId, dueDate, assignedPartnerId } = body;

    const task = await prisma.task.create({
      data: {
        userId: 'user-1',
        title,
        description,
        status: status || 'TODO',
        priority: priority || 'MEDIUM',
        stressPoints: stressPoints !== undefined ? Number(stressPoints) : 3,
        category: category || 'General',
        goalId: goalId || undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        assignedPartnerId: assignedPartnerId || undefined,
      },
      include: {
        goal: true,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, subtasks, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required for update' }, { status: 400 });
    }

    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...updates,
        dueDate: updates.dueDate ? new Date(updates.dueDate) : undefined,
      },
      include: {
        goal: true,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
