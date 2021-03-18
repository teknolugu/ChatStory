<template>
  <div ref="root" class="p-5 w-60">
    <div class="flex mb-4 items-center text-primary">
      <ui-icon name="chat-alt2"></ui-icon>
      <span class="ml-2">Chats</span>
    </div>
    <div class="chats space-y-2">
      <div v-for="chat in chats" :key="chat.id" class="flex items-start">
        <img :src="chat.character.profileUrl" class="h-8 w-8 rounded-full" />
        <div class="ml-2 border-b pb-2 w-10/12">
          <div class="bg-gray-50 rounded-xl px-4 py-2">
            <p class="text-overflow w-10/12">{{ chat.character.name }}</p>
            <p class="leading-tight line-clamp mt-1 text-gray-500">
              {{ chat.message }}
            </p>
          </div>
          <img v-if="chat.imageUrl" :src="chat.imageUrl" class="max-w-full mt-2 rounded-xl" />
        </div>
      </div>
    </div>
    <div class="flex items-center mt-6">
      <ui-button class="flex-1 mr-2" @click="editChat">
        <ui-icon size="20" name="pencil" class="mr-2 -ml-1"></ui-icon>
        <span>Edit</span>
      </ui-button>
      <ui-button icon>
        <ui-icon
          name="trash"
          class="text-red-500 cursor-pointer"
          content="Delete"
          @click="deleteNode"
        ></ui-icon>
      </ui-button>
    </div>
  </div>
</template>
<script>
import { nextTick, ref, computed, watch, isReactive } from 'vue';
import emitter from 'tiny-emitter/instance';
import Node from '@/models/node';
import Character from '@/models/character';
import UiButton from '../ui/Button.vue';
import UiIcon from '../ui/Icon.vue';

export default {
  components: { UiButton, UiIcon },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const nodeId = ref('');
    const root = ref(null);

    const chats = computed(() => {
      const node = Node.find(nodeId.value);

      if (!node) return [];

      const chatsData = node.data.chats;
      const chatsWithCharacters = chatsData.map((chat) => {
        const character = Character.find(chat.characterId) || {};

        return { ...chat, character };
      });

      return chatsWithCharacters.slice(0, 2);
    });

    function editChat() {
      if (!nodeId.value) return;

      emitter.emit('init-property', nodeId.value);
    }
    function deleteNode() {
      try {
        props.editor.removeNodeId(`node-${nodeId.value}`);
      } catch (error) {
        // Do nothing
      }
    }

    nextTick(() => {
      const id = root.value?.parentElement.parentElement.id.slice(5);

      if (!id) return;

      nodeId.value = id;
    });

    return {
      root,
      chats,
      editChat,
      deleteNode,
    };
  },
};
</script>
