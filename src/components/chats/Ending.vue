<template>
  <transition name="ending" appear @after-enter="transitionComplete">
    <div
      v-if="show"
      class="bg-white absolute h-full w-full top-0 ending left-0 flex justify-center items-center text-gray-700"
    >
      <p class="text-2xl">The End?</p>
    </div>
  </transition>
</template>
<script>
import { shallowRef } from 'vue';

export default {
  setup() {
    const show = shallowRef(true);

    function transitionComplete() {
      setTimeout(() => {
        show.value = false;
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
