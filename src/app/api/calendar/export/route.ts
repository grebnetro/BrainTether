import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        dueDate: { not: null },
      },
    });

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BrainTether//ADHD Productivity Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:BrainTether Tasks',
    ];

    tasks.forEach((task) => {
      if (!task.dueDate) return;
      const dt = new Date(task.dueDate);
      const dtStr = dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:task-${task.id}@braintether.app`,
        `SUMMARY: [Stress ${task.stressPoints}pt] ${task.title}`,
        `DESCRIPTION:Category: ${task.category}. ${task.description || ''}`,
        `DTSTART:${dtStr}`,
        `DTEND:${dtStr}`,
        `STATUS:${task.status === 'COMPLETED' ? 'COMPLETED' : 'CONFIRMED'}`,
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');

    const body = icsContent.join('\r\n');

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="braintether-schedule.ics"',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
