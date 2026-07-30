'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskStatus, TaskCategory, TaskPriority, Subtask } from '../../types';
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
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        stressPoints,
        category,
        goalId: goalId || undefined,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        assignedPartnerId: assignedPartnerId || undefined,
        subtasks,
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        stressPoints,
        category,
        goalId: goalId || undefined,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        assignedPartnerId: assignedPartnerId || undefined,
        subtasks,
      });
    }

    onClose();
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    const newSubtask: Subtask = {
      id: `sub-${Date.now()}`,
      taskId: taskToEdit ? taskToEdit.id : 'temp',
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    setSubtasks((prev) => [...prev, newSubtask]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleDecomposeWithAI = () => {
    if (!title.trim()) return;
    const autoSteps: Subtask[] = [
      { id: `sub-ai-1-${Date.now()}`, taskId: taskToEdit?.id || 'temp', title: 'Step 1: Gather necessary items (2 mins)', completed: false },
      { id: `sub-ai-2-${Date.now()}`, taskId: taskToEdit?.id || 'temp', title: 'Step 2: Do 1 small portion without overthinking (5 mins)', completed: false },
      { id: `sub-ai-3-${Date.now()}`, taskId: taskToEdit?.id || 'temp', title: 'Step 3: Put away remaining items & reset', completed: false },
    ];
    setSubtasks((prev) => [...prev, ...autoSteps]);
    setStressPoints((prev) => Math.max(1, prev - 2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zen-border-light dark:border-zen-border-dark">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400" />
            {taskToEdit ? 'Edit Avoidance Task' : 'Add Avoidance Task'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Task Title (Name the thing you are avoiding)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unpack unopened tax documents on desk..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Friction / Micro Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why does this feel hard? (e.g. Too many steps, boring, overwhelming...)"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          {/* Stress Points Rating Slider */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Executive Avoidance Stress Rating
              </label>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {stressPoints} / 10 Pts
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              1 = Minimal resistance • 10 = Paralyzing avoidance
            </p>
            <input
              type="range"
              min="1"
              max="10"
              value={stressPoints}
              onChange={(e) => setStressPoints(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

          {/* Category & Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
              >
                <option value="Household">Household</option>
                <option value="Money">Money</option>
                <option value="Self-Care">Self-Care</option>
                <option value="Work">Work</option>
                <option value="Health">Health</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Board Lane Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
              >
                <option value="TODO">To-Do Avoidance Pile</option>
                <option value="IN_PROGRESS">Active Focus Flow</option>
                <option value="WAITING">Blocked / Waiting</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Target Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Subtask Micro Checklist Section */}
          <div className="space-y-3 pt-2 border-t border-zen-border-light dark:border-zen-border-dark">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-300">Micro Steps (De-escalation)</label>
              <button
                type="button"
                onClick={handleDecomposeWithAI}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[11px] font-bold hover:bg-teal-500/20 transition-colors"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Auto Breakdown (AI)</span>
              </button>
            </div>

            {/* Subtask Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Add 2-minute step..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-xs text-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Add
              </button>
            </div>

            {/* Subtasks List */}
            <div className="space-y-1.5">
              {subtasks.map((st) => (
                <div key={st.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs">
                  <button
                    type="button"
                    onClick={() => handleToggleSubtask(st.id)}
                    className="flex items-center space-x-2 text-left text-slate-300"
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${st.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className={st.completed ? 'line-through text-slate-500' : ''}>{st.title}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(st.id)}
                    className="text-slate-500 hover:text-rose-400 p-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
            >
              {taskToEdit ? 'Save Task Updates' : 'Add Task to Board'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
