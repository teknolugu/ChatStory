<template>
  <div class="bg-gray-100 rounded-xl overflow-hidden h-3 flex-1">
    <div class="w-32 rounded-xl h-full" :class="[color]" :style="{ width: `${value}%` }"></div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'bg-primary',
    },
  },
};
</script>
