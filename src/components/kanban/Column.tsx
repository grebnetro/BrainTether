'use client';

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '../../types';
import { TaskCard } from './TaskCard';
import { Plus, Flame, CheckCircle, Clock, CircleAlert } from 'lucide-react';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onOpenNewTaskModalWithStatus: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
}

export const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  onOpenNewTaskModalWithStatus,
  onEditTask,
}) => {
  
  // Total stress points sum for this column
  const columnStressPoints = tasks.reduce((sum, task) => sum + task.stressPoints, 0);

  // Column Status Configuration (Colors & Icons)
  const statusConfig: Record<TaskStatus, { color: string; bg: string; border: string; icon: React.ElementType }> = {
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
    COMPLETED: {
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      icon: CheckCircle,
    },
    ARCHIVED: {
      color: 'text-slate-500',
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      icon: CircleAlert,
    }
  };

  const config = statusConfig[id] || statusConfig.TODO;
  const Icon = config.icon;

  return (
    <div className="flex flex-col w-full md:w-80 lg:w-96 shrink-0 bg-slate-100/70 dark:bg-zen-surface-dark/60 border border-zen-border-light dark:border-zen-border-dark/80 rounded-2xl p-4 transition-colors">
      
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-zen-border-light dark:border-zen-border-dark/60">
        <div className="flex items-center space-x-2.5">
          <div className={`p-2 rounded-xl ${config.bg} ${config.color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              {title}
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {tasks.length}
              </span>
            </h3>
          </div>
        </div>

        {/* Column Stress Load Metric */}
        <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-300" title="Total Stress Points in this column">
          <Flame className="w-3 h-3 text-amber-500" />
          <span>{columnStressPoints} pts</span>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-3 min-h-[300px] p-1 rounded-xl transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-teal-500/5 ring-2 ring-teal-500/20 ring-dashed' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-transform ${
                      snapshot.isDragging ? 'rotate-2 scale-105 z-50 shadow-2xl' : ''
                    }`}
                  >
                    <TaskCard task={task} index={index} onEdit={onEditTask} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}

            {tasks.length === 0 && (
              <div className="h-32 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 p-4 text-center">
                <p className="text-xs font-medium">No tasks here</p>
                <p className="text-[10px]">Drag tasks here or click '+' below</p>
              </div>
            )}
          </div>
        )}
      </Droppable>

      {/* Add Task Button at bottom of Column */}
      <button
        onClick={() => onOpenNewTaskModalWithStatus(id)}
        className="mt-3 w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-teal-500 transition-all flex items-center justify-center space-x-1.5"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add {title} Item</span>
      </button>

    </div>
  );
};
