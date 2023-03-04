<script setup lang="ts">
import { Viewer } from '@speckle/viewer'
import { onMounted, ref } from 'vue'
import Drag from '@/components/Drop.vue'
import TransitionFade from './components/TransitionFade.vue'
import Card from './components/Card.vue'

const container = ref(null)
const params = {
  showStats: false,
  environmentSrc: null,
  verbose: true
}

type FilteringState = {
  selectedObjects?: string[]
  hiddenObjects?: string[]
  isolatedObjects?: string[]
  colorGroups?: Record<string, string>[]
  activePropFilterKey?: string
}

interface LightConfiguration {
  enabled?: boolean
  castShadow?: boolean
  intensity?: number
  color?: number
  indirectLightIntensity?: number
}

const lightConfig: LightConfiguration = {
  enabled: true,
  castShadow: false
}

const filter: FilteringState = {
  activePropFilterKey: 'test'
}
const token = 'bed58b06ea8748298232ffe7920f156d82da859484'
const url = 'https://speckle.pwdevs.net/streams/0352f71391/objects/0d9cc32c3e546dd50b48655294a1e558'
onMounted(async () => {
  const viewer = new Viewer(container.value, params)
  viewer.toggleCameraProjection()
  // viewer.sectionBoxOn()
  viewer.setLightConfiguration(lightConfig)
  viewer.applyFilter(filter)
  await viewer.init()
  await viewer.loadObject(url, token)
  viewer.hideObjects(['4d6113c8bd1dcd816dc1aede4a57131e'])
  viewer.zoom()
  const views = viewer.getViews()

  // viewer.setView(views[0])
})
const images = ref([])
function updateImages(img: Image[]) {
  img.forEach((i) => images.value.push(i))
}
</script>

<template>
  <main
    class="flex justify-center items-center bg-orange-50 w-full h-full 2xl:p-96 absolute overflow-auto"
  >
    <div class="relative flex-col w-full h-auto flex justify-center items-center">
      <h1 className="text-3xl font-bold text-orange-700">AI.sthetic</h1>
      <div class="w-full px-24">
        <div class="h-[32rem] justify-center relative w-full flex items-center">
          <div class="w-full h-full absolute inset-0" ref="container" />
        </div>
        <div class="flex w-full z-30 space-x-2 px-32">
          <!-- <input
            type="text"
            class="w-full w-grow h-10 rounded-md text-sm pl-3"
            placeholder="Describe the image you want to create..."
          />
          <button
            type="button"
            class="rounded flex-none w-20 h-10 bg-orange-700 py-1 px-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Go
          </button> -->
          <Drag @update="updateImages" />
        </div>
        <div class="gap-4 pt-20 mb-10 grid grid-cols-3">
          <div v-for="img in images" :key="img">
            <Card :src="img" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
