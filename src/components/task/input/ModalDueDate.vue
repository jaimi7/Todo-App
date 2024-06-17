<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      class="col"
      label="Due date"
      v-model="dueDateValue"
      @update:model-value="emit('update:dueDate', $event)"
    >
      <template v-slot:append>
        <q-icon v-if="dueDateValue" @click="$emit('clear')" name="close" class="cursor-pointer" />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date v-model="dueDateValue" @update:model-value="$emit('update:dueDate', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  dueDate: {
    required: false,
    default: null,
  },
});

const emit = defineEmits(["update:dueDate"]);

const dueDateValue = ref();

onMounted(() => {
  dueDateValue.value = props.dueDate;
});

watch(props, () => {
  if (dueDateValue.value != props.dueDate) dueDateValue.value = props.dueDate;
});
</script>
