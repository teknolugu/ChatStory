<template>
  <div
    class="ui-tab h-12 w-full px-4 border-b-4 cursor-pointer border-transparent hover:border-primary transition"
    :class="[value === uiTabs.active.value ? 'border-primary' : 'text-gray-500']"
    @click="uiTabs.changeActive(value)"
  >
    <div class="flex items-center h-full w-full justify-center">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';

export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  setup() {
    const uiTabs = inject('ui-tabs', {});

    return {
      uiTabs,
    };
  },
};
</script>
