<template>
  <div class="editor">
    <editor-nav
      v-model:activeTab="state.activeTab"
      :loading="state.loading"
      :story="state.story"
      @showPreview="state.showPreview = true"
    ></editor-nav>
    <main class="h-screen" style="padding-top: 95px">
      <div v-if="state.loading" class="py-10 text-center">
        <ui-spinner size="36"></ui-spinner>
      </div>
      <keep-alive v-else>
        <component :is="state.activeTab"></component>
      </keep-alive>
    </main>
    <ui-modal v-if="!state.loading" v-model="state.showPreview" custom-content persist>
      <chats-container>
        <template #header>
          <div class="flex-grow"></div>
          <ui-icon name="x" class="cursor-pointer" @click="state.showPreview = false"></ui-icon>
        </template>
      </chats-container>
    </ui-modal>
  </div>
</template>
<script>
import { shallowReactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Story from '@/models/story';
import EditorNav from '@/components/editor/EditorNav.vue';
import EditorStory from '@/components/editor/EditorStory/index.vue';
import EditorCharacters from '@/components/editor/EditorCharacters.vue';
import EditorStyle from '@/components/editor/EditorStyle/index.vue';
import EditorDetails from '@/components/editor/EditorDetails.vue';
import ChatsContainer from '@/components/chats/Container.vue';

export default {
  components: {
    EditorNav,
    EditorStory,
    EditorCharacters,
    EditorStyle,
    EditorDetails,
    ChatsContainer,
  },
  setup() {
    const router = useRouter();

    const state = shallowReactive({
      activeTab: 'editor-details',
      showPreview: false,
      loading: true,
      story: {},
    });

    onMounted(() => {
      console.log(router);
      const storyId = router.currentRoute.value.params.storyid;
      const story = Story.find(storyId);

      if (!story) {
        router.push('/');
        return;
      }

      state.story = story;
      state.loading = false;
    });

    return {
      state,
    };
  },
};
</script>
