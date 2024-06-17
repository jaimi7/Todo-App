<template>
  <q-item
    @click="updateTask()"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox v-model="isCompleted" class="no-pointer-events" @change="updateTask()" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough' : task.completed }">{{ task.name }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate }}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn @click.stop="showEditTask = true" flat round dense color="green" icon="edit" />
        <q-btn @click.stop="promptToDelete(id)" flat round dense color="red" icon="delete" />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <EditTask @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTaskStore } from "../../stores/task-store.js";
import { useQuasar } from "quasar";
import EditTask from "./EditTask.vue";

const $q = useQuasar();
const taskStore = useTaskStore();

const props = defineProps({
  task: {
    required: true,
  },
  id: {
    required: true,
  },
});

const showEditTask = ref(false);
const isCompleted = ref(false);

const updateTask = () => {
  taskStore.updateTask({
    id: props.id,
    updates: { ...props.task, completed: !props.task.completed },
  });
};

const promptToDelete = (id) => {
  $q.dialog({
    title: "Confirm",
    message: "Really delete?",
    ok: {
      push: true,
    },
    cancel: {
      color: "negative",
    },
    persistent: true,
  }).onOk(() => {
    taskStore.deleteTask(id);
  });
};

onMounted(() => {
  isCompleted.value = props.task?.completed ?? false;
});
</script>
