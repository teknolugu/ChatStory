<template>
  <div
    ref="container"
    class="w-full relative transition duration-500 overflow-hidden"
    style="height: 600px"
    :class="[
      state.darkBackground ? 'bg-gray-600' : 'bg-gray-200',
      state.fullscreen ? 'transform rotate-90 md:rotate-0' : 'lg:rounded-xl',
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
            <feGaussianBlur in="SourceGraphic" stdDeviation="15"></feGaussianBlur>
          </filter>
        </defs>
      </svg>
      <ui-img
        :src="story.bannerImage"
        class="absolute top-0 left-0 h-full w-full story-banner"
      ></ui-img>
    </template>
    <div class="w-full md:max-w-sm mx-auto h-full relative">
      <chat-container
        v-if="state.playing"
        ref="storyContainer"
        :story-id="storyId"
        @end="state.isFinished = true"
      >
        <template #header>
          <ui-button
            v-if="user"
            v-tooltip="'Save progress'"
            icon
            class="bg-opacity-10 hover:bg-opacity-10 ml-4"
            :loading="state.loadingSave"
            @click="saveProgress"
          >
            <ui-icon name="save" view-box="0 0 24 24"></ui-icon>
          </ui-button>
          <ui-button
            icon
            class="bg-opacity-10 hover:bg-opacity-10 ml-2"
            @click="state.showSetting = true"
          >
            <ui-icon name="cog"></ui-icon>
          </ui-button>
        </template>
      </chat-container>
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
    <ui-modal v-model="state.showSetting" content-class="max-w-sm">
      <template #header>
        <p>Settings</p>
      </template>
      <ui-checkbox
        class="mt-2"
        :model-value="state.playBackgroundMusic"
        @change="toggleBackgroundMusic"
      >
        Enable background music
      </ui-checkbox>
      <ui-button
        v-if="user"
        class="w-full mt-4"
        :loading="state.loadingReset"
        @click="resetProgress"
      >
        Reset Progress
      </ui-button>
    </ui-modal>
  </div>
</template>
<script>
import { ref, shallowReactive, computed } from 'vue';
import { useStore } from 'vuex';
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
    const store = useStore();
    const toast = useToast();

    const state = shallowReactive({
      playing: false,
      loading: false,
      fullscreen: false,
      isFinished: false,
      loadingSave: false,
      showSetting: false,
      loadingReset: false,
      darkBackground: false,
      playBackgroundMusic: true,
    });
    const container = ref(null);
    const storyContainer = ref(null);

    const user = computed(() => store.state.user);

    async function toggleFullscreen() {
      if (document.fullscreenElement) {
        state.fullscreen = false;
        await document.exitFullscreen();
      } else {
        state.fullscreen = true;
        await container.value.requestFullscreen();
      }
    }
    function toggleBackgroundMusic() {
      state.playBackgroundMusic = !state.playBackgroundMusic;

      const engine = storyContainer.value.state.engine;

      if (engine) {
        engine.playBackgroundMusic(state.playBackgroundMusic);
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

        if (!result.data.style) {
          await Style.insertOrUpdate({
            data: {
              storyId: props.story.id,
            },
          });
        }

        await Story.insertOrUpdate({
          data: {
            ...props.story,
            ...result.data,
            progress: result.progress,
            isDataRetrieved: true,
            playedCount: props.story.isPublished
              ? props.story.playedCount + 1
              : props.story.playedCount,
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
    function updateProgress(loadingKey, data) {
      return new Promise((resolve, reject) => {
        state[loadingKey] = true;

        fetchAPI('/user/my/saved-progress', {
          method: 'POST',
          body: JSON.stringify({
            storyId: props.story.id,
            ...data,
          }),
        })
          .then(() => {
            state[loadingKey] = false;
            resolve();
          })
          .catch((error) => {
            console.error(error);
            toast.error('Something went wrong');
            state[loadingKey] = false;
            reject();
          });
      });
    }
    function saveProgress() {
      updateProgress('loadingSave', {
        options: storyContainer.value.state.selectedOptions,
        isFinished: state.isFinished,
      });
    }
    function resetProgress() {
      updateProgress('loadingReset', {
        options: [],
        isFinished: false,
      }).then(() => {
        window.location.reload();
      });
    }

    return {
      user,
      state,
      container,
      startPlaying,
      saveProgress,
      resetProgress,
      storyContainer,
      toggleFullscreen,
      toggleBackgroundMusic,
    };
  },
};
</script>
<style scoped>
.story-banner {
  filter: url(#blur);
}
</style>
