<template>
  <div class="flex items-start">
    <ui-icon
      id="handle"
      name="draggabledots"
      style="cursor: grab"
      view-box="0 0 24 24"
      class="text-gray-500"
    ></ui-icon>
    <img :src="character.profileUrl" class="h-8 ml-2 w-8 rounded-full" />
    <div class="ml-2 border-b pb-4 w-10/12">
      <div class="bg-gray-50 rounded-xl px-4 py-2">
        <div class="flex items-center w-full">
          <template v-if="isEditing">
            <select v-model="tempData.characterId" class="p-0 bg-transparent border-none w-full">
              <option v-for="character in characters" :key="character.id" :value="character.id">
                {{ character.name }}
              </option>
            </select>
            <ui-icon name="x" size="20" class="cursor-pointer" @click="isEditing = false"></ui-icon>
          </template>
          <template v-else>
            <p class="text-overflow w-10/12">{{ character.name }}</p>
            <ui-icon
              name="trash"
              size="20"
              class="text-red-500 cursor-pointer mr-2"
              @click="updateNode('delete')"
            ></ui-icon>
            <ui-icon
              name="pencil"
              size="20"
              class="text-gray-600 cursor-pointer"
              @click="isEditing = true"
            ></ui-icon>
          </template>
        </div>
        <textarea
          v-if="isEditing"
          v-model="tempData.message"
          class="resize-none p-0 bg-transparent text-gray-500 border-none h-16"
          placeholder="Message here"
        ></textarea>
        <p v-else class="leading-tight line-clamp mt-1 text-gray-500">
          {{ chat.message }}
        </p>
      </div>
      <ui-input
        v-if="isEditing"
        v-model="tempData.imageUrl"
        class="mb-2"
        label="Image URL"
        placeholder="https://example.com/image.png"
      ></ui-input>
      <img v-if="chat.imageUrl" :src="chat.imageUrl" class="max-w-full mt-2 rounded-xl" />
    </div>
  </div>
</template>
<script>
import { ref, onMounted, watch, computed } from 'vue';
import debounce from '@/utils/debounce';
import Node from '@/models/node';

export default {
  props: {
    chat: {
      type: Object,
      default: () => ({}),
    },
    characters: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: [Number, String],
      default: 0,
    },
    nodeId: String,
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const tempData = ref({});

    const character = computed(() =>
      props.characters.find(({ id }) => props.chat.characterId === id)
    );

    function updateNode(type) {
      const node = Node.find(props.nodeId)?.data || {};

      if (type === 'delete') {
        const index = node.chats.findIndex(({ id }) => id === props.chat.id);

        if (index === -1) return;

        node.chats.splice(index, 1);
      } else if (type === 'update') {
        node.chats[props.index] = tempData.value;
      }

      emit('update', node.chats);
    }

    watch(
      () => tempData,
      debounce(() => {
        updateNode('update');
      }, 500),
      { deep: true }
    );

    onMounted(() => {
      tempData.value = props.chat;
    });

    return {
      tempData,
      isEditing,
      character,
      updateNode,
    };
  },
};
</script>
