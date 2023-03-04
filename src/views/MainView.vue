<script setup lang="ts">
import { Viewer } from '@speckle/viewer'
import { nextTick, onMounted, ref } from 'vue'
import Drag from '@/components/Drop.vue'
import { useScroll } from '@vueuse/core'
import { useRouter } from 'vue-router'
import Card from '@/components/Card.vue'

const el = ref<HTMLElement | null>(null)
const { x, y } = useScroll(el)
const router = useRouter()

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

  nextTick(() => {
    y.value += 2000
  })
}

function goToFacade() {
  console.log('click')
  router.push('/project')
}
</script>

<template>
  <main
    class="flex bg-orange-50 scroll-smooth w-screen h-screen 2xl:px-96 pt-24 absolute overflow-auto"
    ref="el"
  >
    <div class="relative flex-col w-full h-auto flex items-center">
      <h1 className="text-3xl font-bold text-orange-700">AI.sthetic</h1>
      <div class="w-full px-24">
        <div class="h-[30rem] justify-center relative w-full flex items-center">
          <div class="w-full h-full absolute inset-0" ref="container" />
        </div>
        <div class="flex w-full z-30 space-x-2 px-32">
          <Drag @update="updateImages" />
        </div>
        <div class="gap-4 pt-20 pb-10 grid grid-cols-3">
          <div v-for="img in images" :key="img">
            <Card :src="img" class="hover:scale-105 transition" @click="goToFacade" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
