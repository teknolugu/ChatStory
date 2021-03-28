<template>
  <div class="flex container py-5">
    <div class="flex-1 grid grid-cols-3 mr-8 gap-5">
      <ui-story-card v-for="story in stories" :key="story.id" v-bind="{ story }"></ui-story-card>
    </div>
    <div class="w-64">
      <p class="font-semibold">Filters</p>
      <ui-list class="w-full space-y-2 mt-4">
        <ui-list-item
          v-for="filter in filters"
          :key="filter.id"
          :active="activeFilter === filter.id"
          class="cursor-pointer"
          @click="activeFilter = filter.id"
        >
          <ui-icon :name="filter.icon" class="mr-4"></ui-icon>
          <span class="capitalize">{{ filter.name }}</span>
        </ui-list-item>
      </ui-list>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import Story from '@/models/story';

export default {
  setup() {
    const filters = [
      { name: 'trending', icon: 'trending-up', id: 'trending' },
      { name: 'most upvoted', icon: 'arrow-up', id: 'most-upvoted' },
      { name: 'recent', icon: 'clock', id: 'recent' },
    ];
    const activeFilter = ref('trending');

    const stories = computed(() => Story.all());

    return {
      stories,
      filters,
      activeFilter,
    };
  },
};
</script>
