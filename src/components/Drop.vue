<template>
  <div ref="dropZoneRef" class="w-full bg-white rounded-md h-32 border-dashed border-2 border-spacing-10 flex items-center justify-center flex-col">
    <CubeIcon class="w-9 text-gray-400" />
    <p class="font-medium flex flex-col items-center">
    <p>
    <span class="text-orange-700"> Upload an image </span>
        or drag and drop
    </p>
    <span class="text-gray-300 font-normal">PNG, JPG</span>
    </p>

  </div>
</template>

<script setup lang="ts">
import { CubeIcon } from '@heroicons/vue/24/outline';
import { useDropZone } from '@vueuse/core'
import { ref } from 'vue';

const emit = defineEmits(['update'])

const dropZoneRef = ref<HTMLDivElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
const fileReader = new FileReader();

async function onDrop(files: File[] | null) {
  files.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  
  
  const promises = files?.map( (f) => {

    return blobToBase64(f)
    
  })

 const images =  await Promise.all(promises)
  emit('update', images)
}

let blobToBase64 = function(blob) {


  return new Promise( resolve=>{
    let reader = new FileReader();
    reader.onload = function() {
      let dataUrl = reader.result;
      resolve(dataUrl);
    };
    reader.readAsDataURL(blob);
  });
}

</script>
<style scoped></style>
