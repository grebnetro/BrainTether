'use client';

import React from 'react';
import { Task } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  CheckSquare, 
  Calendar, 
  Users, 
  Wand2, 
  MoreVertical, 
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
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit }) => {
  const { deleteTask, toggleSubtask, breakDownTaskWithAI, startBodyDoubling } = useApp();

  // Helper for category icons
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Money': return <DollarSign className="w-3.5 h-3.5 text-amber-500" />;
      case 'Household': return <Home className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Self-Care': return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      case 'Work': return <Briefcase className="w-3.5 h-3.5 text-purple-500" />;
      case 'Health': return <Activity className="w-3.5 h-3.5 text-teal-500" />;
      default: return <Layers className="w-3.5 h-3.5 text-sky-500" />;
    }
  };

  // Helper for Stress Level visual styling
  const getStressBadgeStyle = (pts: number) => {
    if (pts >= 9) {
      return {
        bg: 'bg-red-500/20 dark:bg-red-500/30',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-500',
        glow: 'shadow-stress-glow-high animate-pulse-subtle',
        label: 'Severe Avoidance',
      };
    } else if (pts >= 7) {
      return {
        bg: 'bg-rose-500/15 dark:bg-rose-500/25',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-500/50',
        glow: 'shadow-stress-glow-high',
        label: 'High Avoidance',
      };
    } else if (pts >= 4) {
      return {
        bg: 'bg-amber-500/15 dark:bg-amber-500/25',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/40',
        glow: 'shadow-stress-glow-mid',
        label: 'Moderate',
      };
    } else {
      return {
        bg: 'bg-emerald-500/15 dark:bg-emerald-500/25',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/30',
        glow: 'shadow-stress-glow-low',
        label: 'Low Avoidance',
      };
    }
  };

  const stressStyle = getStressBadgeStyle(task.stressPoints);
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const totalSubtasks = task.subtasks.length;
  const subtaskProgress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div className={`group relative rounded-xl bg-zen-surface-light dark:bg-zen-card-dark p-4 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-zen-md ${stressStyle.border} ${stressStyle.glow}`}>
      
      {/* Top Meta Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
          
          {/* Category Pill */}
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            {getCategoryIcon(task.category)}
            <span>{task.category}</span>
          </span>

          {/* Goal Badge if exists */}
          {task.goal && (
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white truncate max-w-[130px]"
              style={{ backgroundColor: task.goal.color }}
            >
              {task.goal.title}
            </span>
          )}
        </div>

        {/* Stress Point Heat Badge */}
        <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border ${stressStyle.bg} ${stressStyle.text} ${stressStyle.border} font-bold text-xs shrink-0`} title={`Stress Rating: ${task.stressPoints}/10 - ${stressStyle.label}`}>
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>{task.stressPoints} pts</span>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1.5 line-clamp-2 ${
        task.status === 'COMPLETED' ? 'line-through opacity-60' : ''
      }`}>
        {task.title}
      </h3>

      {/* Optional Description */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Subtasks Section */}
      {totalSubtasks > 0 && (
        <div className="my-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-teal-500" />
              Micro-Steps
            </span>
            <span>{completedSubtasks} / {totalSubtasks}</span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
            <div 
              className="bg-teal-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${subtaskProgress}%` }}
            />
          </div>

          <div className="space-y-1">
            {task.subtasks.map((sub) => (
              <div 
                key={sub.id}
                onClick={() => toggleSubtask(task.id, sub.id)}
                className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <input 
                  type="checkbox" 
                  checked={sub.completed}
                  onChange={() => {}} // Handled by div click
                  className="rounded border-slate-400 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span className={`truncate text-[11px] ${sub.completed ? 'line-through opacity-50' : ''}`}>
                  {sub.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Prompt for Intimidating High Stress Tasks */}
      {task.stressPoints >= 7 && totalSubtasks === 0 && (
        <div className="my-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-600 dark:text-amber-400 flex items-center justify-between">
          <span className="truncate font-medium">Feels intimidating? Break into micro-steps:</span>
          <button
            onClick={() => breakDownTaskWithAI(task.id)}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-amber-500 text-white font-bold text-[10px] hover:bg-amber-600 shrink-0 ml-2 shadow"
          >
            <Wand2 className="w-3 h-3" />
            <span>Break Down</span>
          </button>
        </div>
      )}

      {/* Card Footer: Due Date, Partner Avatar, Actions */}
      <div className="flex items-center justify-between pt-2 mt-2 border-t border-zen-border-light dark:border-zen-border-dark text-[11px] text-slate-500 dark:text-slate-400">
        
        {/* Due Date Indicator */}
        <div className="flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {task.dueDate 
              ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
              : 'No due date'}
          </span>
        </div>

        {/* Assigned Partner & Quick Actions */}
        <div className="flex items-center space-x-2">
          
          {/* Assigned Partner Avatar if present */}
          {task.assignedPartnerAvatar ? (
            <div 
              className="flex items-center space-x-1 bg-teal-500/10 px-1.5 py-0.5 rounded-full border border-teal-500/30"
              title={`Accountability Partner: ${task.assignedPartnerName}`}
            >
              <img 
                src={task.assignedPartnerAvatar} 
                alt={task.assignedPartnerName}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="text-[10px] text-teal-600 dark:text-teal-300 font-semibold truncate max-w-[60px]">
                {task.assignedPartnerName?.split(' ')[0]}
              </span>
            </div>
          ) : (
            <button
              onClick={() => startBodyDoubling(task.title)}
              className="text-[10px] text-slate-400 hover:text-teal-400 flex items-center gap-1 transition-colors"
              title="Body Double for this task"
            >
              <Users className="w-3 h-3" />
              <span>Double</span>
            </button>
          )}

          {/* Edit Task Trigger */}
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Edit Task"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          {/* Delete Task */}
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 rounded hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

    </div>
  );
};
