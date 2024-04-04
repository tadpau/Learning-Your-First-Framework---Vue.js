import { reactive, readonly } from 'vue';

const STORAGE_KEY = 'vue-habits-app';

const state = reactive({
  habits: {},
  categories: ['Health', 'Work', 'Hobbies']
});

// Initialize from localStorage
const loadFromStorage = () => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  if (storedState) {
    const parsedState = JSON.parse(storedState);
    state.habits = parsedState.habits || {};
    state.categories = parsedState.categories || ['Health', 'Work', 'Hobbies'];
  }
};

// Save to localStorage
const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Add a new habit
function addHabit(date, habit) {
  const dateString = date.toISOString().split('T')[0];
  if (!state.habits[dateString]) {
    state.habits[dateString] = [];
  }
  state.habits[dateString].push({
    ...habit,
    // Store the date string with the habit for reference
    date: dateString,
    completed: false
  });
  saveToStorage(); //
}

// Toggle habit completion
function toggleHabitCompletion(habitId, completed) {
  // Find the habit by id across all dates
  for (const date in state.habits) {
    const habit = state.habits[date].find(h => h.id === habitId);
    if (habit) {
      // Update the completion status
      habit.completed = completed;
      // Stop searching once we've found and updated the habit
      break;
    }
  }
  saveToStorage();
}

// Retrive a list of habits from store based on date that is passed to it.
function getHabitsForDate(date) {
  const dateString = date.toISOString().split('T')[0];
  return state.habits[dateString] || [];
}

// Add a new category
const addCategory = (category) => {
  if (!state.categories.includes(category)) {
    state.categories.push(category);
    saveToStorage();
  }
};

// Remove a category
const removeCategory = (category) => {
  const index = state.categories.indexOf(category);
  if (index > -1) {
    state.categories.splice(index, 1);
    saveToStorage();
  }
};

// Get all categories
const getCategories = () => {
  return state.categories;
};

// Edit an existing category
function editCategory(oldName, newName) {
  const oldNameIndex = state.categories.indexOf(oldName);
  if (oldNameIndex !== -1 && !state.categories.includes(newName)) {
    // Update the category name
    state.categories[oldNameIndex] = newName;

    // Optionally, update all habits with the old category name
    Object.keys(state.habits).forEach(date => {
      state.habits[date].forEach(habit => {
        if (habit.category === oldName) {
          habit.category = newName;
        }
      });
    });

    saveToStorage();
  } else {
    console.error(`editCategory: Category "${oldName}" not found or new name "${newName}" already exists.`);
  }
}


loadFromStorage();

export const store = readonly({
  addHabit,
  toggleHabitCompletion,
  getHabitsForDate,
  addCategory,
  removeCategory,
  getCategories,
  editCategory
});
