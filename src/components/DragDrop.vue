<template>
 <div
        class="w-full bg-white rounded-md h-32 border-dashed border-2 border-spacing-10 flex items-center justify-center flex-col"
    >
        <CubeIcon class="w-9 text-gray-400" />
        <p class="font-medium flex flex-col items-center">
        <p>
        <span class="text-orange-700"> Upload a 3D model </span>
            or drag and drop
        </p>
        <span class="text-gray-300 font-normal">PNG, JPG</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { CubeIcon } from '@heroicons/vue/24/outline';

function dropHandler(ev) {
  console.log('File(s) dropped')

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault()

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    ;[...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile()
        console.log(`… file[${i}].name = ${file.name}`)
      }
    })
  } else {
    // Use DataTransfer interface to access the file(s)
    ;[...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`)
    })
  }
}
</script>

<style scoped></style>
