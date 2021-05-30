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
          class="resize-none p-0 bg-transparent scroll text-gray-500 border-none h-16"
          placeholder="Message here"
        ></textarea>
        <p v-else class="leading-tight mt-1 text-gray-500">
          {{ chat.message }}
        </p>
      </div>
      <div v-if="isEditing" class="mb-2 flex items-end">
        <ui-button
          v-tooltip="'Add image (max. 240KB)'"
          icon
          class="mr-2"
          :loading="uploadLoading"
          @click="() => fileForm.click()"
        >
          <ui-icon name="photograph"></ui-icon>
        </ui-button>
        <ui-input
          v-model="tempData.imageUrl"
          class="flex-1"
          label="Image URL"
          placeholder="https://example.com/image.png"
        ></ui-input>
      </div>
      <img v-if="chat.imageUrl" :src="chat.imageUrl" class="max-w-full mt-2 rounded-xl" />
    </div>
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
import { ref, onMounted, watch, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { debounce } from '@/utils/helper';
import upload from '@/utils/upload';
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
    nodeId: {
      type: String,
      default: '',
    },
    storyId: {
      type: String,
      default: '',
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const toast = useToast();

    const isEditing = ref(false);
    const uploadLoading = ref(false);
    const fileForm = ref(null);
    const tempData = ref({});

    const character = computed(() =>
      props.characters.find(({ id }) => props.chat.characterId === id)
    );

    function updateNode(type) {
      const node = Node.find(props.nodeId)?.data ?? {};

      if (!node) return;

      if (type === 'delete') {
        const index = node.chats.findIndex(({ id }) => id === props.chat.id);

        if (index === -1) return;

        node.chats.splice(index, 1);
      } else if (type === 'update') {
        node.chats[props.index] = tempData.value;
      }

      emit('update', node.chats);
    }
    function handleFileChange() {
      uploadLoading.value = true;
      const [file] = fileForm.value.files;

      if (file) {
        upload
          .image(file, props.storyid)
          .then(({ imageUrl }) => {
            uploadLoading.value = false;
            tempData.value.imageUrl = imageUrl;
          })
          .catch((error) => {
            console.error(error);
            toast.error(error.message || error);
            uploadLoading.value = false;
          });
      }
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
      fileForm,
      tempData,
      isEditing,
      character,
      updateNode,
      uploadLoading,
      handleFileChange,
    };
  },
};
</script>
