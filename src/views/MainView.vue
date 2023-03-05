<script setup lang="ts">
import { Viewer } from '@speckle/viewer'
import { nextTick, onMounted, ref } from 'vue'
import Drag from '@/components/Drop.vue'
import { useScroll } from '@vueuse/core'
import { useRouter } from 'vue-router'
import Card from '@/components/Card.vue'
import { useStorage } from '@vueuse/core'
import Views from '@/components/Views.vue'

let viewer: Viewer
let views

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
const url = 'https://speckle.pwdevs.net/streams/0352f71391/objects/450bd6e3155ea03891df70766626625f'
onMounted(async () => {
  viewer = new Viewer(container.value, params)
  viewer.toggleCameraProjection()
  viewer.sectionBoxOn()
  viewer.setLightConfiguration(lightConfig)
  viewer.applyFilter(filter)
  await viewer.init()
  await viewer.loadObject(url, token)
  await viewer.loadObject(
    'https://speckle.pwdevs.net/streams/0352f71391/objects/0a4e807fe473808cc2ab3b3fb4b7eda5',
    token
  )
  viewer.hideObjects(['4d6113c8bd1dcd816dc1aede4a57131e'])
  viewer.zoom()
  views = viewer.getViews()

  const dataTree = viewer.getDataTree()

  const objects = dataTree.findAll((guid, obj) => {
    const boolRoom = obj.speckle_type != 'Objects.BuiltElements.Room'
    const boolWalls = obj.type != 'Generic - 300mm'
    const bool = boolRoom && boolWalls

    return bool
  })

  const ids = objects.map((o) => o.id) as string[]

  viewer.isolateObjects(ids, undefined, undefined, true)
})
const images = ref([])
function updateImages(img: any[]) {
  img.forEach((i) => images.value.push(i))

  localStorage.setItem('img', img[0])

  nextTick(() => {
    y.value += 2000
  })
}

function toProjects() {
  console.log('click')
  router.push('/project')
}

function changeView(index: number) {
  viewer.setView(views[index])
}
</script>

<template>
  <main
    class="flex background scroll-smooth w-screen h-screen 2xl:px-96 pt-24 absolute overflow-auto"
    ref="el"
  >
    <div class="relative flex-col w-full h-auto flex items-center">
      <h1 class="text-4xl font-bold text-white pb-8">AI.sthetic</h1>
      <Views @change="changeView" />
      <div class="w-full px-2">
        <div class="h-[27rem] justify-center relative w-full flex items-center">
          <div class="w-full h-full absolute inset-0" ref="container" />
        </div>
        <div class="flex w-full z-30 space-x-2 px-32">
          <Drag @update="updateImages" />
        </div>
        <div class="gap-4 pt-20 pb-10 grid grid-cols-3">
          <div v-for="img in images" :key="img">
            <Card :src="img" class="hover:scale-105 transition" @click="toProjects" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

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
</style>
