<template>
  <div class="w-full lg:w-60 mt-8 lg:mt-0">
    <div v-if="story.isPublished" class="flex mb-6">
      <ui-button
        class="flex-1 mr-4 max-w-xs"
        :variant="story.isLiked ? 'default' : 'primary'"
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
      <ui-button class="w-6/12 text-red-500" :loading="state.loadingDeleteBtn" @click="deleteStory">
        <ui-icon name="trash" class="mr-2 -ml-1"></ui-icon>
        Delete
      </ui-button>
    </div>
  </div>
</template>
<script>
import { shallowReactive } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDialog } from '@/composable/dialog';
import { fetchAPI } from '@/utils/auth';
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
    const dialog = useDialog();
    const router = useRouter();

    const state = shallowReactive({
      loadingLike: false,
      loadingDeleteBtn: false,
      loadingCollection: false,
    });

    function deleteStory() {
      state.loadingDeleteBtn = true;

      dialog.confirm({
        title: 'Delete story',
        body: 'Are you sure you want to delete this story? This action cannot be undone.',
        okVariant: 'danger',
        okText: 'Delete',
        onConfirm: () => {
          fetchAPI(`/story/${props.story.id}`, {
            method: 'DELETE',
          })
            .then(() => {
              state.loadingDeleteBtn = false;
              router.replace('/');
            })
            .catch((error) => {
              state.loadingDeleteBtn = false;
              console.error(error);
            });
        },
        onCancel: () => {
          state.loadingDeleteBtn = false;
        },
      });
    }
    async function toggleLike() {
      try {
        state.loadingLike = true;

        const result = await fetchAPI('/like', {
          method: 'POST',
          body: JSON.stringify({
            storyId: props.story.id,
          }),
        });

        const { isLiked } = result;
        const currentLikeCount = props.story.likeCount;

        await Story.update({
          where: props.story.id,
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
            storyId: props.story.id,
          }),
        });

        await Story.update({
          where: props.story.id,
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

    return {
      state,
      toggleLike,
      deleteStory,
      toggleCollection,
      convertToRelativeTime,
    };
  },
};
</script>
