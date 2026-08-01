'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useApp } from '../../context/AppContext';
import { TaskStatus, Task } from '../../types';
import { Column } from './Column';
import { Sparkles, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { matchesCategoryFilter } from '../../lib/categoriesData';

interface KanbanBoardProps {
  onOpenNewTaskModal?: () => void;
  onOpenNewTaskModalWithStatus?: (status: TaskStatus) => void;
  onEditTask?: (task: Task) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onOpenNewTaskModal,
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

    moveTask(draggableId, destination.droppableId as TaskStatus);
  };

  const filteredTasks = tasks.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    if (categoryFilter !== 'ALL' && !matchesCategoryFilter(t.category, categoryFilter)) {
      return false;
    }

    if (stressFilter === 'LOW' && (t.stressPoints < 1 || t.stressPoints > 3)) return false;
    if (stressFilter === 'MID' && (t.stressPoints < 4 || t.stressPoints > 6)) return false;
    if (stressFilter === 'HIGH' && (t.stressPoints < 7 || t.stressPoints > 10)) return false;

    return true;
  });

  const columns: { id: TaskStatus; title: string; subtitle: string }[] = [
    { id: 'TODO', title: 'To-Do Avoidance Pile', subtitle: 'Rated by stress points' },
    { id: 'IN_PROGRESS', title: 'Active Focus Flow', subtitle: 'Single task focus' },
    { id: 'WAITING', title: 'Blocked / Waiting', subtitle: 'External dependencies' },
    { id: 'COMPLETED', title: 'Completed & Reset', subtitle: 'Stress load relieved' },
  ];

  if (!enabled) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Mental Load Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Stress Load</p>
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{totalDailyStressPoints} Stress Pts</h4>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
            Current
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Relieved Stress Points</p>
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{completedDailyStressPoints} Pts Cleared</h4>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            Relieved
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center border border-teal-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily Capacity Limit</p>
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">30 Stress Pts Max</h4>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20">
            Ceiling
          </span>
        </div>
      </div>

      {/* Drag & Drop Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                subtitle={col.subtitle}
                tasks={colTasks}
                onOpenNewTaskModal={() => {
                  if (onOpenNewTaskModalWithStatus) {
                    onOpenNewTaskModalWithStatus(col.id);
                  } else if (onOpenNewTaskModal) {
                    onOpenNewTaskModal();
                  }
                }}
                onEditTask={onEditTask}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
