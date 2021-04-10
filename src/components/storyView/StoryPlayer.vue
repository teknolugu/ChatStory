<template>
  <div
    ref="container"
    class="w-full relative transition duration-500 overflow-hidden"
    style="height: 600px"
    :class="[
      state.darkBackground ? 'bg-gray-600' : 'bg-gray-200',
      { 'rounded-xl': !state.fullscreen },
    ]"
  >
    <template v-if="!state.playing">
      <svg
        width="0"
        height="0"
        style="position: absolute; opacity: 0; left: -999999px; top: -999999px"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20"></feGaussianBlur>
          </filter>
        </defs>
      </svg>
      <ui-img
        :src="story.bannerImage"
        class="absolute top-0 left-0 h-full w-full story-banner"
      ></ui-img>
    </template>
    <div class="w-full md:max-w-sm mx-auto h-full relative">
      <chat-container v-if="state.playing" :story-id="storyId"></chat-container>
      <div v-else class="h-full flex justify-center items-center flex-col">
        <ui-button
          circle
          icon
          class="bg-opacity-20 hover:bg-opacity-30"
          :loading="state.loading"
          @click="startPlaying"
        >
          <ui-icon name="play" size="64" class="text-white"></ui-icon>
        </ui-button>
      </div>
    </div>
    <div class="absolute m-5 bottom-0 left-0 space-x-2">
      <ui-button
        v-tooltip="'Toggle fullscreen'"
        icon
        class="bg-opacity-10 hover:bg-opacity-20"
        :class="{ 'text-white': !state.playing }"
        @click="toggleFullscreen"
      >
        <ui-icon name="arrow-expands"></ui-icon>
      </ui-button>
      <ui-button
        v-tooltip="'Toggle dark background'"
        icon
        class="hidden md:inline-block bg-opacity-10 hover:bg-opacity-20"
        @click="state.darkBackground = !state.darkBackground"
      >
        <ui-icon
          name="moon"
          :class="{
            'text-primary': state.darkBackground,
            'text-white': !state.playing && !state.darkBackground,
          }"
        ></ui-icon>
      </ui-button>
    </div>
  </div>
</template>
<script>
import { ref, shallowReactive } from 'vue';
import { useToast } from 'vue-toastification';
import { fetchAPI } from '@/utils/auth';
import Story from '@/models/story';
import Style from '@/models/style';
import ChatContainer from '../chats/Container.vue';

export default {
  components: { ChatContainer },
  props: {
    story: {
      type: Object,
      default: () => ({}),
    },
    storyId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const toast = useToast();

    const state = shallowReactive({
      playing: false,
      loading: false,
      fullscreen: false,
      darkBackground: false,
    });
    const container = ref(null);

    async function toggleFullscreen() {
      if (document.fullscreenElement) {
        state.fullscreen = false;
        await document.exitFullscreen();
      } else {
        state.fullscreen = true;
        await container.value.requestFullscreen();
      }
    }
    function addStoryId(data) {
      if (Array.isArray(data)) {
        const newData = data.map((item) => ({ ...item, storyId: props.story.id, $id: item.id }));

        return newData;
      } else if (typeof data === 'object' && data !== null) {
        data.storyId = props.story.id;
        data.$id = data.id;

        return data;
      }
    }
    async function startPlaying() {
      try {
        state.loading = true;

        if (props.story.isDataRetrieved) {
          setTimeout(() => {
            state.playing = true;
            state.loading = false;
          }, 1000);

          return;
        }

        const result = await fetchAPI(
          `/story/data?dataId=${props.story.data}&storyId=${props.story.id}`
        );

        if (!result.style) {
          await Style.insertOrUpdate({
            data: {
              storyId: props.story.id,
            },
          });
        }

        await Story.insertOrUpdate({
          data: {
            ...props.story,
            ...result,
            isDataRetrieved: true,
            playedCount: props.story.playedCount + 1,
          },
        });

        state.playing = true;
        state.loading = false;
      } catch (error) {
        state.loading = state.playing = false;
        toast.error('Something went wrong');
        console.error(error);
      }
    }

    return {
      state,
      container,
      startPlaying,
      toggleFullscreen,
    };
  },
};
</script>
<style scoped>
.story-banner {
  filter: url(#blur);
}
</style>
