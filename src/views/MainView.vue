<template>
  <div class="link-container">
    <router-link to="/categories" class="centered-link">Manage Categories</router-link>
  </div>
  <div class="main-view">
    <Navigation :currentDate="selectedDate" @dateChange="updateDate" />

    <HabitList :selectedDate="selectedDate" />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigation from '../components/Navigation.vue';
import HabitList from '../components/HabitList.vue';

export default {

   props: {
    date: String, //
    someDate: Date, //
  },

  components: {
    Navigation,
    HabitList,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedDate = ref(new Date());

    // Function to update the selected date when changed via navigation
    const updateDate = (newDate) => {
      selectedDate.value = newDate;
      router.push({ name: 'MainView', params: { date: newDate.toISOString().split('T')[0] } });
    };

    // Watch for route changes to update the selected date
    watch(route, (to) => {
      if (to.params.date) {
        selectedDate.value = new Date(to.params.date);
      }
    }, { immediate: true });

    return {
      selectedDate,
      updateDate,
    };
  },
};
</script>


<style>
.main-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  min-height: 50vh;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
  width: 90%;
  max-width: 800px;
}

.controls {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  width: 100%;
}

button {
  background: #5cb85c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background 0.3s ease;
}

button:hover {
  background: #449d44;
}

.link-container {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.centered-link {
  color: #5cb85c;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.centered-link:hover {
  color: #449d44;
  text-decoration: underline;
}
</style>
