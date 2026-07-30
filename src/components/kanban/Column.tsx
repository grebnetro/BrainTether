'use client';

import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { TaskStatus, Task } from '../../types';
import { TaskCard } from './TaskCard';
import { CircleAlert, Clock, CheckCircle, Plus, Layers } from 'lucide-react';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  subtitle: string;
  tasks: Task[];
  onOpenNewTaskModal?: () => void;
  onEditTask?: (task: Task) => void;
}

export const Column: React.FC<ColumnProps> = ({
  id,
  title,
  subtitle,
  tasks,
  onOpenNewTaskModal,
  onEditTask,
}) => {
  const statusConfig: Record<TaskStatus, {
    color: string;
    bg: string;
    border: string;
    icon: React.ElementType;
  }> = {
    TODO: {
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: CircleAlert,
    },
    IN_PROGRESS: {
      color: 'text-teal-500',
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/30',
      icon: Clock,
    },
    WAITING: {
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      icon: Layers,
    },
    COMPLETED: {
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      icon: CheckCircle,
    },
  };

  const config = statusConfig[id] || statusConfig.TODO;
  const Icon = config.icon;

  return (
    <div className="flex flex-col w-full shrink-0 bg-slate-100/70 dark:bg-zen-surface-dark/60 border border-zen-border-light dark:border-zen-border-dark/80 rounded-2xl p-4 transition-colors">
      
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zen-border-light dark:border-zen-border-dark">
        <div className="flex items-center space-x-2.5">
          <div className={`p-1.5 rounded-lg ${config.bg} ${config.color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              {title}
              <span className={`text-[10px] font-mono font-bold px-2 py-0.2 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
                {tasks.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>

        {onOpenNewTaskModal && id === 'TODO' && (
          <button
            onClick={onOpenNewTaskModal}
            className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-400 transition-colors"
            title="Add task to avoidance pile"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[350px] space-y-3 p-1 rounded-xl transition-colors ${
              snapshot.isDraggingOver
                ? 'bg-teal-500/5 ring-2 ring-teal-500/20'
                : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onEditTask={onEditTask} />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && (
              <div className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-400 italic">
                No tasks in this lane
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
