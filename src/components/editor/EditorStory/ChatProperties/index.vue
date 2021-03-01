<template>
  <transition-slide direction="right">
    <div
      v-if="state.show"
      class="absolute h-full w-80 right-0 bg-white top-0 z-20 scroll flex flex-col"
    >
      <div class="flex justify-between items-center mb-2 pt-5 px-5">
        <p class="text-xl">Chats</p>
        <ui-icon name="x" class="cursor-pointer" @click="close"></ui-icon>
      </div>
      <draggable
        v-model="chats"
        item-key="id"
        class="space-y-4 flex-1 overflow-auto p-5 scroll"
        handle="#handle"
      >
        <template #item="{ element, index }">
          <chat-list
            v-bind="{ chat: element, characters, index, nodeId: state.nodeId, chats }"
            @update="updateNodeData('chats', $event)"
          ></chat-list>
        </template>
      </draggable>
      <add-chat class="px-5 pb-5" v-bind="{ characters, node: nodeData }"></add-chat>
    </div>
  </transition-slide>
</template>
<script>
import { computed, shallowReactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import emitter from 'tiny-emitter/instance';
import Draggable from 'vuedraggable';
import Character from '@/models/character';
import Node from '@/models/node';
import AddChat from './AddChat.vue';
import ChatList from './ChatList.vue';

export default {
  components: { AddChat, ChatList, Draggable },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute();

    const state = shallowReactive({
      show: false,
      nodeId: '',
    });

    const characters = computed(() => {
      return Character.query().where('storyId', route.params.storyid).get();
    });
    const nodeData = computed(() => {
      return Node.find(state.nodeId);
    });
    const chats = computed({
      get() {
        return nodeData.value.data.chats;
      },
      set(value) {
        updateNodeData('chats', value);
      },
    });

    function updateNodeData(key, value) {
      Node.update({
        where: state.nodeId,
        data: {
          data: {
            ...nodeData.value.data,
            [key]: value,
          },
        },
      });
    }
    function close() {
      state.nodeId = '';
      state.show = false;
    }

    emitter.on('init-property', (nodeId, show = true) => {
      state.show = show;
      state.nodeId = nodeId;
    });

    watch(nodeData, () => {
      if (!nodeData.value) close();
    });

    return {
      chats,
      state,
      close,
      nodeData,
      characters,
      updateNodeData,
    };
  },
};
</script>
