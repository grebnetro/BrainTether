export interface CategoryRow {
  environment: 'Home' | 'Work';
  mainCategory: string;
  subcategory: string;
  subSubcategory: string;
}

export const CATEGORY_ROWS: CategoryRow[] = [
  // Home -> Errands & Shopping
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Supplies', subSubcategory: 'Grocery shopping' },
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Supplies', subSubcategory: 'Household essentials' },
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Supplies', subSubcategory: 'Hardware store runs' },
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Medical & Pharmacy', subSubcategory: 'Prescription pickups' },
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Medical & Pharmacy', subSubcategory: 'First-aid restocking' },
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Postal & Logistics', subSubcategory: 'Mail pickups' },
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Postal & Logistics', subSubcategory: 'Shipping packages' },
  { environment: 'Home', mainCategory: 'Errands & Shopping', subcategory: 'Postal & Logistics', subSubcategory: 'Return processing' },

  // Home -> Family & Personal Care
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Meal Management', subSubcategory: 'Meal prep' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Meal Management', subSubcategory: 'Cooking' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Meal Management', subSubcategory: 'Recipe planning' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Childcare', subSubcategory: 'School pickup' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Childcare', subSubcategory: 'Homework help' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Childcare', subSubcategory: 'Activity scheduling' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Pet Care', subSubcategory: 'Vet visits' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Pet Care', subSubcategory: 'Feeding & walking' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Pet Care', subSubcategory: 'Grooming' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Personal Health & Fitness', subSubcategory: 'Workout routines' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Personal Health & Fitness', subSubcategory: 'Medical appointments' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Personal Health & Fitness', subSubcategory: 'Medication tracking' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Self-Care', subSubcategory: 'Meditation' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Self-Care', subSubcategory: 'Hobby time' },
  { environment: 'Home', mainCategory: 'Family & Personal Care', subcategory: 'Self-Care', subSubcategory: 'Wardrobe management' },

  // Home -> Finances & Admin
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Money Management', subSubcategory: 'Budget tracking' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Money Management', subSubcategory: 'Bill payments' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Money Management', subSubcategory: 'Savings allocation' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Tax & Legal', subSubcategory: 'Tax preparation' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Tax & Legal', subSubcategory: 'Document archiving' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Tax & Legal', subSubcategory: 'Will/Estate planning' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Insurance & Subscriptions', subSubcategory: 'Policy reviews' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Insurance & Subscriptions', subSubcategory: 'Subscription audits' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Digital Admin', subSubcategory: 'Cloud backups' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Digital Admin', subSubcategory: 'Password updates' },
  { environment: 'Home', mainCategory: 'Finances & Admin', subcategory: 'Digital Admin', subSubcategory: 'Email inbox zero' },

  // Home -> Household Chores
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Deep Cleaning', subSubcategory: 'Carpet shampooing' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Deep Cleaning', subSubcategory: 'Window washing' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Deep Cleaning', subSubcategory: 'Grout cleaning' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Deep Cleaning', subSubcategory: 'Oven scrub' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Daily & Weekly Tidying', subSubcategory: 'Dusting' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Daily & Weekly Tidying', subSubcategory: 'Vacuuming' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Daily & Weekly Tidying', subSubcategory: 'Mopping' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Daily & Weekly Tidying', subSubcategory: 'Surface wiping' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Laundry', subSubcategory: 'Washing clothes' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Laundry', subSubcategory: 'Folding & sorting' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Laundry', subSubcategory: 'Ironing' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Laundry', subSubcategory: 'Dry cleaning drop-off' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Kitchen Cleanup', subSubcategory: 'Dishwashing' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Kitchen Cleanup', subSubcategory: 'Fridge cleanout' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Kitchen Cleanup', subSubcategory: 'Pantry organization' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Waste Management', subSubcategory: 'Trash removal' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Waste Management', subSubcategory: 'Recycling sorting' },
  { environment: 'Home', mainCategory: 'Household Chores', subcategory: 'Waste Management', subSubcategory: 'Composting' },

  // Home -> Maintenance & Repairs
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Automobile', subSubcategory: 'Tires' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Automobile', subSubcategory: 'Inspection & Legal' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Automobile', subSubcategory: 'Gas & Fueling' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Automobile', subSubcategory: 'Repairs & Mechanical' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Automobile', subSubcategory: 'Windshield Wipers' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Automobile', subSubcategory: 'Oil change' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Landscaping & Yard', subSubcategory: 'Lawn mowing' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Landscaping & Yard', subSubcategory: 'Gutter cleaning' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Landscaping & Yard', subSubcategory: 'Weeding' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Landscaping & Yard', subSubcategory: 'Tree trimming' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Landscaping & Yard', subSubcategory: 'Snow removal' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'HVAC & Utilities', subSubcategory: 'Air filter replacement' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'HVAC & Utilities', subSubcategory: 'Thermostat settings' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'HVAC & Utilities', subSubcategory: 'Water heater flush' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Plumbing', subSubcategory: 'Leak fixing' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Plumbing', subSubcategory: 'Drain unclogging' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Plumbing', subSubcategory: 'Faucet replacement' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Home Structure & Appliances', subSubcategory: 'Roof repair' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Home Structure & Appliances', subSubcategory: 'Appliance fixing' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Home Structure & Appliances', subSubcategory: 'Painting' },
  { environment: 'Home', mainCategory: 'Maintenance & Repairs', subcategory: 'Home Structure & Appliances', subSubcategory: 'Lightbulb replacement' },

  // Work -> Administrative
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Financial Admin', subSubcategory: 'Expense reporting' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Financial Admin', subSubcategory: 'Invoicing' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Financial Admin', subSubcategory: 'Budget tracking' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Schedule & Logistics', subSubcategory: 'Calendar coordination' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Schedule & Logistics', subSubcategory: 'Travel booking' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Schedule & Logistics', subSubcategory: 'Event planning' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Data & Systems', subSubcategory: 'Data entry' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Data & Systems', subSubcategory: 'CRM updating' },
  { environment: 'Work', mainCategory: 'Administrative', subcategory: 'Data & Systems', subSubcategory: 'Software updates' },

  // Work -> Communication
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'Internal Team', subSubcategory: 'Team meetings' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'Internal Team', subSubcategory: 'Messaging (Slack/Teams)' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'Internal Team', subSubcategory: 'Status updates' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'External & Clients', subSubcategory: 'Client emails' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'External & Clients', subSubcategory: 'Sales presentations' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'External & Clients', subSubcategory: 'Contract negotiations' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'External & Clients', subSubcategory: 'Networking' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'Documentation', subSubcategory: 'Meeting minutes' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'Documentation', subSubcategory: 'Knowledge base writing' },
  { environment: 'Work', mainCategory: 'Communication', subcategory: 'Documentation', subSubcategory: 'Handover notes' },

  // Work -> Core Operations
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Production & Design', subSubcategory: 'Content creation' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Production & Design', subSubcategory: 'Coding & Development' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Production & Design', subSubcategory: 'Graphic design' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Sales & Marketing', subSubcategory: 'Campaign optimization' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Sales & Marketing', subSubcategory: 'Lead generation' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Sales & Marketing', subSubcategory: 'Social media scheduling' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Technical Support', subSubcategory: 'Troubleshooting' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Technical Support', subSubcategory: 'System maintenance' },
  { environment: 'Work', mainCategory: 'Core Operations', subcategory: 'Technical Support', subSubcategory: 'Bug fixing' },

  // Work -> Professional Development
  { environment: 'Work', mainCategory: 'Professional Development', subcategory: 'Education', subSubcategory: 'Skills training' },
  { environment: 'Work', mainCategory: 'Professional Development', subcategory: 'Education', subSubcategory: 'Industry research' },
  { environment: 'Work', mainCategory: 'Professional Development', subcategory: 'Education', subSubcategory: 'Reading case studies' },
  { environment: 'Work', mainCategory: 'Professional Development', subcategory: 'Growth & Compliance', subSubcategory: 'Certifications' },
  { environment: 'Work', mainCategory: 'Professional Development', subcategory: 'Growth & Compliance', subSubcategory: 'Performance reviews' },
  { environment: 'Work', mainCategory: 'Professional Development', subcategory: 'Growth & Compliance', subSubcategory: 'Mentorship sessions' },

  // Work -> Project Management
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Planning & Strategy', subSubcategory: 'Milestone planning' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Planning & Strategy', subSubcategory: 'Roadmap creation' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Planning & Strategy', subSubcategory: 'Goal setting (OKRs)' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Execution & Tracking', subSubcategory: 'Sprint tracking' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Execution & Tracking', subSubcategory: 'Task assignment' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Execution & Tracking', subSubcategory: 'Deadline monitoring' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Quality Assurance', subSubcategory: 'Quality review' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Quality Assurance', subSubcategory: 'Testing & Debugging' },
  { environment: 'Work', mainCategory: 'Project Management', subcategory: 'Quality Assurance', subSubcategory: 'Compliance checks' },
];

