<template>
  <div class="container py-12">
    <div v-if="state.loading" class="text-center">
      <ui-spinner size="36"></ui-spinner>
    </div>
    <template v-else>
      <p class="text-lg text-gray-600">My Collection</p>
      <div v-if="state.collection.length === 0" class="text-center">
        <div class="p-5 bg-primary bg-opacity-20 text-primary mb-4 inline-block rounded-full mt-8">
          <ui-icon size="28" name="bookmark"></ui-icon>
        </div>
        <p class="text-gray-600">Your Collection Is Empty</p>
      </div>
      <div v-else class="mt-6 grid grid-cols-4">
        <ui-story-card v-for="story in state.collection" :key="story.id" v-bind="{ story }">
          <template #image>
            <ui-button
              v-tooltip="'Remove from collection'"
              :loading="state.removeBtnLoading"
              icon
              class="absolute bottom-0 right-0 m-5 text-red-500"
              @click="removeStory(story.id)"
            >
              <ui-icon name="trash"></ui-icon>
            </ui-button>
          </template>
        </ui-story-card>
      </div>
    </template>
  </div>
</template>
<script>
import { onMounted, reactive } from 'vue';
import { fetchAPI } from '@/utils/auth';

export default {
  setup() {
    const state = reactive({
      loading: false,
      collection: [],
      removeBtnLoading: false,
    });

    async function removeStory(storyId) {
      try {
        state.removeBtnLoading = true;

        const isSuccess = await fetchAPI(`/user/my/collection?storyId=${storyId}`, {
          method: 'DELETE',
        });

        if (isSuccess) {
          const storyIndex = state.collection.findIndex(({ id }) => id === storyId);

          if (storyIndex !== -1) state.collection.splice(storyIndex, 1);
        }

        state.removeBtnLoading = false;
      } catch (error) {
        state.removeBtnLoading = false;
        console.error(error);
      }
    }

    onMounted(async () => {
      try {
        state.loading = true;

        const collection = await fetchAPI('/user/my/collection');

        state.collection = collection;
        state.loading = false;
      } catch (error) {
        state.loading = false;
        console.error(error);
      }
    });

    return {
      state,
      removeStory,
    };
  },
};
</script>
