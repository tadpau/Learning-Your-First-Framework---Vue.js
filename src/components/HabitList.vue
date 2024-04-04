<template>
  <div class="habit-list">
    <div v-for="(habits, category) in habitsByCategory" :key="category">
      <h3>{{ category }}</h3>
      <ul>
        <li v-for="habit in habits" :key="habit.id">
          <label>
            <input
              type="checkbox"
              :checked="habit.completed"
              :disabled="isFutureDate(habit.date)"
              @change="() => toggleHabitCompletion(habit)"
            >
            {{ habit.name }}
          </label>
          <span v-if="habit.completed" class="habit-completed-message">Completed</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { store } from '../store/habits';

export default {
  name: 'HabitList',
  props: {
    selectedDate: {
      type: Date,
      default: () => new Date(),
      required: true
    },
  },
  setup(props) {

    const today = new Date().toISOString().split('T')[0]; // Get today's date string

    const habitsByCategory = computed(() => {
      if (!props.selectedDate || !(props.selectedDate instanceof Date)) {
        console.warn("selectedDate prop is either undefined or not a Date object.");
        return {};
      }
      const dailyHabits = store.getHabitsForDate(props.selectedDate);
      return dailyHabits.reduce((acc, habit) => {
        const category = habit.category || 'Uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(habit);
        return acc;
      }, {});
    });


       const toggleHabitCompletion = (habit) => {

      if (!isFutureDate(habit.date)) {
        store.toggleHabitCompletion(props.selectedDate, habit); // Updated to pass the habit object
        habit.completed = !habit.completed; // Ensures the checkbox state is updated
      }
    };

    const isFutureDate = (habitDate) => {
      return habitDate > today;
    };


    return {
      habitsByCategory,
      toggleHabitCompletion,
      isFutureDate,
    };
  },
};
</script>

<style scoped>
.habit-list {
  max-width: 600px;
  margin: auto;
}
.habit-list h3 {
  color: #333;
}
.habit-list ul {
  list-style: none;
  padding: 5;
}
.habit-list li {
  margin-bottom: 10px;
}

.habit-completed-message {
  color: green;
  margin-left: 10px;
}
</style>
