<template>
  <q-page class="q-pa-md">
    <NoTasks v-if="!Object.keys(tasksTodo).length" @showAddTask="showAddTask=true" />
    <TasksTodo v-else :tasksTodo="tasksTodo" />
    <TasksCompleted v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted" />
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddTask = true" round color="primary" size="24px" icon="add" />
    </div>
    <q-dialog v-model="showAddTask">
      <AddEditTask @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useTaskStore } from "../stores/task-store.js";
import NoTasks from "../components/task/NoTasks.vue";
import TasksTodo from "../components/task/TasksTodo.vue";
import TasksCompleted from "../components/task/TasksCompleted.vue";
import AddEditTask from "../components/task/AddEditTask.vue";

const taskStore = useTaskStore();

const tasksTodo = computed(() => {
  return taskStore.tasksTodo;
});

const tasksCompleted = computed(() => {
  return taskStore.tasksCompleted;
});

const showAddTask = ref(false);
</script>
