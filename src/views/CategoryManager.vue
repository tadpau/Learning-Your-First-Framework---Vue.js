<template>
  <div class="category-manager">
    <h2>Manage Categories</h2>

    <div>
      <input v-model="newCategory" placeholder="New Category Name" />
      <button @click="handleAddCategory">Add Category</button>
    </div>

    <ul>
      <li v-for="(category, index) in categories" :key="category">
        <template v-if="editedIndex !== index">
          {{ category }}
          <button @click="startEdit(index)">Edit</button>
          <button @click="handleRemoveCategory(category)">Remove</button>
        </template>
        <template v-else>
          <input v-model="editedCategory" />
          <button @click="handleSaveEdit(index)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { store } from '../store/habits';

export default {
  setup() {
    const newCategory = ref('');
    const categories = ref(store.getCategories());
    const editedIndex = ref(-1);
    const editedCategory = ref('');

// Add new category
    const handleAddCategory = () => {
      if (newCategory.value.trim()) {
        store.addCategory(newCategory.value.trim());
        newCategory.value = '';
        categories.value = store.getCategories();
      }
    };

// Remove category
    const handleRemoveCategory = (category) => {
      store.removeCategory(category);
      categories.value = store.getCategories();
      if (editedIndex.value !== -1) {
        cancelEdit();
      }
    };

// Edit category
    const startEdit = (index) => {
      editedIndex.value = index;
      editedCategory.value = categories.value[index];
    };

// Save edited category
    const handleSaveEdit = (index) => {
      if (editedCategory.value.trim()) {
        store.editCategory(categories.value[index], editedCategory.value.trim());
        categories.value = store.getCategories();
        editedIndex.value = -1;
      }
    };

// Cancel editing category
    const cancelEdit = () => {
      editedIndex.value = -1;
    };

    return {
      newCategory,
      categories,
      editedIndex,
      editedCategory,
      handleAddCategory,
      handleRemoveCategory,
      startEdit,
      handleSaveEdit,
      cancelEdit,
    };
  },
};
</script>

<style>
</style>
