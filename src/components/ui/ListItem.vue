<template>
  <component
    :is="tag"
    class="ui-list-item rounded-xl flex items-center p-2 transition w-full focus:outline-none"
    role="listitem"
    :class="[
      active ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100 focus:bg-gray-100',
      { 'pointer-events-none bg-opacity-75': disabled },
    ]"
  >
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    active: Boolean,
    disabled: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
  },
};
</script>
