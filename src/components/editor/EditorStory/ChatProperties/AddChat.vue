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
            placeholder="Message here... (max 512)"
            maxlength="512"
          ></textarea>
          <div
            v-if="newChat.imageUrl"
            class="space-x-2 border-gray-200 pt-2 mt-2 border-t border-gray-200"
          >
            <div
              class="h-12 inline-block w-12 rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat group relative"
              :style="{ 'background-image': `url(${newChat.imageUrl})` }"
            >
              <div
                class="bg-black h-full group-hover:visible invisible cursor-pointer bg-opacity-25 text-white flex items-center justify-center"
                @click="newChat.imageUrl = ''"
              >
                <ui-icon name="x"></ui-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <!-- <ui-popover placement="bottom">
            <template #trigger>
              <ui-button id="add-image" icon class="mr-2 text-gray-600">
                <ui-icon name="photograph"></ui-icon>
              </ui-button>
            </template>
            <div class="w-56">
              <ui-file-uploader></ui-file-uploader>
              <ui-input
                :model-value="newChat.imageUrl"
                label="Image URL"
                class="w-full mt-2"
                placeholder="https://example.com/image.png"
                @update:model-value="updateImageUrl"
              ></ui-input>
            </div>
          </ui-popover> -->
          <ui-button
            v-tooltip="'Add image (max. 240KB)'"
            icon
            class="mr-2 text-gray-600"
            @click="openFileDiaglog"
          >
            <ui-icon name="photograph"></ui-icon>
          </ui-button>
          <ui-select v-model="newChat.characterId" class="flex-1 mr-8" placeholder="Character">
            <option v-for="character in characters" :key="character.id" :value="character.id">
              {{ character.name }}
            </option>
          </ui-select>
          <ui-button
            variant="primary"
            icon
            :disabled="!newChat.characterId"
            :loading="uploadLoading"
            @click="addChat"
          >
            <ui-icon name="paper-airplane" class="rotate-45 transform"></ui-icon>
          </ui-button>
        </div>
      </div>
    </transition-expand>
    <input
      ref="fileForm"
      accept="image/png, .jpg, .jpeg, image/gif"
      type="file"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>
<script>
import { shallowReactive, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { nanoid } from 'nanoid';
import Node from '@/models/node';
import { debounce } from '@/utils/helper';
import upload from '@/utils/upload';

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
    storyId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const newChat = shallowReactive({
      message: '',
      imageUrl: '',
      characterId: '',
      imageFile: null,
    });
    const show = ref(true);
    const fileForm = ref(null);
    const uploadLoading = ref(false);

    const updateImageUrl = debounce((value) => {
      newChat.imageUrl = value;
    }, 500);

    async function addChat() {
      try {
        uploadLoading.value = true;

        if (newChat.imageFile) {
          const result = await upload.image(newChat.imageFile, props.storyId);

          newChat.imageUrl = result.imageUrl;
        }

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
        newChat.imageFile = null;

        uploadLoading.value = false;
      } catch (error) {
        console.error(error);
        uploadLoading.value = false;
        // Do noting
      }
    }
    function openFileDiaglog() {
      fileForm.value.value = '';
      fileForm.value.click();
    }
    function handleFileChange() {
      const [file] = fileForm.value.files;

      if (file) {
        newChat.imageFile = file;
        newChat.imageUrl = URL.createObjectURL(file);
      }
    }

    return {
      show,
      addChat,
      newChat,
      fileForm,
      uploadLoading,
      updateImageUrl,
      openFileDiaglog,
      handleFileChange,
    };
  },
};
</script>
