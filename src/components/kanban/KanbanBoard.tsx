'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useApp } from '../../context/AppContext';
import { TaskStatus, Task } from '../../types';
import { Column } from './Column';
import { Sparkles, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface KanbanBoardProps {
  onOpenNewTaskModalWithStatus: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onOpenNewTaskModalWithStatus,
  onEditTask,
}) => {
  const { 
    tasks, 
    moveTask, 
    stressFilter, 
    categoryFilter, 
    searchQuery,
    totalDailyStressPoints,
    completedDailyStressPoints
  } = useApp();

  const [enabled, setEnabled] = useState(false);

  // Avoid SSR hydration mismatch with dnd
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    moveTask(draggableId, newStatus);
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(q);
      const matchesDesc = task.description?.toLowerCase().includes(q);
      const matchesCat = task.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesCat) return false;
    }

    // Category Filter
    if (categoryFilter !== 'ALL' && task.category !== categoryFilter) {
      return false;
    }

    // Stress Filter
    if (stressFilter === 'LOW' && task.stressPoints > 3) return false;
    if (stressFilter === 'MID' && (task.stressPoints < 4 || task.stressPoints > 6)) return false;
    if (stressFilter === 'HIGH' && task.stressPoints < 7) return false;

    return true;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === 'TODO');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'IN_PROGRESS');
  const completedTasks = filteredTasks.filter((t) => t.status === 'COMPLETED');

  if (!enabled) return null;

  return (
    <div className="flex-1 p-6 flex flex-col min-h-0 overflow-x-auto">
      
      {/* Top Banner Context Card */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800 to-slate-900 text-white border border-zen-border-dark shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">ADHD Avoidance & Stress Points Workflow</h3>
            <p className="text-xs text-slate-400">
              Tasks marked 7–10 stress points represent anxiety or procrastination blockages. Tackle them first using micro-steps!
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60 shrink-0 text-xs">
          <div className="flex items-center space-x-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400">Pending Stress</div>
              <div className="font-bold text-amber-300">{totalDailyStressPoints} pts</div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-700" />
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400">Relieved Today</div>
              <div className="font-bold text-emerald-300">{completedDailyStressPoints} pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Drag & Drop Columns Container */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 flex space-x-6 pb-6 items-start overflow-x-auto min-h-0">
          <Column
            id="TODO"
            title="To Do (Focus Pool)"
            tasks={todoTasks}
            onOpenNewTaskModalWithStatus={onOpenNewTaskModalWithStatus}
            onEditTask={onEditTask}
          />
          <Column
            id="IN_PROGRESS"
            title="In Progress (Active)"
            tasks={inProgressTasks}
            onOpenNewTaskModalWithStatus={onOpenNewTaskModalWithStatus}
            onEditTask={onEditTask}
          />
          <Column
            id="COMPLETED"
            title="Completed (Relieved)"
            tasks={completedTasks}
            onOpenNewTaskModalWithStatus={onOpenNewTaskModalWithStatus}
            onEditTask={onEditTask}
          />
        </div>
      </DragDropContext>
    </div>
  );
};
