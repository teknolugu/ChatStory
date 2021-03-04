<template>
  <div class="expansion-panel border-t" :aria-expanded="expand">
    <button
      class="flex items-center py-2 px-4 w-full focus:outline-none focus:ring rounded-xl"
      @click="expand = !expand"
    >
      <slot name="header"></slot>
      <div class="ml-auto text-gray-600">
        <ui-icon
          name="chevron-right"
          class="transition transform"
          :class="[expand ? '-rotate-90' : 'rotate-90']"
        ></ui-icon>
      </div>
    </button>
    <transition-expand>
      <div class="px-4 py-2" v-if="expand">
        <slot></slot>
      </div>
    </transition-expand>
  </div>
</template>
<script>
import { ref, watch } from 'vue';

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const expand = ref(false);

    watch(() => props.show, (value) => {
      expand.value = value;
    }, { immeadiate: true });

    return {
      expand,
    };
  },
};
</script>
