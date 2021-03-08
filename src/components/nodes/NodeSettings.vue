<template>
  <div
    class="p-5 flex items-center h-full justify-center cursor-pointer"
    style="height: 100px"
    @click="showModal"
  >
    <div
      class="p-2 bg-gradient-to-br text-white rounded-xl inline-block from-green-400 to-cyan-500"
    >
      <ui-icon name="cog" size="32"></ui-icon>
    </div>
    <p class="text-xl ml-4">Settings</p>
  </div>
</template>
<script>
import { ref } from 'vue';
import UiIcon from '../ui/Icon.vue';
import emitter from 'tiny-emitter/instance';

export default {
  components: { UiIcon },
  setup() {
    function showModal() {
      emitter.emit('settings-modal');
    }

    return {
      showModal,
    };
  },
};
</script>
