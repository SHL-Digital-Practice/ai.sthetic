<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    <button
      @click="emit('change', 1)"
      type="button"
      class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      View 1
    </button>
    <button
      @click="emit('change', 2)"
      type="button"
      class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      View 2
    </button>
    <button
      @click="emit('change', 3)"
      type="button"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      View 3
    </button>
  </span>
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])
</script>

<style scoped></style>
