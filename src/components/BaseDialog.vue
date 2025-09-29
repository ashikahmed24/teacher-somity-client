<script setup>
const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, default: '' },
  size: { type: String, default: 'max-w-lg' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="show" class="fixed flex items-center justify-center inset-0 bg-transparent z-50 overflow-y-auto">
    <div :class="`bg-white rounded-xl shadow-2xl w-full relative ${size}`">
      <div class="flex justify-between items-center border-b border-border p-4">
        <h2 class="text-dark text-lg font-semibold">{{ title }}</h2>
        <button @click="emit('close')"
          class="bg-danger text-white p-0.5 rounded-full hover:text-opacity-90 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="space-y-4 p-4">
        <slot />
      </div>
      <div class="flex justify-end gap-2 p-4">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
