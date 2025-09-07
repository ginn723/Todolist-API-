<template>
  <li>
    <label class="todoList_label">
      <input class="todoList_input" type="checkbox" value="true" v-model="todos.status" />
      <span>{{ todos.content }}</span>
    </label>
    <a href="#" @click="handleRemoveTodo(todos.id)">
      <i class="fa fa-times"></i>
    </a>
  </li>
</template>

<script setup>
const props = defineProps({
  todos: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['remove-todo']);

const handleRemoveTodo = (id) => {
  emit('remove-todo', id);
};
</script>