export const LEGACY_CATEGORIES = [
  'Household',
  'Money',
  'Self-Care',
  'Work',
  'Health',
  'General',
] as const;

// Derived lists and groupings
export const ALL_SUB_SUBCATEGORIES = Array.from(
  new Set(CATEGORY_ROWS.map((r) => r.subSubcategory))
);

export const ALL_SUBCATEGORIES = Array.from(
  new Set(CATEGORY_ROWS.map((r) => r.subcategory))
);

export const ALL_MAIN_CATEGORIES = Array.from(
  new Set(CATEGORY_ROWS.map((r) => r.mainCategory))
);

export const ALL_ENVIRONMENTS = ['Home', 'Work'] as const;

export interface HierarchicalCategoryGroup {
  groupName: string; // e.g. "Home › Errands & Shopping"
  environment: 'Home' | 'Work';
  mainCategory: string;
  subcategory: string;
  items: string[]; // list of subSubcategories
}

export function getGroupedCategoryOptions(): HierarchicalCategoryGroup[] {
  const groupsMap = new Map<string, HierarchicalCategoryGroup>();

  for (const row of CATEGORY_ROWS) {
    const key = `${row.environment} › ${row.mainCategory} › ${row.subcategory}`;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        groupName: key,
        environment: row.environment,
        mainCategory: row.mainCategory,
        subcategory: row.subcategory,
        items: [],
      });
    }
    groupsMap.get(key)!.items.push(row.subSubcategory);
  }

  return Array.from(groupsMap.values());
}

