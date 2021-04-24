<template>
  <div class="flex items-center justify-center" style="height: calc(100vh - 4rem)">
    <div class="content text-center">
      <img :src="notFoundSvg" class="w-72" alt="not found image" />
      <h2 class="text-3xl font-semibold mt-6 mb-2">Page Not Found</h2>
      <p class="text-gray-600">Can't find the page that you looking for</p>
      <ui-button tag="router-link" to="/" class="mt-8 w-52" variant="primary">Go Home</ui-button>
    </div>
  </div>
</template>
<script>
import notFoundSvg from '../assets/svg/404.svg';
import { useHead } from '@vueuse/head';

export default {
  setup() {
    useHead({
      title: 'Page Not Found',
    });

    return {
      notFoundSvg,
    };
  },
};
</script>
