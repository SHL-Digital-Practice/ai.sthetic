<template>
  <TransitionFade>
    <div class="bg-white rounded-lg shadow-sm cursor-pointer">
      <img class="w-full h-56 object-cover rounded-lg" :src="src" />
      <div class="h-16 p-2">
        <p class="pt-2 text-xs text-gray-500">Daylight</p>
        <span>
          <h2 class="text-gray-500 text-sm">SDA: 50%</h2>
        </span>
      </div>
    </div>
  </TransitionFade>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TransitionFade from './TransitionFade.vue'

const props = defineProps(['src'])
</script>

<style scoped></style>
