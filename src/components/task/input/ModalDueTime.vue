<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      label="Due time"
      v-model="dueTimeValue"
      @update:model-value="emit('update:dueTime', $event)"
      class="col"
    >
      <template v-slot:append>
        <q-icon
          v-if="dueTimeValue"
          @click="dueTimeValue=null,$emit('update:dueTime', '')"
          name="close"
          class="cursor-pointer"
        />
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy>
            <q-time v-model="dueTimeValue" @update:model-value="$emit('update:dueTime', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  dueTime: {
    required: false,
    default: null,
  },
});

const emit = defineEmits(["update:dueTime"]);

const dueTimeValue = ref();

onMounted(() => {
  dueTimeValue.value = props.dueTime;
});

watch(props, () => {
  if (dueTimeValue.value != props.dueTime) dueTimeValue.value = props.dueTime;
});
</script>
