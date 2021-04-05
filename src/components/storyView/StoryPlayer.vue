<template>
  <div
    ref="container"
    class="w-full bg-black bg-gray-600 shadow-inner relative"
    style="height: 600px"
  >
    <div class="w-full md:max-w-sm mx-auto h-full bg-black bg-opacity-20 relative">
      <chat-container v-if="state.playing && !state.start" :story-id="storyId"></chat-container>
      <div v-else class="h-full flex justify-center items-center flex-col">
        <ui-img
          v-if="story.iconImage"
          :src="story.iconImage"
          class="h-16 mb-4 w-16 overflow-hidden rounded-xl shadow-xl"
        ></ui-img>
        <p class="mb-12 text-white text-center px-5 text-lg">{{ story.title }}</p>
        <ui-spinner v-if="state.loading" size="32"></ui-spinner>
        <ui-button v-else class="w-48" variant="primary" @click="startPlaying"> Start </ui-button>
      </div>
      <transition name="start" @after-enter="state.start = false">
        <div v-if="state.start" class="bg-white absolute h-full w-full top-0 left-0"></div>
      </transition>
    </div>
    <ui-button
      icon
      class="absolute m-5 bottom-0 left-0 bg-opacity-10 hover:bg-opacity-20"
      @click="toggleFullscreen"
    >
      <ui-icon name="arrow-expands"></ui-icon>
    </ui-button>
  </div>
</template>
<script>
import { ref, shallowReactive } from 'vue';
import { fetchAPI } from '@/utils/auth';
import Story from '@/models/story';
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
    const state = shallowReactive({
      playing: false,
      loading: false,
    });
    const container = ref(null);

    async function toggleFullscreen() {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
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
            state.playing = state.start = true;
            state.loading = false;
          }, 1000);

          return;
        }

        const result = await fetchAPI(
          `/story/data?dataId=${props.story.data}&storyId=${props.story.id}`
        );

        await Story.insertOrUpdate({
          data: {
            ...props.story,
            ...result,
            isDataRetrieved: true,
            playedCount: props.story.playedCount + 1,
          },
        });

        state.playing = state.start = true;
        state.loading = false;
      } catch (error) {
        state.loading = false;
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
.start-enter-active {
  transition: all 2.5s ease-out;
}

.start-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.start-enter-from,
.start-leave-to {
  opacity: 0;
}
</style>
