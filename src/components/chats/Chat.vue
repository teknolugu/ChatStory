<template>
  <div
    v-once
    class="flex items-start chat"
    :class="[
      { 'main-character': data.isMainCharacter },
      data.isPreviousCharacter ? 'mt-1' : 'mt-2',
    ]"
  >
    <img
      v-if="character"
      :src="character.profileUrl"
      class="h-10 w-10 chat__profile-picture"
      :class="{ invisible: data.isPreviousCharacter }"
      :style="convertToCss(style.profilePicture)"
    />
    <div class="chat__content">
      <p v-if="character && !data.isPreviousCharacter">{{ character.name }}</p>
      <p
        v-if="data.message"
        class="py-2 px-3 inline-block"
        :style="convertToCss(data.isMainCharacter ? style.mainCharacter : style.characterChat)"
      >
        {{ data.message }}
      </p>
      <img
        v-if="data.imageUrl"
        :src="data.imageUrl"
        class="max-w-full mt-1"
        :style="convertToCss(style.chatImage)"
      />
    </div>
  </div>
</template>
<script>
import { computed, shallowReactive, onMounted } from 'vue';
import Character from '@/models/character';
import { convertToCss } from '@/utils/helper';

export default {
  props: {
    style: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const character = computed(() => Character.find(props.data.characterId));

    return {
      character,
      convertToCss,
    };
  },
};
</script>
<style scoped>
.chat {
  @apply pr-10;
}
.chat .chat__content {
  @apply ml-2;
}

.chat.main-character {
  @apply pl-10 pr-0 flex-row-reverse;
  justify-content: end;
}
.chat.main-character .chat__content {
  @apply text-right mr-2 ml-0;
}
</style>
