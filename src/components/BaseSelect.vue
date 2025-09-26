<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array, default: () => [] }, // [{ label: '', value: '' }]
  modelValue: [String, Number, null],
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'change']);

const selected = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    selected.value = val;
  }
);

watch(selected, (val) => {
  emit('update:modelValue', val);
  emit('change', val);
});
</script>

<template>
  <div class="flex flex-col gap-1 mb-4">
    <label class="text-sm font-medium text-body">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <select
      class="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-primary text-sm placeholder:text-gray-400 placeholder:text-xs cursor-pointer disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-default"
      :value="selected" :disabled="disabled" @change="(event) => selected = event.target.value">
      <option value="" disabled selected>{{ label }} নির্বাচন করুন</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <p v-if="error" class="text-xs text-danger">{{ error[0] }}</p>
  </div>
</template>
