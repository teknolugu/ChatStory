<template>
  <div class="bg-white w-72 p-5">
    <ui-select
      :model-value="activeElement"
      label="Element"
      class="w-full capitalize mb-4"
      @change="updateActiveElement"
    >
      <option v-for="element in elements" :key="element.id" :value="element.id">
        {{ element.name }}
      </option>
    </ui-select>
    <component
      v-bind="{ fonts, id: activeElementData.id }"
      :is="activeElementData.component"
    ></component>
  </div>
</template>
<script>
import { computed } from 'vue';
import ElementMain from './elements/ElementMain.vue';

export default {
  components: { ElementMain },
  props: {
    activeElement: {
      type: String,
      default: 'general',
    },
  },
  setup(props, { emit }) {
    const elements = [
      { id: 'general', name: 'general', component: 'element-main' },
      { id: 'annotation', name: 'annotation' },
      { id: 'navigation', name: 'navigation' },
      { id: 'chat-image', name: 'chat image' },
      { id: 'main-character', name: 'main character chat' },
      { id: 'character-chat', name: 'character chat' },
      { id: 'profile-picture', name: 'profile picture' },
      { id: 'option', name: 'option' },
    ].sort((a, b) => (a.name > b.name ? 1 : -1));
    const fonts = ['Poppins', 'DotGothic16', 'Lato', 'Montserrat', 'Open Sans'];

    const activeElementData = computed(() => elements.find(({ id }) => props.activeElement === id));

    function updateActiveElement(id) {
      emit('update:activeElement', id);
    }

    return {
      fonts,
      elements,
      activeElementData,
      updateActiveElement,
    };
  },
};
</script>
