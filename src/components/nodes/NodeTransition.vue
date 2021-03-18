<template>
  <div ref="root" class="p-5 w-60">
    <div class="flex items-center text-primary mb-4">
      <ui-icon :name="node.icon"></ui-icon>
      <p class="ml-2">{{ node.title }}</p>
    </div>
    <ui-select class="w-full" placeholder="Select Transition"></ui-select>
    <div class="preview mt-2">
      <p class="text-gray-600">Preview</p>
      <div class="bg-gray-100 rounded-xl w-full h-32"></div>
    </div>
  </div>
</template>
<script>
import { nodes } from '@/utils/shared';
import UiIcon from '../ui/Icon.vue';
import UiSelect from '../ui/Select.vue';

export default {
  components: { UiIcon, UiSelect },
  setup() {
    return {
      node: nodes.transition,
    };
  },
};
</script>
