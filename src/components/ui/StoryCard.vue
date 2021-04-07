<template>
  <ui-card hover class="group story">
    <template #image>
      <ui-img
        class="h-44 w-full rounded-xl overflow-hidden"
        lazy
        :src="story.bannerImage"
        :alt="`${story.title} banner image`"
      >
        <slot name="image"></slot>
      </ui-img>
    </template>
    <router-link
      class="font-semibold text-overflow text-lg cursor-pointer leading-tight inline-block w-full"
      :title="story.title"
      :to="`/story/${story.id}`"
    >
      {{ story.title }}
    </router-link>
    <p class="line-clamp text-gray-600">{{ story.description }}</p>
    <div class="mt-4 flex items-center">
      <router-link
        :to="story.author ? `/user/${story.author.username}` : ''"
        class="flex-1 text-overflow pr-2"
      >
        <template v-if="story.author">
          <ui-img
            :alt="`${story.author.username} profile`"
            lazy
            :src="
              story.author.photoURL ?? `https://ui-avatars.com/api/?name=${story.author.username}`
            "
            class="inline-block w-[26px] align-middle h-[26px] overflow-hidden rounded-full mr-2"
          ></ui-img>
          <span class="pr-2 align-middle">{{ story.author.username }}</span>
        </template>
      </router-link>
      <div class="likes text-gray-600 mr-2" title="Likes">
        <ui-icon name="heart" size="20"></ui-icon>
        <span class="align-middle inline-block ml-1">{{ formatNumber(story.likeCount || 0) }}</span>
      </div>
      <div class="played text-gray-600">
        <ui-icon name="play" size="20"></ui-icon>
        <span class="align-middle inline-block ml-1">{{
          formatNumber(story.playedCount || 0)
        }}</span>
      </div>
    </div>
  </ui-card>
</template>
<script>
export default {
  props: {
    story: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    function formatNumber(num) {
      const formattedNumber =
        Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
          : Math.sign(num) * Math.abs(num);

      return formattedNumber;
    }

    return {
      formatNumber,
    };
  },
};
</script>
