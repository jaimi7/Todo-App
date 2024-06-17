<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <ModalHeader>Edit Task</ModalHeader>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <ModalTaskName v-model:name="taskToSubmit.name" @disableBtn="(val)=>isDisable=val" />

        <ModalDueDate v-model:dueDate="taskToSubmit.dueDate" @clear="clearDueDate" />

        <ModalDueTime v-if="taskToSubmit.dueDate" v-model:dueTime="taskToSubmit.dueTime" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Save" color="primary" type="submit" :disable="isDisable" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script setup>
import ModalHeader from "./input/ModalHeader.vue";
import ModalTaskName from "./input/ModalTaskName.vue";
import ModalDueDate from "./input/ModalDueDate.vue";
import ModalDueTime from "./input/ModalDueTime.vue";
import { onMounted, ref } from "vue";
import { useTaskStore } from "../../stores/task-store.js";

const props = defineProps({
  task: {
    required: false,
    default: null,
  },
  id: {
    required: false,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const taskStore = useTaskStore();
const taskToSubmit = ref({
  name: null,
  dueDate: null,
  dueTime: null,
  completed: false,
});
const isDisable = ref(false);

const submitForm = () => {
  if (props.id) {
    taskStore.updateTask({
      id: props.id,
      updates: { ...taskToSubmit.value },
    });
  } else {
    let data = { ...taskToSubmit.value };
    taskStore.addTask(data);
  }
  emit("close");
};

const clearDueDate = () => {
  taskToSubmit.value.dueDate = "";
  taskToSubmit.value.dueTime = "";
};

onMounted(() => {
  if (props.id) taskToSubmit.value = Object.assign({}, props.task);
});
</script>
