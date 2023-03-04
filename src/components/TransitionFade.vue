<template>
  <Transition
    mode="out-in"
    :enter-active-class="`duration-${duration ? duration : 200} ease-out`"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    :leave-active-class="`duration-${duration ? duration : 200} ease-in`"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  duration?: 200 | 300 | 500
}>()
</script>

<style scoped></style>
