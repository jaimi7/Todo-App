<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      v-model="nameValue"
      ref="nameRef"
      @update:model-value="emit('update:name', nameValue)"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      label="Task name"
      class="col"
    >
      <template v-slot:append>
        <q-icon
          v-if="nameValue && !isDisable"
          @click="nameValue=null,$emit('update:name', '')"
          name="close"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  name: {
    required: false,
    default: null,
  },
});

const emit = defineEmits(["update:name", "disableBtn"]);

const nameValue = ref();
const nameRef = ref();

const isDisable = computed(() => nameRef.value?.hasError);

onMounted(() => {
  nameValue.value = props.name;
});

watch(props, () => {
  if (nameValue.value != props.name) nameValue.value = props.name;
});

watch(isDisable, () => {
  emit("disableBtn", isDisable.value);
});
</script>
