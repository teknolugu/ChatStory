<template>
  <div class="p-5 flex items-center h-full justify-center" style="height: 100px">
    <div
      class="p-2 bg-gradient-to-br text-white rounded-xl inline-block"
      :class="node.colorGradient"
    >
      <ui-icon :name="node.icon" size="32"></ui-icon>
    </div>
    <p class="text-xl ml-4">Start</p>
  </div>
</template>
<script>
import { nodes } from '@/utils/shared';
import UiIcon from '../ui/Icon.vue';

export default {
  components: { UiIcon },
  setup() {
    return {
      node: nodes.start,
    };
  },
};
</script>
