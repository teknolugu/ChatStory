<template>
  <div class="container w-full py-12">
    <div v-if="state.loading" class="text-center">
      <ui-spinner size="36"></ui-spinner>
    </div>
    <template v-else>
      <p class="text-gray-600 text-lg mb-8">
        Search result for <b>{{ $route.query.q }}</b>
      </p>
      <div v-if="state.stories.length === 0" class="text-center">
        <p>No results found</p>
      </div>
      <div v-else class="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6">
        <ui-story-card
          v-for="story in state.stories"
          :key="story.id"
          v-bind="{ story }"
        ></ui-story-card>
      </div>
      <div v-if="state.nextKey" class="mt-12 text-center" @click="loadMore">
        <ui-button :loading="state.loadingLoadMore">Load more stories</ui-button>
      </div>
    </template>
  </div>
</template>
<script>
import { shallowReactive, onMounted } from 'vue';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import { fetchAPI } from '@/utils/auth';

export default {
  setup() {
    const router = useRouter();

    const state = shallowReactive({
      loading: true,
      stories: [],
      nextKey: null,
      loadingLoadMore: false,
    });

    async function fetchStories(query) {
      try {
        if (!query) {
          return router.replace('/');
        }

        const { stories, nextKey } = await fetchAPI(`/story?sortBy=mostLiked&search=${query}`);

        state.stories = stories;
        state.nextKey = nextKey && JSON.stringify(nextKey);
        state.loading = false;
      } catch (error) {
        state.loading = false;
        console.error(error);
      }
    }
    async function loadMore() {
      try {
        state.loadingLoadMore = true;

        const query = router.currentRoute.value.query.q;
        const { stories, nextKey } = await fetchAPI(
          `/story?sortBy=mostLiked&search=${query}&nextPageId=${state.nextKey}`
        );

        state.stories.push(...stories);
        state.nextKey = nextKey;
        state.loadingLoadMore = false;
      } catch (error) {
        state.loadingLoadMore = false;
        console.error(error);
      }
    }

    onMounted(async () => {
      await fetchStories(router.currentRoute.value.query.q);
    });
    onBeforeRouteUpdate(async (to, from) => {
      if (to.query.q !== from.query.q) {
        await fetchStories(to.query.q);
      }
    });

    return {
      state,
      loadMore,
    };
  },
};
</script>
