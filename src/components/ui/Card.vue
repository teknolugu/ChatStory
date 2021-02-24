<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="bg-white p-5 transform rounded-xl transition ui-card"
    :class="{ 'hover:shadow-xl hover:-translate-y-1': hover }"
  >
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    hover: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
};
</script>
