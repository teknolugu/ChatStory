<template>
  <p class="w-full p-1 my-4 text-sm text-center" :style="convertToCss(style.annotation)">
    {{ data.text }}
  </p>
</template>
<script>
import { convertToCss } from '@/utils/helper';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    style: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {
      convertToCss,
    };
  },
};
</script>
