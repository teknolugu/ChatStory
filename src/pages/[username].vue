<template>
  <div class="flex">
    <div class="grid grid-cols-3 gap-4 flex-1">
      <ui-card v-for="i in 20" :key="i">
        <div
          style="background-image: url('https://picsum.photos/500')"
          class="h-36 bg-center bg-cover bg-no-repeat rounded-xl w-full mb-2"
        ></div>
        <h4 class="text-lg font-semibold text-overflow">My Story</h4>
        <div class="mt-2">
          <img src="https://picsum.photos/500" class="h-8 w-8 rounded-full inline-block" />
          <p class="inline-block ml-2">Username</p>
        </div>
      </ui-card>
    </div>
    <div class="w-80 ml-4 flex items-center flex-col">
      <img src="https://picsum.photos/500" class="h-20 w-20" />
      <p class="mt-4">username</p>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import Story from '@/models/story';

export default {
  setup() {},
};
</script>
