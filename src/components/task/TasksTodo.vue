<template>
  <div>
    <q-banner dense inline-actions class="list-header text-white text-center bg-pink-6">
      <span class="text-bold text-subtitle1">Todo</span>
    </q-banner>
    <q-list separator bordered>
      <TaskList v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key" />
    </q-list>
  </div>
</template>

<script setup>
import TaskList from "./TaskList.vue";

const props = defineProps({
  tasksTodo: {
    required: true,
  },
});
</script>

<style>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
