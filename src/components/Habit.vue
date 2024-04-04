<template>
  <div class="habit">
    <span>{{ habit.name }}</span>
    <input type="checkbox" v-model="habit.completed" @change="$emit('toggle')" />
  </div>
</template>

<script>
export default {
  props: {
    habit: Object,
  },
  methods: {
    toggleCompletion() {
      this.$emit('toggle', this.habit);
    }
  }
};
</script>
