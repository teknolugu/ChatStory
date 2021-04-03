<template>
  <div class="flex container py-12">
    <div class="flex-1">
      <div v-if="state.isLoading" class="text-center">
        <ui-spinner size="36"></ui-spinner>
      </div>
      <template v-else>
        <div class="stories grid grid-cols-3 mr-8 gap-6">
          <ui-story-card
            v-for="story in stories"
            :key="story.id"
            v-bind="{ story }"
          ></ui-story-card>
        </div>
        <div v-if="nextKey" class="text-center mt-12">
          <ui-button>Load more stories</ui-button>
        </div>
      </template>
    </div>
    <div class="w-64">
      <p class="font-semibold">Sort by</p>
      <ui-list class="w-full space-y-2 mt-4">
        <ui-list-item
          v-for="sort in sorts"
          :key="sort.id"
          :active="state.activeSort === sort.id"
          class="cursor-pointer"
          @click="state.activeSort = sort.id"
        >
          <ui-icon :name="sort.icon" class="mr-4"></ui-icon>
          <span class="capitalize">{{ sort.name }}</span>
        </ui-list-item>
      </ui-list>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted, shallowReactive } from 'vue';
import { useStore } from 'vuex';
import Story from '@/models/story';

export default {
  setup() {
    const sorts = [
      { name: 'most upvoted', icon: 'arrow-up', id: 'mostUpvoted' },
      { name: 'recently', icon: 'clock', id: 'recent' },
    ];

    const store = useStore();

    const state = shallowReactive({
      isLoading: false,
      activeSort: 'mostUpvoted',
    });

    onMounted(() => {
      if (store.state.feed[state.activeSort].isRetrieved) return;

      state.isLoading = true;

      store
        .dispatch('fetchFeed', { sortBy: 'mostUpvoted' })
        .then((stories) => {
          state.isLoading = false;
        })
        .catch((error) => {
          state.isLoading = false;
        });
    });

    const stories = computed(() => store.getters.getFeedStories(state.activeSort));
    const nextKey = computed(() => store.state.feedKey[state.activeSort]);

    return {
      state,
      sorts,
      nextKey,
      stories,
    };
  },
};
</script>
