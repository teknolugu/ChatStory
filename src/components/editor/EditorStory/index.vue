<template>
  <div class="content h-full editor-story flex items-stretch">
    <node-list></node-list>
    <div id="drawflow" class="flex-1 relative" @drop="dropHandler" @dragover="allowDrop">
      <div class="bg-white rounded-xl p-2 absolute bottom-0 m-5 shadow-xl right-0 z-10">
        <button class="border-r pr-2 focus:outline-none" @click="editor.zoom_out()">
          <ui-icon name="minus"></ui-icon>
        </button>
        <button class="pl-2 focus:outline-none" @click="editor.zoom_in()">
          <ui-icon name="plus"></ui-icon>
        </button>
      </div>
      <chat-properties v-bind="{ editor }"></chat-properties>
    </div>
    <settings-modal></settings-modal>
  </div>
</template>
<script>
import { onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import NodeList from './NodeList.vue';
import ChatProperties from './ChatProperties/index.vue';
import SettingsModal from './SettingsModal.vue';
import initDrawflow from '@/utils/initDrawflow';
import addNodeToDrawflow from '@/utils/addNodeToDrawflow';

export default {
  components: { NodeList, ChatProperties, SettingsModal },
  setup() {
    const editor = shallowRef(null);
    const route = useRoute();

    function dropHandler({ dataTransfer, clientX, clientY }) {
      const name = dataTransfer.getData('node');

      if (!name) return;

      addNodeToDrawflow({ editor: editor.value, clientX, clientY, name });
    }
    function allowDrop(event) {
      event.preventDefault();
    }

    onMounted(() => {
      const storyId = route.params.storyid;
      editor.value = initDrawflow(document.querySelector('#drawflow'), storyId);
      console.log(editor.value);
    });

    return {
      editor,
      allowDrop,
      dropHandler,
    };
  },
};
</script>
<style type="text/css">
.editor-story {
  background-image: url('../../../assets/images/tile.png');
  background-size: 30px 30px;
  background-repeat: repeat;
}
</style>

