<template>
  <div ref="root" class="p-5 w-60">
    <div class="flex items-center text-primary">
      <ui-icon :name="optionNode.icon"></ui-icon>
      <p class="ml-2">{{ optionNode.title }}</p>
    </div>
    <div class="mt-4 space-y-2">
      <div v-for="(option, index) in options" :key="index" class="flex items-center space-x-2">
        <button
          v-if="options.length !== 1"
          title="Delete option"
          @click="updateOption('delete', index)"
        >
          <ui-icon name="trash" class="text-red-500 cursor-pointer"></ui-icon>
        </button>
        <ui-input
          :model-value="option"
          placeholder="Option..."
          class="flex-1"
          @blur="updateOption('updateValue', index, $event)"
        ></ui-input>
      </div>
    </div>
    <div class="flex mt-6 items-center space-x-2">
      <ui-button class="flex-1" :disabled="options.length >= 3" @click="addOption">
        <ui-icon name="plus" class="-ml-2 mr-1"></ui-icon>
        Add option
      </ui-button>
      <ui-button icon class="text-red-500" @click="deleteNode">
        <ui-icon name="trash"></ui-icon>
      </ui-button>
    </div>
  </div>
</template>
<script>
import { nextTick, ref, computed } from 'vue';
import { nanoid } from 'nanoid';
import { nodes } from '@/utils/shared';
import Node from '@/models/node';
import UiIcon from '../ui/Icon.vue';
import UiButton from '../ui/Button.vue';
import UiInput from '../ui/Input.vue';

export default {
  components: { UiIcon, UiButton, UiInput },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const optionNode = nodes.option;

    const root = ref(null);
    const nodeId = ref('');

    const options = computed(() => {
      const node = Node.find(nodeId.value);

      if (!node) return [''];

      return node.data.options;
    });

    function deleteNode() {
      props.editor.removeNodeId(`node-${nodeId.value}`);
    }
    function addOption() {
      if (options.value.length >= 3) return;

      const newData = [...options.value, ''];

      Node.update({
        where: nodeId.value,
        data: {
          data: {
            options: newData,
          },
        },
      }).then(() => {
        props.editor.addNodeOutput(nodeId.value);
      });
    }
    function updateOption(type, index, event) {
      const copyOptions = [...options.value];

      if (type === 'updateValue') {
        copyOptions[index] = event.target.value;
      } else if (type === 'delete') {
        copyOptions.splice(index, 1);
        props.editor.removeNodeOutput(nodeId.value, `output_${index + 1}`);
      }

      Node.update({
        where: nodeId.value,
        data: {
          data: {
            options: copyOptions,
          },
        },
      });
    }

    nextTick(() => {
      const id = root.value?.parentElement.parentElement.id.slice(5);

      if (!id) return;

      nodeId.value = id;
    });

    return {
      root,
      options,
      addOption,
      deleteNode,
      optionNode,
      updateOption,
    };
  },
};
</script>
