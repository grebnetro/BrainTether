'use client';

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  CheckSquare, 
  Calendar, 
  Users, 
  Wand2, 
  Trash2, 
  Edit3,
  DollarSign,
  Home,
  Heart,
  Briefcase,
  Activity,
  Layers
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  index: number;
  onEditTask?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEditTask }) => {
  const { deleteTask, toggleSubtask, breakDownTaskWithAI } = useApp();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Household': return <Home className="w-3 h-3 text-emerald-400" />;
      case 'Money': return <DollarSign className="w-3 h-3 text-amber-400" />;
      case 'Self-Care': return <Heart className="w-3 h-3 text-rose-400" />;
      case 'Work': return <Briefcase className="w-3 h-3 text-teal-400" />;
      case 'Health': return <Activity className="w-3 h-3 text-indigo-400" />;
      default: return <Layers className="w-3 h-3 text-slate-400" />;
    }
  };

  const getStressBadgeColor = (points: number) => {
    if (points >= 7) return 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10';
    if (points >= 4) return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10';
  };

  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(s => s.completed).length;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded-xl bg-zen-surface-light dark:bg-zen-card-dark border transition-all space-y-3 group ${
            snapshot.isDragging 
              ? 'shadow-2xl border-teal-500 ring-2 ring-teal-500/20 scale-105 z-50' 
              : 'border-zen-border-light dark:border-zen-border-dark/80 hover:border-teal-500/30'
          }`}
        >
          {/* Card Header & Badges */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-zen-border-light dark:border-zen-border-dark">
              {getCategoryIcon(task.category)}
              <span>{task.category}</span>
            </div>

            {/* Stress Points Badge */}
            <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border text-[10px] font-bold shadow-sm ${getStressBadgeColor(task.stressPoints)}`}>
              <Flame className="w-3 h-3 fill-current" />
              <span>{task.stressPoints} Stress Pts</span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-teal-400 transition-colors">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          {/* Subtasks Micro Checklist */}
          {subtasks.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-zen-border-light dark:border-zen-border-dark/60">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>Micro Steps ({completedSubtasks}/{subtasks.length})</span>
              </div>
              <div className="space-y-1">
                {subtasks.map((st) => (
                  <button
                    type="button"
                    key={st.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubtask(task.id, st.id);
                    }}
                    className="w-full flex items-center space-x-2 text-[11px] text-slate-300 hover:text-white transition-colors text-left"
                  >
                    <CheckSquare className={`w-3.5 h-3.5 shrink-0 ${st.completed ? 'text-emerald-400 fill-emerald-500/20' : 'text-slate-500'}`} />
                    <span className={st.completed ? 'line-through text-slate-500' : ''}>{st.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-zen-border-light dark:border-zen-border-dark/60 text-[10px] text-slate-400">
            {task.dueDate ? (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            ) : (
              <span></span>
            )}

            <div className="flex items-center space-x-2">
              {/* Quick AI Breakdown */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  breakDownTaskWithAI(task.id);
                }}
                className="p-1 rounded bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/20 transition-all"
                title="Decompose high-stress task into micro-steps"
              >
                <Wand2 className="w-3 h-3" />
              </button>

              {onEditTask && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditTask(task);
                  }}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Edit task"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                title="Delete task"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
