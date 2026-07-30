'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskStatus, TaskCategory, Subtask } from '../../types';
import { 
  X, 
  Flame, 
  Calendar, 
  Tag, 
  Users, 
  Plus, 
  Trash2, 
  Wand2,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatus?: TaskStatus;
  taskToEdit?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  initialStatus = 'TODO',
  taskToEdit = null,
}) => {
  const { addTask, updateTask, goals, partners } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(initialStatus);
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [stressPoints, setStressPoints] = useState<number>(3);
  const [category, setCategory] = useState<TaskCategory>('General');
  const [goalId, setGoalId] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [assignedPartnerId, setAssignedPartnerId] = useState<string>('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setStressPoints(taskToEdit.stressPoints);
      setCategory(taskToEdit.category);
      setGoalId(taskToEdit.goalId || '');
      setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '');
      setAssignedPartnerId(taskToEdit.assignedPartnerId || '');
      setSubtasks(taskToEdit.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setStatus(initialStatus);
      setPriority('MEDIUM');
      setStressPoints(3);
      setCategory('General');
      setGoalId('');
      setDueDate('');
      setAssignedPartnerId('');
      setSubtasks([]);
    }
  }, [taskToEdit, initialStatus, isOpen]);

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    setSubtasks(prev => [
      ...prev,
      { id: `sub-draft-${Date.now()}`, title: newSubtaskTitle.trim(), completed: false }
    ]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(prev => prev.filter(s => s.id !== id));
  };

  // AI-assisted Breakdown generator for high avoidance tasks
  const handleAIGenerateSteps = () => {
    if (!title.trim()) return;
    const generated: Subtask[] = [
      { id: `sub-gen-1-${Date.now()}`, title: `Step 1: Set 5 min timer and open workspace for "${title}"`, completed: false },
      { id: `sub-gen-2-${Date.now()}`, title: 'Step 2: Do only the first 2 minutes of low-effort setup', completed: false },
      { id: `sub-gen-3-${Date.now()}`, title: 'Step 3: Review progress and give yourself a 2-min breather', completed: false }
    ];
    setSubtasks(prev => [...prev, ...generated]);
    if (stressPoints > 3) {
      setStressPoints(prev => Math.max(1, prev - 2));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedPartner = partners.find(p => p.id === assignedPartnerId);
    const selectedGoal = goals.find(g => g.id === goalId);

    const taskPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      stressPoints,
      category,
      goalId: goalId || undefined,
      goal: selectedGoal,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      assignedPartnerId: assignedPartnerId || undefined,
      assignedPartnerName: selectedPartner?.name,
      assignedPartnerAvatar: selectedPartner?.avatar,
      subtasks,
    };

    if (taskToEdit) {
      updateTask(taskToEdit.id, taskPayload);
    } else {
      addTask(taskPayload);
    }

    onClose();
  };

  // Helper for live stress point preview
  const getStressColor = (pts: number) => {
    if (pts >= 9) return 'from-rose-600 to-red-600 text-white';
    if (pts >= 7) return 'from-rose-500 to-amber-500 text-white';
    if (pts >= 4) return 'from-amber-400 to-emerald-500 text-slate-900';
    return 'from-emerald-400 to-teal-500 text-slate-900';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zen-border-light dark:border-zen-border-dark">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
                {taskToEdit ? 'Edit Task & Stress Points' : 'Create Calmer Task'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rate task avoidance/anxiety level on the Stress Points scale
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Fold laundry / Open tax mail..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          {/* Interactive Stress Point Rating Slider */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Task Stress / Avoidance Rating (1–10)
              </label>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getStressColor(stressPoints)} shadow-sm`}>
                {stressPoints} / 10 Points
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="10"
              value={stressPoints}
              onChange={(e) => setStressPoints(parseInt(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>1 - Easy Flow</span>
              <span>5 - Routine</span>
              <span>8 - High Avoidance</span>
              <span>10 - Panic / Dread</span>
            </div>
          </div>

          {/* Category & Goal Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="General">General</option>
                <option value="Household">Household</option>
                <option value="Money">Money & Bills</option>
                <option value="Self-Care">Self-Care</option>
                <option value="Work">Work & Projects</option>
                <option value="Health">Health & Wellness</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Strategic Goal (Optional)
              </label>
              <select
                value={goalId}
                onChange={(e) => setGoalId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="">-- No Linked Goal --</option>
                {goals.map(g => (
                  <option key={g.id} value={g.id}>{g.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date & Accountability Partner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Accountability Partner
              </label>
              <select
                value={assignedPartnerId}
                onChange={(e) => setAssignedPartnerId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="">-- None Assigned --</option>
                {partners.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Description & Helpful Context
            </label>
            <textarea
              rows={2}
              placeholder="Add gentle instructions or setup notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none"
            />
          </div>

          {/* Subtasks Builder */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Micro-Step Breakdown
              </label>
              <button
                type="button"
                onClick={handleAIGenerateSteps}
                className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Auto-Breakdown with AI</span>
              </button>
            </div>

            {/* List of subtasks */}
            <div className="space-y-1.5 mb-2 max-h-32 overflow-y-auto">
              {subtasks.map(sub => (
                <div key={sub.id} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-200">
                  <span className="truncate">{sub.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(sub.id)}
                    className="text-slate-400 hover:text-rose-500 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add subtask input */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a tiny 2-minute step..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Buttons Footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zen-border-light dark:border-zen-border-dark">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-md shadow-teal-500/20 active:scale-95 transition-all"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
