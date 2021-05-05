<template>
  <div ref="root" class="p-5 w-60">
    <div class="flex mb-4 items-center text-indigo-500">
      <ui-icon :name="node.icon"></ui-icon>
      <span class="ml-2">End</span>
      <div class="flex-grow"></div>
      <ui-icon name="trash" class="text-red-500 cursor-pointer" @click="deleteNode"></ui-icon>
    </div>
    <div class="mt-4">
      <ui-textarea
        height="120px"
        :model-value="text"
        max="512"
        show-detail
        placeholder="Message"
        @change="updateText"
      ></ui-textarea>
    </div>
  </div>
</template>
<script>
import { ref, nextTick, computed } from 'vue';
import Node from '@/models/node';
import { nodes } from '@/utils/shared';
import UiIcon from '../ui/Icon.vue';
import UiTextarea from '../ui/Textarea.vue';

export default {
  components: { UiIcon, UiTextarea },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const root = ref(null);
    const nodeId = ref('');

    const text = computed(() => {
      const node = Node.find(nodeId.value);

      if (!node) return '';

      return node.data?.text ?? '';
    });

    function updateText(text) {
      Node.update({
        where: nodeId.value,
        data: {
          data: { text },
        },
      });
    }
    function deleteNode() {
      props.editor.removeNodeId(`node-${nodeId.value}`);
    }

    nextTick(() => {
      const id = root.value?.parentElement.parentElement.id.slice(5);

      if (!id) return;

      nodeId.value = id;
    });

    return {
      root,
      text,
      updateText,
      deleteNode,
      node: nodes.end,
    };
  },
};
</script>
