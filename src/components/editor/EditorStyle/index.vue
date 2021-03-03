<template>
  <div class="editor-style flex items-stretch h-full">
    <teleport to="head">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Lato&family=Montserrat&family=Open+Sans&display=swap"
        rel="stylesheet"
      />
    </teleport>
    <element-list v-model:activeElement="activeElement"></element-list>
    <div class="flex-1 p-5 flex items-center justify-center">
      <chat-container v-bind="{ activeElement }"></chat-container>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import ChatContainer from './ChatContainer.vue';
import ElementList from './ElementList.vue';

export default {
  components: { ChatContainer, ElementList },
  setup() {
    const activeElement = ref('general');

    return {
      activeElement,
    };
  },
};
</script>