/**
 * Finds the hierarchy row for a given sub-subcategory or category string
 */
export function findCategoryRow(categoryName: string): CategoryRow | undefined {
  return CATEGORY_ROWS.find(
    (r) =>
      r.subSubcategory.toLowerCase() === categoryName.toLowerCase() ||
      r.subcategory.toLowerCase() === categoryName.toLowerCase() ||
      r.mainCategory.toLowerCase() === categoryName.toLowerCase()
  );
}

/**
 * Returns true if a task's category matches a given filter string.
 * Supports exact match, Environment match ('Home' or 'Work'), Main Category match,
 * Subcategory match, or legacy category match.
 */
export function matchesCategoryFilter(taskCategory: string, filter: string): boolean {
  if (!filter || filter === 'ALL') return true;
  if (taskCategory === filter) return true;

  const row = findCategoryRow(taskCategory);
  if (!row) {
    // Legacy or custom category
    if (filter === 'Home') return ['Household', 'Self-Care', 'Health'].includes(taskCategory);
    if (filter === 'Work') return ['Work', 'Money'].includes(taskCategory);
    return taskCategory.toLowerCase().includes(filter.toLowerCase());
  }

  if (filter === row.environment) return true;
  if (filter.toLowerCase() === row.mainCategory.toLowerCase()) return true;
  if (filter.toLowerCase() === row.subcategory.toLowerCase()) return true;

  return false;
}

/**
 * Returns distinct Main Categories for a given Environment ('Home' | 'Work')
 */
export function getMainCategoriesForEnv(environment: 'Home' | 'Work'): string[] {
  return Array.from(
    new Set(
      CATEGORY_ROWS.filter((r) => r.environment === environment).map(
        (r) => r.mainCategory
      )
    )
  );
}

/**
 * Returns distinct Subcategories for a given Environment and Main Category
 */
export function getSubcategoriesForMainCategory(
  environment: 'Home' | 'Work',
  mainCategory: string
): string[] {
  return Array.from(
    new Set(
      CATEGORY_ROWS.filter(
        (r) => r.environment === environment && r.mainCategory === mainCategory
      ).map((r) => r.subcategory)
    )
  );
}

