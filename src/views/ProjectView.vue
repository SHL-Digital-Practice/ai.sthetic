<template>
  <div class="background w-screen h-screen flex absolute">
    <div class="w-full h-full justify-center items-center flex">
      <div class="gap-4 grid lg:grid-cols-3">
        <div class="container">
          <img class="h-3/4" :src="url" />
          <div class="p-2">
            <p class="pt-2 text-xs text-gray-500">Daylight</p>
            <span class="flex items-center">
              <h2 class="text-gray-500 text-sm">SDA:</h2>
              <h2 class="font-semibold pl-2">17%</h2>
            </span>
          </div>
        </div>
        <div
          :class="[isLoaded ? 'css-selector rounded-lg border-2 border-white' : 'container']"
          ref="container1"
        />
        <div
          :class="[isLoaded ? 'css-selector rounded-lg border-2 border-white' : 'container']"
          ref="container2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'
import { Viewer } from '@speckle/viewer'
import { useStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import ViewerFactory from '../ViewerFactory'

const url = useStorage('img', 'url', localStorage)
const container1 = ref(null)
const container2 = ref(null)
const isLoaded = ref(false)

const token = 'bed58b06ea8748298232ffe7920f156d82da859484'
const streamUrl1 =
  'https://speckle.pwdevs.net/streams/0352f71391/objects/450bd6e3155ea03891df70766626625f'
const streamUrl2 =
  'https://speckle.pwdevs.net/streams/0352f71391/objects/f58ec7c6367401d1ffc8ceebf33625ce'

onMounted(async () => {
  const viewer1 = ViewerFactory.create(streamUrl1, container1.value)
  const viewer2 = ViewerFactory.create(streamUrl2, container2.value)
  const done = await Promise.all([viewer1, viewer2])
  isLoaded.value = true
})
</script>
<style scoped>
.background {
  background: rgb(144, 155, 255);
  background: linear-gradient(
    144deg,
    rgba(144, 155, 255, 1) 0%,
    rgba(228, 212, 237, 1) 37%,
    rgba(255, 207, 166, 1) 100%
  );
}
.container {
  @apply w-96 h-96 bg-white rounded-lg shadow-md;
}

.css-selector {
  background: linear-gradient(216deg, #909bff, #e4d4ed, #ffcfa6);
  background-size: 600% 600%;

  -webkit-animation: AnimationName 2s ease infinite;
  -moz-animation: AnimationName 2s ease infinite;
  animation: AnimationName 2s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
</style>
