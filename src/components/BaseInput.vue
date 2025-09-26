<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  name: String,
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: [String, Array], default: '' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const computedPlaceholder = computed(() => props.placeholder || props.label)
</script>

<template>
  <div class="mb-4">
    <!-- Label -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <!-- Input -->
    <input :type="type" :id="id" :name="name" :value="modelValue" :placeholder="computedPlaceholder"
      :disabled="disabled" :autocomplete="autocomplete" @input="updateValue"
      class="w-full px-4 py-2 text-sm rounded-lg border transition-colors duration-200 focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
      :class="error ? 'border-red-500 ring-red-100' : 'border-gray-300'" />

    <!-- Error message -->
    <p v-if="error" class="text-red-500 text-xs mt-1">
      {{ Array.isArray(error) ? error[0] : error }}
    </p>
  </div>
</template>
