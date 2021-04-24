<template>
  <div class="container py-6 lg:py-12">
    <div v-if="state.loading" class="text-center">
      <ui-spinner size="36"></ui-spinner>
    </div>
    <template v-else>
      <p class="text-xl mb-6 font-semibold">Draft</p>
      <div v-if="state.stories.length === 0" class="text-center">
        <div class="p-5 bg-primary bg-opacity-20 text-primary mb-4 inline-block rounded-full mt-8">
          <ui-icon size="28" name="document-text"></ui-icon>
        </div>
        <p class="text-gray-600">You have no draft</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ui-story-card v-for="story in state.stories" :key="story.id" v-bind="{ story }">
        </ui-story-card>
      </div>
    </template>
  </div>
</template>
<route>
{
  meta: {
    middleware: 'auth'
  }
}
</route>
<script>
import { onMounted, reactive } from 'vue';
import { useHead } from '@vueuse/head';
import { fetchAPI } from '@/utils/auth';

export default {
  setup() {
    useHead({
      title: 'Story Draft',
    });

    const state = reactive({
      loading: false,
      stories: [],
    });

    onMounted(async () => {
      try {
        state.loading = true;

        const stories = await fetchAPI('/story/draft');

        state.stories = stories;
        state.loading = false;
      } catch (error) {
        state.loading = false;
        console.error(error);
      }
    });

    return {
      state,
    };
  },
};
</script>
