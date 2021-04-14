<template>
  <div class="w-full lg:w-60 mt-8 lg:mt-0">
    <div class="flex mb-6">
      <ui-button
        class="flex-1 mr-4 max-w-xs"
        :variant="story.isLiked ? 'primary' : 'default'"
        :loading="state.loadingLike"
        :disabled="!user"
        @click="toggleLike"
      >
        <ui-icon name="heart" class="mr-2"></ui-icon>
        {{ story.isLiked ? 'Remove like' : 'Like' }}
      </ui-button>
      <ui-button
        v-tooltip="story.isInCollection ? 'Remove from collection' : 'Add to collection'"
        icon
        :loading="state.loadingCollection"
        :class="{ 'text-primary': story.isInCollection }"
        :disabled="!user"
        @click="toggleCollection"
      >
        <ui-icon name="bookmark"></ui-icon>
      </ui-button>
    </div>
    <ul class="text-gray-600 space-y-4">
      <li>
        <ui-icon name="clock" class="align-text-bottom mr-2"></ui-icon>
        {{ convertToRelativeTime(story.createdAt) }}
      </li>
      <li>
        <ui-icon name="heart" class="align-text-bottom mr-2"></ui-icon>
        {{ story.likeCount }} Likes
      </li>
      <li>
        <ui-icon name="play" class="align-text-bottom mr-2"></ui-icon>
        {{ story.playedCount }}x Played
      </li>
    </ul>
    <div
      v-if="user && user.username === story.author.username"
      class="mt-4 max-w-sm flex space-x-2 items-center"
    >
      <ui-button class="w-6/12" tag="router-link" :to="`/story/${story.id}/edit`">
        <ui-icon name="pencil" class="mr-2 -ml-1"></ui-icon>
        Edit
      </ui-button>
      <ui-button class="w-6/12 text-red-500" @click="deleteStory">
        <ui-icon name="trash" class="mr-2 -ml-1"></ui-icon>
        Delete
      </ui-button>
    </div>
  </div>
</template>
<script>
import { shallowReactive } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Story from '@/models/story';

dayjs.extend(relativeTime);

export default {
  props: {
    story: {
      type: Object,
      default: () => ({}),
    },
    user: {
      type: Object,
      default: () => null,
    },
  },
  setup(props) {
    const state = shallowReactive({
      loadingLike: false,
      loadingCollection: false,
    });

    async function toggleLike() {
      try {
        state.loadingLike = true;

        const result = await fetchAPI('/like', {
          method: 'POST',
          body: JSON.stringify({
            storyId: story.value.id,
          }),
        });

        const { isLiked } = result;
        const currentLikeCount = story.value.likeCount;

        await Story.update({
          where: story.value.id,
          data: {
            isLiked,
            likeCount: isLiked ? currentLikeCount + 1 : currentLikeCount - 1,
          },
        });

        state.loadingLike = false;
      } catch (error) {
        state.loadingLike = false;
        console.error(error);
      }
    }
    async function toggleCollection() {
      try {
        state.loadingCollection = true;

        const { isInCollection } = await fetchAPI('/user/my/collection', {
          method: 'POST',
          body: JSON.stringify({
            storyId: story.value.id,
          }),
        });

        await Story.update({
          where: story.value.id,
          data: { isInCollection },
        });

        state.loadingCollection = false;
      } catch (error) {
        state.loadingCollection = false;
        console.error(error);
      }
    }
    function deleteStory() {
      console.log(props.story.id);
    }
    function convertToRelativeTime(time) {
      return dayjs(time).fromNow();
    }

    return {
      state,
      toggleLike,
      toggleCollection,
      convertToRelativeTime,
    };
  },
};
</script>
