<template>
  <transition name="ending" appear @after-enter="transitionComplete">
    <div
      v-if="show"
      class="bg-white absolute h-full w-full top-0 ending left-0 text-gray-700 p-5 overflow-auto"
      :class="{ 'flex items-center justify-center': !data.text }"
    >
      <template v-if="data.text">
        <div class="flex items-center mb-6">
          <p class="font-semibold flex-grow text-lg">The End</p>
          <ui-icon name="x" class="cursor-pointer" @click="show = false"></ui-icon>
        </div>
        <p>{{ data.text }}</p>
      </template>
      <p v-else class="text-2xl">The End</p>
    </div>
  </transition>
</template>
<script>
import { shallowRef } from 'vue';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const show = shallowRef(true);

    function transitionComplete() {
      setTimeout(() => {
        if (!props.data.text) {
          show.value = false;
        }
      }, 2000);
    }

    return {
      show,
      transitionComplete,
    };
  },
};
</script>
<style scoped>
.ending-enter-active {
  transition: all 2s ease-out;
}

.ending-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.ending-enter-from,
.ending-leave-to {
  opacity: 0;
}
</style>
