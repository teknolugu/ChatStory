<template>
  <div ref="root" class="p-5">
    <div class="flex items-center text-primary">
      <ui-icon :name="node.icon"></ui-icon>
      <p class="ml-2">Option</p>
    </div>
    <div class="flex items-center mt-4 space-x-2">
      <input
        v-model="text"
        type="text"
        class="border-gray-200 rounded-xl w-44"
        placeholder="Option name"
      />
      <ui-button icon class="text-red-500" @click="deleteNode">
        <ui-icon name="trash"></ui-icon>
      </ui-button>
    </div>
  </div>
</template>
<script>
import { nextTick, ref, computed } from 'vue';
import { nodes } from '@/utils/shared';
import Node from '@/models/node';
import UiIcon from '../ui/Icon.vue';
import UiButton from '../ui/Button.vue';

export default {
  components: { UiIcon, UiButton },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const root = ref(null);
    const nodeId = ref('');

    const text = computed({
      get() {
        const node = Node.find(nodeId.value);

        if (!node) return '';

        return node.data.text;
      },
      set(value) {
        Node.update({
          where: nodeId.value,
          data: {
            data: {
              text: value,
            },
          },
        });
      },
    });

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
      deleteNode,
      node: nodes.option,
    };
  },
};
</script>
