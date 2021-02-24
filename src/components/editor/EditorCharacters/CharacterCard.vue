<template>
  <ui-card hover>
    <template v-if="isEditing">
      <ui-input label="Profile URL"></ui-input>
      <ui-input label="Name"></ui-input>
    </template>
    <template v-else>
      <img
        :src="character.profileUrl"
        class="h-14 w-14 rounded-full mx-auto"
        :alt="character.name"
      />
      <p class="text-lg mt-2">{{ character.name }}</p>
    </template>
    <div class="flex mt-6 items-center">
      <template v-if="isEditing">
        <ui-button class="flex-1" variant="primary">
          Save
        </ui-button>
        <ui-button icon class="ml-2" @click="isEditing = false">
          <ui-icon name="x"></ui-icon>
        </ui-button>
      </template>
      <template v-else>
        <ui-button class="flex-1" @click="isEditing = true">
          <ui-icon size="20" name="pencil" class="mr-2 -ml-1"></ui-icon>
          <span>Edit</span>
        </ui-button>
        <ui-button icon class="text-red-500 ml-2">
          <ui-icon name="trash"></ui-icon>
        </ui-button>
      </template>
    </div>
  </ui-card>
</template>
<script>
import { ref } from 'vue';

export default {
  props: {
    character: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const isEditing = ref(false);

    return {
      isEditing,
    };
  },
};
</script>
