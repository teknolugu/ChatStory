<template>
  <div class="bg-white w-72 p-5">
    <ui-select
      @change="updateActiveElement"
      :model-value="activeElement"
      label="Element"
      class="w-full capitalize"
    >
      <option
        v-for="element in elements"
        :key="element.id"
        :value="element.id"
      >
        {{ element.name }}
      </option>
    </ui-select>
  </div>
</template>
<script>
export default {
  props: {
    activeElement: {
      type: String,
      default: 'general',
    },
  },
  setup(props, { emit }) {
    const elements = [
      { id: 'general', name: 'general' },
      { id: 'annotation', name: 'annotation' },
      { id: 'navigation', name: 'navigation' },
      { id: 'chat-image', name: 'chat image' },
      { id: 'main-character', name: 'main character chat' },
      { id: 'character-chat', name: 'character chat' },
      { id: 'profile-picture', name: 'profile picture' },
      { id: 'option', name: 'option' },
    ].sort((a, b) => a.name > b.name ? 1 : -1);

    function updateActiveElement(id) {
      emit('update:activeElement', id);
    }

    return {
      elements,
      updateActiveElement,
    };
  },
};
</script>
