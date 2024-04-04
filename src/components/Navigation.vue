<template>
  <div class="navigation">
    <button @click="navigate(-7)">Prev 7 days</button>
    <button @click="navigate(-1)">Prev</button>
    <span>{{ formattedDate }}</span>
    <button @click="navigate(1)">Next</button>
    <button @click="navigate(7)">Next 7 days</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    currentDate: {
      type: Date,
      required: true
    }
  },
  emits: ['updateDate'],
  setup(props,) {
    const router = useRouter();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formattedDate = computed(() => {
      return props.currentDate.toISOString().split('T')[0];
    });

    const isPastLimit = computed(() => {
      const minDate = new Date(today);
      minDate.setDate(minDate.getDate() - 7);
      return props.currentDate <= minDate;
    });

    const isFutureLimit = computed(() => {
      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 7);
      return props.currentDate >= maxDate;
    });

    const navigate = (dayOffset) => {

      let newDate = new Date(props.currentDate.getTime());

      // Set a fixed time of day to minimize the impact of DST changes
      newDate.setHours(12, 0, 0, 0);

      // Adjust the date by the specified offset
      newDate.setDate(newDate.getDate() + dayOffset);

      // Navigate to the new date
      const newPath = `/day/${newDate.toISOString().split('T')[0]}`;
      router.push(newPath);
    };

    return { formattedDate, isPastLimit, isFutureLimit, navigate };
  },
};
</script>
