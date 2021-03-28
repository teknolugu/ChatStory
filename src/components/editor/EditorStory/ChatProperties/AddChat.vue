<template>
  <div class="w-full">
    <button
      class="w-full flex text-left py-2 justify-between focus:outline-none"
      @click="show = !show"
    >
      <p>Add Chat</p>
      <ui-icon
        name="chevron-right"
        class="transform transition"
        :class="[show ? 'rotate-90' : '-rotate-90']"
      ></ui-icon>
    </button>
    <transition-expand>
      <div v-if="show" class="mt-2">
        <div class="bg-gray-100 rounded-xl mb-2 py-2 px-4">
          <textarea
            v-model="newChat.message"
            class="border-none w-full text-base p-0 focus:ring-0 bg-transparent scroll resize-none"
            placeholder="Message here..."
          ></textarea>
          <div
            v-if="newChat.imageUrl"
            class="space-x-2 border-gray-200 pt-2 mt-2 border-t border-gray-200"
          >
            <div
              class="h-12 inline-block w-12 rounded-xl bg-cover bg-center bg-no-repeat"
              :style="{ 'background-image': `url(${newChat.imageUrl})` }"
            ></div>
          </div>
        </div>
        <div class="flex items-center">
          <ui-popover placement="bottom">
            <template #trigger>
              <ui-button id="add-image" icon class="mr-2 text-gray-600">
                <ui-icon name="photograph"></ui-icon>
              </ui-button>
            </template>
            <ui-input
              :model-value="newChat.imageUrl"
              label="Image URL"
              class="w-56"
              placeholder="https://example.com/image.png"
              @update:model-value="updateImageUrl"
            ></ui-input>
          </ui-popover>
          <ui-select v-model="newChat.characterId" class="flex-1 mr-8" placeholder="Character">
            <option v-for="character in characters" :key="character.id" :value="character.id">
              {{ character.name }}
            </option>
          </ui-select>
          <ui-button variant="primary" icon :disabled="v$.$invalid" @click="addChat">
            <ui-icon name="paper-airplane" class="rotate-45 transform"></ui-icon>
          </ui-button>
        </div>
      </div>
    </transition-expand>
  </div>
</template>
<script>
import { shallowReactive, computed, shallowRef } from 'vue';
import { url, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { nanoid } from 'nanoid';
import Node from '@/models/node';
import { debounce } from '@/utils/helper';

export default {
  props: {
    characters: {
      type: Array,
      default: () => [],
    },
    node: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const newChat = shallowReactive({
      characterId: '',
      imageUrl: '',
      message: '',
    });
    const show = shallowRef(true);

    const rules = {
      characterId: { required },
      imageUrl: { url },
    };

    const v$ = useVuelidate(rules, newChat);

    const updateImageUrl = debounce((value) => {
      newChat.imageUrl = value;
    }, 500);
    function addChat() {
      const nodeData = props.node.data;
      nodeData.chats.push({
        id: nanoid(),
        ...newChat,
      });

      Node.update({
        where: props.node.id,
        data: {
          data: nodeData,
        },
      });

      newChat.imageUrl = newChat.message = '';
    }

    return {
      v$,
      show,
      addChat,
      newChat,
      updateImageUrl,
    };
  },
};
</script>
