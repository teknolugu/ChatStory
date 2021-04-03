<template>
  <div class="container py-12">
    <div v-if="state.loading" class="text-center py-12">
      <ui-spinner></ui-spinner>
    </div>
    <template v-else>
      <div class="flex items-center">
        <img src="https://picsum.photos/500" class="h-14 w-14 rounded-xl" />
        <p class="ml-4 text-xl font-semibold">{{ $route.params.username }}</p>
      </div>
      <p class="mt-12 mb-5 text-gray-600 text-xl">Stories</p>
      <div class="grid grid-cols-4 mr-8 gap-6">
        <ui-story-card
          v-for="story in state.data.stories"
          :key="story.id"
          v-bind="{ story }"
        ></ui-story-card>
      </div>
    </template>
  </div>
</template>
<script>
import { computed, onMounted, shallowReactive } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAPI } from '@/utils/auth';
import Story from '@/models/story';

export default {
  setup() {
    const router = useRouter();
    const state = shallowReactive({
      data: {
        stories: [],
      },
      loading: true,
    });

    onMounted(async () => {
      state.loading = true;

      try {
        const data = await fetchAPI(`/user/${router.currentRoute.value.params.username}`);

        state.data = data;
        state.loading = false;
      } catch (error) {
        router.replace('/404');
        console.error(error);
      }
    });

    return {
      state,
    };
  },
};
</script>
