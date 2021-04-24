<template>
  <div class="flex container py-6 lg:py-12 flex-col-reverse lg:flex-row">
    <div class="flex-1">
      <ui-alert v-if="state.isError" class="lg:mr-12" variant="error">
        Something went wrong
        <template #append>
          <ui-button variant="danger" class="bg-opacity-60 hover:bg-opacity-60" @click="fetchFeed">
            Try again
          </ui-button>
        </template>
      </ui-alert>
      <template v-else>
        <div v-if="state.isLoading" class="text-center">
          <ui-spinner size="36"></ui-spinner>
        </div>
        <template v-else>
          <div class="stories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mr-8 gap-6">
            <ui-story-card
              v-for="story in stories"
              :key="story.id"
              v-bind="{ story }"
            ></ui-story-card>
          </div>
          <div v-if="nextKey" class="text-center mt-12">
            <ui-button :loading="state.loadingLoadMore" @click="loadMore"
              >Load more stories</ui-button
            >
          </div>
        </template>
      </template>
    </div>
    <div class="w-full lg:w-64 mb-10 lg:mb-0">
      <p class="font-semibold">Sort by</p>
      <ui-select
        block
        :model-value="state.activeSort"
        class="mt-2 lg:hidden max-w-md"
        @change="changeSort"
      >
        <option v-for="sort in sorts" :key="sort.id" :value="sort.id" class="capitalize">
          {{ sort.name }}
        </option>
      </ui-select>
      <ui-list class="w-full space-y-2 mt-4 hidden lg:block">
        <ui-list-item
          v-for="sort in sorts"
          :key="sort.id"
          :active="state.activeSort === sort.id"
          class="cursor-pointer"
          @click="changeSort(sort.id)"
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
import { useHead } from '@vueuse/head';
import { useStore } from 'vuex';
import Story from '@/models/story';

export default {
  setup() {
    const sorts = [
      { name: 'most liked', icon: 'heart', id: 'mostLiked' },
      { name: 'recently', icon: 'clock', id: 'recently' },
    ];

    const store = useStore();

    const state = shallowReactive({
      isError: false,
      isLoading: true,
      loadingLoadMore: false,
      activeSort: 'mostLiked',
    });

    const stories = computed(() => store.getters.getFeedStories(state.activeSort));
    const nextKey = computed(() => store.state.feedKey[state.activeSort]);

    useHead({
      title: 'Chat Story',
    });

    function loadMore() {
      state.loadingLoadMore = true;

      store
        .dispatch('fetchFeed', { sortBy: state.activeSort, nextKey: nextKey.value })
        .then((stories) => {
          state.loadingLoadMore = false;
        })
        .catch((error) => {
          state.loadingLoadMore = false;
        });
    }
    function fetchFeed() {
      state.isError = false;
      state.isLoading = true;

      store
        .dispatch('fetchFeed', { sortBy: state.activeSort })
        .then((stories) => {
          state.isLoading = false;
        })
        .catch((error) => {
          state.isError = true;
          state.isLoading = false;
        });
    }
    function changeSort(sortId) {
      state.activeSort = sortId;
      fetchFeed();
    }

    fetchFeed();

    return {
      state,
      sorts,
      nextKey,
      stories,
      loadMore,
      fetchFeed,
      changeSort,
    };
  },
};
</script>
