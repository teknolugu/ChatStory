<template>
  <div class="story container py-12">
    <template v-if="state.retrieved">
      <story-player :story="story" :story-id="storyId"></story-player>
      <div class="mt-12">
        <div class="flex flex-col lg:flex-row items-start">
          <div class="flex-1 lg:mr-16">
            <h1 class="text-2xl font-semibold mb-2">{{ story.title }}</h1>
            <router-link
              :to="`/user/${story.author.username}`"
              class="inline-flex items-center my-4"
            >
              <ui-img
                :alt="`${story.author.username} profile`"
                lazy
                :src="
                  story.author.photoURL ??
                  `https://ui-avatars.com/api/?name=${story.author.username}`
                "
                class="inline-block h-10 w-10 overflow-hidden rounded-full mr-2"
              ></ui-img>
              <p class="ml-2">{{ story.author.username }}</p>
            </router-link>
            <p>{{ story.description }}</p>
          </div>
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
            <ui-button
              v-if="user && user.username === story.author.username"
              class="mt-4 max-w-sm w-full"
              tag="router-link"
              :to="`/story/${story.id}/edit`"
            >
              <ui-icon name="pencil" class="mr-2 -ml-1"></ui-icon>
              Edit
            </ui-button>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="py-12 text-center">
      <ui-spinner size="36"></ui-spinner>
    </div>
  </div>
</template>
<route>
{
  name: "story-view"
}
</route>
<script>
import { onMounted, computed, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { fetchAPI } from '@/utils/auth';
import Story from '@/models/story';
import StoryPlayer from '@/components/storyView/StoryPlayer.vue';

dayjs.extend(relativeTime);

export default {
  components: { StoryPlayer },
  setup() {
    const route = useRoute();
    const store = useStore();

    const storyId = route.params.storyid;

    const state = shallowReactive({
      retrieved: false,
      loadingLike: false,
      loadingCollection: false,
    });

    const story = computed(() => Story.query().where('id', storyId).withAll().first());
    const user = computed(() => store.state.user);

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
    function convertToRelativeTime(time) {
      return dayjs(time).fromNow();
    }

    onMounted(async () => {
      try {
        if (story.value) {
          state.retrieved = true;

          if (user.value) {
            const data = await fetchAPI(`/story/${storyId}/user`);
            console.log(data);
            await Story.update({
              where: story.value.id,
              data,
            });
          }

          return;
        }

        const result = await fetchAPI(`/story/${storyId}`);

        await Story.insertOrUpdate({
          data: result,
        });

        state.retrieved = true;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      user,
      state,
      story,
      storyId,
      toggleLike,
      toggleCollection,
      convertToRelativeTime,
    };
  },
};
</script>

