<template>
  <div class="add-habit-view">
    <input v-model="newHabit.name" placeholder="Enter habit name" />

    <input type="date" v-model="newHabit.date" />

    <select v-model="newHabit.category">
      <option disabled value="">Please select one</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <button @click="addNewHabit">Add Habit</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { store } from '../store/habits';

export default {
  setup() {
    const categories = store.getCategories();

    const newHabit = ref({
      name: '',
      // Today's date in YYYY-MM-DD format
      date: new Date().toISOString().substring(0, 10),
      category: ''
    });

// Adding a new habit
    function addNewHabit() {
      if (newHabit.value.name && newHabit.value.date && newHabit.value.category) {
        store.addHabit(new Date(newHabit.value.date), {
          name: newHabit.value.name,
          category: newHabit.value.category
        });
        // Reset the form fields
        newHabit.value.name = '';
        newHabit.value.date = new Date().toISOString().substring(0, 10);
        newHabit.value.category = '';
      } else {
        alert("Please fill in all fields.");
      }
    }

    return {
      newHabit,
      categories,
      addNewHabit
    };
  },
};
</script>

<style>
</style>
