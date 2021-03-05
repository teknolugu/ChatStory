<template>
  <div class="bg-white w-72 p-5">
    <ui-select
      :model-value="activeElement"
      label="Element"
      class="w-full mb-4"
      @change="updateActiveElement"
    >
      <option v-for="element in elements" :key="element.id" class="capitalize" :value="element.id">
        {{ element.name }}
      </option>
    </ui-select>
    <element-editor :id="activeElementData.key"></element-editor>
  </div>
</template>
<script>
import { computed } from 'vue';
import ElementEditor from './ElementEditor.vue';

export default {
  components: { ElementEditor },
  props: {
    activeElement: {
      type: String,
      default: 'general',
    },
  },
  emits: ['update:activeElement'],
  setup(props, { emit }) {
    const elements = [
      { id: 'general', name: 'general', key: 'general' },
      { id: 'annotation', name: 'annotation', key: 'annotation' },
      { id: 'navigation', name: 'navigation', key: 'navigation' },
      { id: 'chat-image', name: 'chat image', key: 'chatImage' },
      { id: 'main-character', name: 'main character chat', key: 'mainCharacter' },
      { id: 'character-chat', name: 'character chat', key: 'characterChat' },
      { id: 'profile-picture', name: 'profile picture', key: 'profilePicture' },
      { id: 'option', name: 'option', key: 'optoin' },
    ].sort((a, b) => (a.name > b.name ? 1 : -1));

    const activeElementData = computed(() => elements.find(({ id }) => props.activeElement === id));

    function updateActiveElement(id) {
      emit('update:activeElement', id);
    }

    return {
      elements,
      activeElementData,
      updateActiveElement,
    };
  },
};
</script>
