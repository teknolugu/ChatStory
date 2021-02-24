<template>
  <div class="editor-characters p-5 container">
    <h3 class="text-xl mb-6">Characters</h3>
    <div class="grid grid-cols-5 gap-4">
      <ui-card class="flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer">
        <div class="inline-block p-4 bg-primary bg-opacity-20 rounded-full text-primary">
          <ui-icon name="plus" size="36"></ui-icon>
        </div>
        <p class="text-lg mt-4">Add Character</p>
      </ui-card>
      <ui-card
        v-for="character in characters"
        :key="character.id"
        class="text-center"
        hover
      >
        <img
          :src="character.profileUrl"
          class="h-14 w-14 rounded-full mx-auto"
          :alt="character.name"
        />
        <p class="text-lg mt-2">{{ character.name }}</p>
        <div class="flex mt-6 items-center">
          <ui-button class="flex-1">
            <ui-icon size="20" name="pencil" class="mr-2 -ml-1"></ui-icon>
            <span>Edit</span>
          </ui-button>
          <ui-button icon class="text-red-500 ml-2">
            <ui-icon name="trash"></ui-icon>
          </ui-button>
        </div>
      </ui-card>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Character from '@/models/character';

export default {
  setup() {
    const route = useRoute();

    const characters = computed(() => {
      const storyId = route.params.storyid;

      return Character.query().where('storyId', storyId).get();
    });

    return {
      characters,
    };
  },
};
</script>
