import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { getCloudTasks } from '../../../lib/cloudStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get('email');
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || emailParam;

    if (!email) {
      return NextResponse.json([]);
    }

    // 1. Try global persistent cloud KV store
    const cloudTasks = await getCloudTasks(email);
    if (cloudTasks !== null && Array.isArray(cloudTasks)) {
      return NextResponse.json(cloudTasks);
    }

    // 2. Fallback to Prisma database
    try {
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

      if (user && user.tasks) {
        return NextResponse.json(user.tasks);
      }
    } catch (e) {
      console.warn('Prisma GET fallback warning:', e);
    }

    return NextResponse.json([]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
