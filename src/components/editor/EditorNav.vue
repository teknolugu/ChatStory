<template>
  <nav class="bg-white z-50 w-full px-5 shadow-sm absolute top-0">
    <div class="nav-content py-2 flex items-center border-b border-gray-100">
      <p>hello</p>
      <div class="flex-grow"></div>
      <ui-button variant="primary">
        <ui-icon
          name="paper-airplane"
          class="icon-ui -ml-1 mr-1 transform rotate-45 -mt-1"
          size="20"
        ></ui-icon>
        Publish
      </ui-button>
    </div>
    <div class="nav-tab flex items-stretch text-sm">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="tab px-4 py-2 transition cursor-pointer capitalize"
        :class="[
          activeTab === tab.id
            ? 'border-b-2 border-primary text-primary'
            : 'text-gray-500 hover:text-gray-700',
        ]"
        @click="$emit('update:activeTab', tab.id)"
      >
        {{ tab.name }}
      </div>
    </div>
  </nav>
</template>
<script>
import { ref } from 'vue';

export default {
  props: {
    activeTab: {
      type: String,
      default: '',
    },
  },
  emits: ['update:activeTab'],
  setup(props) {
    const tabs = [
      { id: 'editor-detail', name: 'details' },
      { id: 'editor-story', name: 'story flow' },
      { id: 'editor-characters', name: 'characters' },
      { id: 'editor-style', name: 'chat style' },
    ];

    return {
      tabs,
    };
  },
};
</script>
