<template>
  <div class="editor">
    <editor-nav v-model:activeTab="activeTab"></editor-nav>
    <main class="h-screen" style="padding-top: 95px">
      <keep-alive>
        <component :is="activeTab"></component>
      </keep-alive>
    </main>
  </div>
</template>
<script>
import { ref } from 'vue';
import EditorNav from '@/components/editor/EditorNav.vue';
import EditorStory from '@/components/editor/EditorStory/index.vue';
import EditorCharacters from '@/components/editor/EditorCharacters.vue';
import EditorStyle from '@/components/editor/EditorStyle/index.vue';

export default {
  components: { EditorNav, EditorStory, EditorCharacters, EditorStyle },
  setup() {
    const activeTab = ref('editor-style');

    return {
      activeTab,
    };
  },
};
</script>
