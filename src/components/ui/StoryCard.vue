<template>
  <div class="ui-story-card">
    <div class="h-44 overflow-hidden relative rounded-xl">
      <div
        :style="{ 'background-image': `url(${story.bannerImage})` }"
        class="h-full bg-center bg-cover bg-no-repeat w-full ui-story-card__img"
      ></div>
    </div>
    <ui-card class="mx-2 -mt-14 ui-story-card__content">
      <p class="text-primary">Category</p>
      <router-link :to="`/story/${story.id}`" class="font-semibold text-overflow capitalize">
        {{ story.title }}
      </router-link>
      <div class="my-2">
        <img src="https://picsum.photos/500" class="inline-block h-8 w-8 rounded-full mr-2" />
        <div class="inline-block text-sm">
          <p>Ahmad Kholid</p>
          <p>25 may 2020</p>
        </div>
      </div>
      <p class="line-clamp text-gray-600">{{ story.description }}</p>
      <div class="mt-4 flex text-gray-600 items-center">
        <ui-button v-tooltip.bottom="'Upvote'" icon class="mr-2">
          <ui-icon name="arrow-up" size="20"></ui-icon>
        </ui-button>
        <span class="text-gray-700">2k upvotes</span>
        <div class="flex-grow"></div>
        <ui-button v-tooltip.bottom="'Save'" icon>
          <ui-icon name="bookmark" size="20"></ui-icon>
        </ui-button>
      </div>
    </ui-card>
  </div>
</template>
<script>
export default {
  props: {
    story: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style scoped>
.ui-story-card__img,
.ui-story-card__content {
  transition: all 200ms ease;
}

.ui-story-card:hover .ui-story-card__content {
  @apply shadow-xl;
  transform: translateY(-5px);
}
.ui-story-card:hover .ui-story-card__img {
  transform: scale(1.05);
}
</style>
