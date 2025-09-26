<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  label: String,

  modelValue: String,
  name: String,
  placeholder: String,
  rows: {
    type: Number,
    default: 4
  },
  error: String,
  required: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:modelValue'])
const inputId = computed(() => props.id || `textarea-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div class="mb-4">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <textarea :id="inputId" :name="name" :rows="rows" :placeholder="placeholder"
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm placeholder:text-left"
      :class="{
        'border-danger ring-red-100': error,
        'border-gray-300': !error
      }" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>


    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error[0] }}
    </p>
  </div>
</template>

<style scoped></style>
