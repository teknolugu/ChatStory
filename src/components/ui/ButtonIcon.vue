<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="p-2 rounded-xl transition"
    role="button"
    :class="[
      solid ? 'bg-gray-100 hover:bg-gray-50 focus:bg-gray-50' : 'focus:bg-gray-50 hover:bg-gray-50',
    ]"
  >
    <ui-icon v-bind="{ name: icon }"></ui-icon>
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    icon: {
      type: String,
      default: '',
    },
    solid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
