<template>
  <aside class="bg-white h-full w-72 p-5 overflow-auto scroll">
    <div class="flex items-center space-x-4 justify-between mb-2">
      <h4 class="text-xl">Blocks</h4>
    </div>
    <ui-input v-model="searchQuery" placeholder="Search blocks..." class="flex-1">
      <template #prepend>
        <ui-icon name="search"></ui-icon>
      </template>
    </ui-input>
    <div class="nodes mt-6 gap-2 grid grid-cols-2">
      <div
        v-for="node in nodes"
        :key="node.id"
        :data-node="node.id"
        style="cursor: grab"
        draggable="true"
        class="py-5 hover:bg-gray-100 rounded-xl select-none transition text-center bg-gray-50"
        @dragstart="dragHandler"
      >
        <ui-icon size="30" :class="node.textColor" :name="node.icon"></ui-icon>
        <p class="mt-2">{{ node.title }}</p>
      </div>
    </div>
  </aside>
</template>
<script>
import { ref, computed } from 'vue';
import { nodes as nodesObj } from '@/utils/shared';

export default {
  setup() {
    const nodesArry = Object.keys(nodesObj).map((id) => {
      const { icon, title, description, textColor } = nodesObj[id];

      return {
        id,
        icon,
        title,
        description,
        textColor,
      };
    });

    const searchQuery = ref('');
    const nodes = computed(() => {
      return nodesArry.filter(
        ({ title, id }) =>
          title.toLowerCase().includes(searchQuery.value.toLowerCase()) && id !== 'start'
      );
    });

    function dragHandler({ dataTransfer, target }) {
      dataTransfer.setData('node', target.dataset.node);
    }

    return {
      nodes,
      dragHandler,
      searchQuery,
    };
  },
};
</script>
