<template>
  <nav class="bg-white z-50 w-full px-5 shadow-sm fixed top-0">
    <div class="nav-content py-2 flex items-center border-b border-gray-100">
      <p>{{ story.title }}</p>
      <div class="flex-grow"></div>
      <ui-button v-tooltip="'Preview'" :disabled="loading" class="mr-2" icon @click="previewStory">
        <ui-icon name="play" class="icon-ui"></ui-icon>
      </ui-button>
      <ui-button v-tooltip="'Save draft'" icon class="text-primary mr-2">
        <ui-icon name="save"></ui-icon>
      </ui-button>
      <ui-button variant="primary">
        <ui-icon
          name="paper-airplane"
          class="icon-ui mr-2 transform rotate-45 -mt-1"
          size="20"
          :disabled="loading"
        ></ui-icon>
        Publish
      </ui-button>
    </div>
    <div class="nav-tab flex items-center text-sm">
      <ui-icon
        v-show="activeTab === 'editor-story'"
        v-tooltip="'Show blocks'"
        name="view-grid"
        class="text-primary lg:hidden mr-2"
        @click="showBlocks"
      ></ui-icon>
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab"
          class="tab px-4 py-2 transition cursor-pointer capitalize inline-block"
          :class="[
            activeTab === tab.id
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700',
          ]"
          @click="$emit('update:activeTab', tab.id)"
        >
          {{ tab.name }}
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { ref } from 'vue';
import emitter from 'tiny-emitter/instance';

export default {
  props: {
    activeTab: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
    story: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:activeTab', 'showPreview'],
  setup(props, { emit }) {
    const tabs = [
      { id: 'editor-details', name: 'details' },
      { id: 'editor-story', name: 'story flow' },
      { id: 'editor-characters', name: 'characters' },
      { id: 'editor-style', name: 'chat style' },
    ];

    function previewStory() {
      emit('showPreview');
      emitter.emit('preview-story');
    }
    function showBlocks() {
      emitter.emit('show-blocks');
    }

    return {
      tabs,
      showBlocks,
      previewStory,
    };
  },
};
</script>