/**
 * Returns Sub-subcategories for a given Environment, Main Category, and Subcategory
 */
export function getSubSubcategoriesForSubcategory(
  environment: 'Home' | 'Work',
  mainCategory: string,
  subcategory: string
): string[] {
  return CATEGORY_ROWS.filter(
    (r) =>
      r.environment === environment &&
      r.mainCategory === mainCategory &&
      r.subcategory === subcategory
  ).map((r) => r.subSubcategory);
}

/**
 * AI Heuristic helper to guess environment, mainCategory, subcategory & specific task item from title
 */
export function guessCategoryFromTitle(title: string): CategoryRow {
  const lower = title.toLowerCase().trim();
  if (!lower) {
    return CATEGORY_ROWS[0];
  }

  // 1. Check exact subSubcategory match or inclusion
  for (const row of CATEGORY_ROWS) {
    const subSubLower = row.subSubcategory.toLowerCase();
    if (lower.includes(subSubLower) || subSubLower.includes(lower)) {
      return row;
    }
  }

  // 2. Keyword heuristic mapping
  const keywordMappings: { keywords: string[]; rowMatch: (r: CategoryRow) => boolean }[] = [
    { keywords: ['grocery', 'groceries', 'milk', 'food', 'market', 'store', 'fruit', 'snack', 'vegetable'], rowMatch: r => r.subSubcategory === 'Grocery shopping' },
    { keywords: ['bill', 'pay', 'electric', 'water', 'utility', 'rent', 'mortgage', 'due', 'bank', 'credit', 'invoice'], rowMatch: r => r.subSubcategory === 'Bill payments' },
    { keywords: ['tax', 'irs', 'w2', 'deduction', 'accounting', 'audit'], rowMatch: r => r.subSubcategory === 'Tax preparation' },
    { keywords: ['oil', 'tire', 'car', 'auto', 'gas', 'vehicle', 'inspection', 'mechanic', 'windshield', 'brake'], rowMatch: r => r.mainCategory === 'Maintenance & Repairs' && r.subcategory === 'Automobile' },
    { keywords: ['clean', 'dust', 'vacuum', 'mop', 'wipe', 'tidy', 'sweep', 'dish', 'trash', 'laundry', 'oven', 'fridge', 'scrub'], rowMatch: r => r.mainCategory === 'Household Chores' },
    { keywords: ['doctor', 'pharmacy', 'rx', 'prescription', 'med', 'health', 'appointment', 'vet', 'dentist', 'physician'], rowMatch: r => r.subcategory === 'Medical & Pharmacy' || r.subcategory === 'Personal Health & Fitness' || r.subSubcategory === 'Vet visits' },
    { keywords: ['meeting', 'slack', 'teams', 'email', 'client', 'call', 'presentation', 'zoom', 'inbox'], rowMatch: r => r.environment === 'Work' && r.mainCategory === 'Communication' },
    { keywords: ['code', 'dev', 'bug', 'github', 'design', 'content', 'script', 'feature', 'api', 'deploy'], rowMatch: r => r.environment === 'Work' && r.mainCategory === 'Core Operations' },
    { keywords: ['sprint', 'roadmap', 'project', 'plan', 'okr', 'jira', 'trello', 'kanban'], rowMatch: r => r.environment === 'Work' && r.mainCategory === 'Project Management' },
    { keywords: ['expense', 'invoicing', 'budget', 'travel', 'calendar', 'booking', 'flight'], rowMatch: r => r.environment === 'Work' && r.mainCategory === 'Administrative' },
  ];

  for (const mapping of keywordMappings) {
    if (mapping.keywords.some(k => lower.includes(k))) {
      const match = CATEGORY_ROWS.find(mapping.rowMatch);
      if (match) return match;
    }
  }

  // 3. Check subcategory or main category inclusion
  for (const row of CATEGORY_ROWS) {
    if (lower.includes(row.subcategory.toLowerCase()) || lower.includes(row.mainCategory.toLowerCase())) {
      return row;
    }
  }

  // Fallback to first row
  return CATEGORY_ROWS[0];
}


