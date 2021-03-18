<template>
  <div class="editor">
    <editor-nav
      v-model:activeTab="state.activeTab"
      @showPreview="state.showPreview = true"
    ></editor-nav>
    <main class="h-screen" style="padding-top: 95px">
      <keep-alive>
        <component :is="state.activeTab"></component>
      </keep-alive>
    </main>
    <ui-modal v-model="state.showPreview" custom-content persist>
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
import { shallowReactive } from 'vue';
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
    const state = shallowReactive({
      activeTab: 'editor-details',
      showPreview: false,
    });

    return {
      state,
    };
  },
};
</script>
