'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskStatus, TaskCategory, TaskPriority, Subtask } from '../../types';
import { 
  findCategoryRow,
  getMainCategoriesForEnv,
  getSubcategoriesForMainCategory,
  getSubSubcategoriesForSubcategory,
  guessCategoryFromTitle,
  LEGACY_CATEGORIES 
} from '../../lib/categoriesData';
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
  const [category, setCategory] = useState<TaskCategory>('Grocery shopping');
  const [selectedEnv, setSelectedEnv] = useState<'Home' | 'Work' | 'General'>('Home');
  const [selectedMainCat, setSelectedMainCat] = useState<string>('Errands & Shopping');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('Supplies');
  const [selectedSubSubCat, setSelectedSubSubCat] = useState<string>('Grocery shopping');

  const [isCustomMainCat, setIsCustomMainCat] = useState(false);
  const [customMainCat, setCustomMainCat] = useState('');
  const [isCustomSubCat, setIsCustomSubCat] = useState(false);
  const [customSubCat, setCustomSubCat] = useState('');
  const [isCustomSubSubCat, setIsCustomSubSubCat] = useState(false);
  const [customSubSubCat, setCustomSubSubCat] = useState('');

  const [aiMatchedMessage, setAiMatchedMessage] = useState<string>('');

  const [goalId, setGoalId] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [assignedPartnerId, setAssignedPartnerId] = useState<string>('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(30);
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
      setEstimatedMinutes(taskToEdit.estimatedMinutes || 30);
      setAssignedPartnerId(taskToEdit.assignedPartnerId || '');
      setSubtasks(taskToEdit.subtasks || []);

      const row = findCategoryRow(taskToEdit.category);
      if (row) {
        setSelectedEnv(row.environment);
        setSelectedMainCat(row.mainCategory);
        setSelectedSubCat(row.subcategory);
        setSelectedSubSubCat(row.subSubcategory);
      } else {
        setSelectedEnv('General');
      }
    } else {
      setTitle('');
      setDescription('');
      setStatus(initialStatus);
      setPriority('MEDIUM');
      setStressPoints(3);
      setCategory('Grocery shopping');
      setSelectedEnv('Home');
      setSelectedMainCat('Errands & Shopping');
      setSelectedSubCat('Supplies');
      setSelectedSubSubCat('Grocery shopping');
      setIsCustomMainCat(false);
      setCustomMainCat('');
      setIsCustomSubCat(false);
      setCustomSubCat('');
      setIsCustomSubSubCat(false);
      setCustomSubSubCat('');
      setAiMatchedMessage('');
      setGoalId('');
      setDueDate('');
      setEstimatedMinutes(30);
      setAssignedPartnerId('');
      setSubtasks([]);
    }
  }, [taskToEdit, isOpen, initialStatus]);

  const handleAiAutoCategorize = () => {
    if (!title.trim()) return;
    const row = guessCategoryFromTitle(title);
    setSelectedEnv(row.environment);
    setSelectedMainCat(row.mainCategory);
    setSelectedSubCat(row.subcategory);
    setSelectedSubSubCat(row.subSubcategory);
    setCategory(row.subSubcategory);
    setIsCustomMainCat(false);
    setIsCustomSubCat(false);
    setIsCustomSubSubCat(false);

    setAiMatchedMessage(`✨ AI Matched: ${row.environment} › ${row.mainCategory} › ${row.subcategory} › ${row.subSubcategory}`);
  };

  const handleEnvChange = (env: 'Home' | 'Work' | 'General') => {
    setSelectedEnv(env);
    if (env === 'General') {
      setCategory('General');
      return;
    }
    const mainCats = getMainCategoriesForEnv(env);
    const firstMain = mainCats[0] || '';
    setSelectedMainCat(firstMain);

    const subCats = getSubcategoriesForMainCategory(env, firstMain);
    const firstSub = subCats[0] || '';
    setSelectedSubCat(firstSub);

    const subSubCats = getSubSubcategoriesForSubcategory(env, firstMain, firstSub);
    const firstSubSub = subSubCats[0] || '';
    setSelectedSubSubCat(firstSubSub);

    setCategory(firstSubSub || firstSub || firstMain || env);
  };

  const handleMainCatChange = (mainCat: string) => {
    if (selectedEnv === 'General') return;
    setSelectedMainCat(mainCat);

    const subCats = getSubcategoriesForMainCategory(selectedEnv as 'Home' | 'Work', mainCat);
    const firstSub = subCats[0] || '';
    setSelectedSubCat(firstSub);

    const subSubCats = getSubSubcategoriesForSubcategory(selectedEnv as 'Home' | 'Work', mainCat, firstSub);
    const firstSubSub = subSubCats[0] || '';
    setSelectedSubSubCat(firstSubSub);

    setCategory(firstSubSub || firstSub || mainCat);
  };

  const handleSubCatChange = (subCat: string) => {
    if (selectedEnv === 'General') return;
    setSelectedSubCat(subCat);

    const subSubCats = getSubSubcategoriesForSubcategory(selectedEnv as 'Home' | 'Work', selectedMainCat, subCat);
    const firstSubSub = subSubCats[0] || '';
    setSelectedSubSubCat(firstSubSub);

    setCategory(firstSubSub || subCat);
  };

  const handleSubSubCatChange = (subSubCat: string) => {
    setSelectedSubSubCat(subSubCat);
    setCategory(subSubCat);
  };

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
        estimatedMinutes,
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
        estimatedMinutes,
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

  const handleConvertSubtaskToCard = (subtask: Subtask) => {
    addTask({
      title: subtask.title,
      description: `Extracted step from parent task: "${title || 'Main Goal'}"`,
      status: 'TODO',
      priority: 'MEDIUM',
      stressPoints: 2, // Low friction micro-step!
      category,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      estimatedMinutes: 15,
    });
    handleRemoveSubtask(subtask.id);
  };

  const handleDecomposeWithAI = () => {
    const q = (title || 'Task').toLowerCase();

    let autoTitles: string[] = [];

    if (q.includes('tire') || q.includes('car') || q.includes('auto')) {
      autoTitles = [
        '🔍 Research tire size, speed rating & compare price deals (15m)',
        '📞 Call 2 local tire shops to verify stock & schedule appointment (10m)',
        '🚗 Drive car to service center & hand over keys (20m)',
        '☕ Wait in lounge or body-double while installation completes (45m)',
      ];
    } else if (q.includes('tax') || q.includes('mail') || q.includes('bill') || q.includes('paper')) {
      autoTitles = [
        '✂️ Open mail envelope & sort into action vs archive pile (5m)',
        '📄 Scan/photo document for digital records (5m)',
        '💳 Pay online or schedule payment due date (10m)',
      ];
    } else if (q.includes('clean') || q.includes('kitchen') || q.includes('counter') || q.includes('room')) {
      autoTitles = [
        '🧽 Clear trash & empty dishes into sink (5m)',
        '🧼 Wipe down main counter surface (5m)',
        '🗑️ Take out trash bag & reset room (3m)',
      ];
    } else {
      autoTitles = [
        `🔍 Clarify first 5-minute action step for "${title || 'Task'}" (5m)`,
        '🧰 Gather required tabs, links, tools or phone numbers (5m)',
        '⚡ Execute initial 15-minute focus session without overthinking (15m)',
        '🏁 Review result & mark task complete (5m)',
      ];
    }

    const autoSteps: Subtask[] = autoTitles.map((t, idx) => ({
      id: `sub-ai-${Date.now()}-${idx}`,
      taskId: taskToEdit?.id || 'temp',
      title: t,
      completed: false,
    }));

    setSubtasks((prev) => [...prev, ...autoSteps]);
    setStressPoints((prev) => Math.max(1, prev - 2));
  };

  if (!isOpen) return null;

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
          
          {/* Title + AI First Guess Button */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-400">
                Task Title (Name the thing you are avoiding) <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={handleAiAutoCategorize}
                disabled={!title.trim()}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 text-teal-300 border border-teal-500/40 text-[11px] font-bold transition-all active:scale-95 disabled:opacity-40 shadow-sm"
                title="Click to have AI guess the Environment, Main Category, Subcategory & Specific Item based on task title"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
                <span>✨ AI First Guess</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unpack unopened tax documents on desk..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
            {aiMatchedMessage && (
              <div className="mt-1.5 px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] font-medium animate-in fade-in">
                {aiMatchedMessage}
              </div>
            )}
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

          {/* Cascading Category Selector */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Category Taxonomy (Cascading)
              </label>
              <div className="text-[11px] font-medium text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
                {selectedEnv === 'General' ? category : `${selectedEnv} › ${selectedMainCat} › ${selectedSubCat} › ${selectedSubSubCat}`}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {/* Tier 1: Environment */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                  1. Environment
                </label>
                <select
                  value={selectedEnv}
                  onChange={(e) => handleEnvChange(e.target.value as 'Home' | 'Work' | 'General')}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="General">General / Other</option>
                </select>
              </div>

              {/* Tier 2: Main Category */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                  2. Main Category
                </label>
                {selectedEnv === 'General' ? (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TaskCategory)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
                  >
                    {LEGACY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <select
                      value={isCustomMainCat ? 'OTHER' : selectedMainCat}
                      onChange={(e) => {
                        if (e.target.value === 'OTHER') {
                          setIsCustomMainCat(true);
                          setSelectedMainCat('Other');
                          setCategory(customMainCat || 'Other');
                        } else {
                          setIsCustomMainCat(false);
                          handleMainCatChange(e.target.value);
                        }
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
                    >
                      {getMainCategoriesForEnv(selectedEnv).map((mainCat) => (
                        <option key={mainCat} value={mainCat}>
                          {mainCat}
                        </option>
                      ))}
                      <option value="OTHER">✏️ Other (Custom Main Cat...)</option>
                    </select>

                    {isCustomMainCat && (
                      <input
                        type="text"
                        value={customMainCat}
                        onChange={(e) => {
                          setCustomMainCat(e.target.value);
                          setCategory(e.target.value || 'Custom Main Cat');
                        }}
                        placeholder="Type custom main cat..."
                        className="mt-1.5 w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-teal-500/40 text-teal-300 text-xs focus:outline-none"
                      />
                    )}
                  </>
                )}
              </div>

              {/* Tier 3: Subcategory */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                  3. Subcategory
                </label>
                <select
                  disabled={selectedEnv === 'General'}
                  value={isCustomSubCat ? 'OTHER' : selectedSubCat}
                  onChange={(e) => {
                    if (e.target.value === 'OTHER') {
                      setIsCustomSubCat(true);
                      setSelectedSubCat('Other');
                      setCategory(customSubCat || 'Other');
                    } else {
                      setIsCustomSubCat(false);
                      handleSubCatChange(e.target.value);
                    }
                  }}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none disabled:opacity-50"
                >
                  {selectedEnv !== 'General' &&
                    getSubcategoriesForMainCategory(selectedEnv, selectedMainCat).map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                  <option value="OTHER">✏️ Other (Custom Subcat...)</option>
                </select>

                {isCustomSubCat && (
                  <input
                    type="text"
                    value={customSubCat}
                    onChange={(e) => {
                      setCustomSubCat(e.target.value);
                      setCategory(e.target.value || 'Custom Subcat');
                    }}
                    placeholder="Type custom subcategory..."
                    className="mt-1.5 w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-teal-500/40 text-teal-300 text-xs focus:outline-none"
                  />
                )}
              </div>

              {/* Tier 4: Specific Task (Sub-Subcategory) */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                  4. Specific Item
                </label>
                <select
                  disabled={selectedEnv === 'General'}
                  value={isCustomSubSubCat ? 'OTHER' : selectedSubSubCat}
                  onChange={(e) => {
                    if (e.target.value === 'OTHER') {
                      setIsCustomSubSubCat(true);
                      setSelectedSubSubCat('Other');
                      setCategory(customSubSubCat || 'Other');
                    } else {
                      setIsCustomSubSubCat(false);
                      handleSubSubCatChange(e.target.value);
                    }
                  }}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs font-semibold text-teal-600 dark:text-teal-400 focus:outline-none disabled:opacity-50"
                >
                  {selectedEnv !== 'General' &&
                    getSubSubcategoriesForSubcategory(selectedEnv, selectedMainCat, selectedSubCat).map(
                      (subSubCat) => (
                        <option key={subSubCat} value={subSubCat}>
                          {subSubCat}
                        </option>
                      )
                    )}
                  <option value="OTHER">✏️ Other (Custom Task Item...)</option>
                </select>

                {isCustomSubSubCat && (
                  <input
                    type="text"
                    value={customSubSubCat}
                    onChange={(e) => {
                      setCustomSubSubCat(e.target.value);
                      setCategory(e.target.value || 'Custom Task Item');
                    }}
                    placeholder="Type custom task item..."
                    className="mt-1.5 w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-teal-500/40 text-teal-300 text-xs font-semibold focus:outline-none"
                  />
                )}
              </div>
            </div>
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

          {/* Priority, Due Date & Estimated Duration */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
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

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Duration (Est.)
              </label>
              <select
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
              >
                <option value={15}>15 mins</option>
                <option value={30}>30 mins</option>
                <option value={45}>45 mins</option>
                <option value={60}>60 mins (1h)</option>
                <option value={90}>90 mins</option>
                <option value={120}>120 mins (2h)</option>
              </select>
            </div>
          </div>

          {/* Subtask Micro Checklist Section */}
          <div className="space-y-3 pt-2 border-t border-zen-border-light dark:border-zen-border-dark">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-300">Micro Steps (De-escalation)</label>
              <button
                type="button"
                onClick={handleDecomposeWithAI}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[11px] font-bold hover:bg-teal-500/20 transition-colors shadow-sm"
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
            <div className="space-y-2">
              {subtasks.map((st) => (
                <div key={st.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSubtask(st.id)}
                    className="flex items-center space-x-2 text-left text-slate-300 flex-1 min-w-0"
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${st.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className={`truncate ${st.completed ? 'line-through text-slate-500' : ''}`}>{st.title}</span>
                  </button>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleConvertSubtaskToCard(st)}
                      className="px-2 py-1 rounded bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/30 text-[10px] font-bold transition-colors flex items-center space-x-1"
                      title="Extract as standalone task card on board"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(st.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-colors"
                      title="Delete step"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
