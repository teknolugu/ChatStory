<template>
  <div class="story lg:py-12 pb-12">
    <ui-alert v-if="state.isError" class="mx-12" variant="error">
      Something went wrong
      <template #append>
        <ui-button variant="danger" class="bg-opacity-60 hover:bg-opacity-60" @click="fetchStory">
          Try again
        </ui-button>
      </template>
    </ui-alert>
    <template v-else>
      <template v-if="state.retrieved">
        <div class="lg:container">
          <story-player :story="story" :story-id="storyId"></story-player>
        </div>
        <div class="lg:mt-12 mt-6 container">
          <div class="flex flex-col lg:flex-row items-start">
            <div class="flex-1 lg:mr-16">
              <h1 class="text-2xl font-semibold">
                {{ story.title }}
                <span
                  v-if="!story.isPublished"
                  class="inline-block px-2 py-1 text-sm text-white rounded-full bg-purple-500 ml-2 font-normal"
                >
                  Draft
                </span>
              </h1>
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
            <story-meta v-bind="{ story, user }"></story-meta>
          </div>
        </div>
      </template>
      <div v-else class="py-12 text-center">
        <ui-spinner size="36"></ui-spinner>
      </div>
    </template>
  </div>
</template>
<route>
{
  name: "story-view"
}
</route>
<script>
import { onMounted, computed, shallowReactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useHead } from '@vueuse/head';
import { fetchAPI } from '@/utils/auth';
import Story from '@/models/story';
import StoryPlayer from '@/components/storyView/StoryPlayer.vue';
import StoryMeta from '@/components/storyView/StoryMeta.vue';

export default {
  components: { StoryPlayer, StoryMeta },
  setup() {
    const router = useRouter();
    const store = useStore();

    const storyId = router.currentRoute.value.params.storyid;

    const state = shallowReactive({
      isError: false,
      retrieved: false,
    });

    const story = computed(() => Story.query().where('id', storyId).withAll().first());
    const user = computed(() => store.state.user);

    useHead({
      title: computed(() => `${story.value?.title} | Chat Story`),
      meta: [
        {
          name: 'description',
          content: computed(() => story.value?.description),
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'stylesheet',
          href: computed(
            () =>
              `https://fonts.googleapis.com/css2?family=${
                story.value?.style?.general?.fontFamily ?? 'Poppins'
              }&display=swap`
          ),
        },
      ],
    });

    async function fetchStory() {
      try {
        state.isError = false;

        if (story.value) {
          state.retrieved = true;

          if (user.value) {
            const data = await fetchAPI(`/story/${storyId}/user`);

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
        if (error.statusCode === 404) {
          router.replace('/404');
        } else {
          state.isError = true;
          console.error(error);
        }
      }
    }

    fetchStory();

    return {
      user,
      state,
      story,
      storyId,
      fetchStory,
    };
  },
};
</script>

