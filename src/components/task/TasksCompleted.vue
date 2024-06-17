<template>
  <div>
    <q-banner dense inline-actions class="list-header text-white text-center bg-pink-6">
      <span class="text-bold text-subtitle1">Completed</span>
    </q-banner>
    <q-list separator bordered>
      <TaskList v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key" />
    </q-list>
  </div>
</template>

<script setup>
import TaskList from "./TaskList.vue";

const props = defineProps({
  tasksCompleted: {
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
