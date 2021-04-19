<template>
  <div class="relative content h-full editor-story flex items-stretch">
    <node-list></node-list>
    <div id="drawflow" class="parent-drawflow flex-1" @drop="dropHandler" @dragover="allowDrop">
      <div class="bg-white rounded-xl p-2 absolute bottom-0 m-5 shadow-xl right-0 z-10">
        <button class="border-r pr-2 focus:outline-none" @click="editor.zoom_out()">
          <ui-icon name="minus"></ui-icon>
        </button>
        <button class="pl-2 focus:outline-none" @click="editor.zoom_in()">
          <ui-icon name="plus"></ui-icon>
        </button>
      </div>
    </div>
    <chat-properties v-bind="{ editor }"></chat-properties>
    <settings-modal></settings-modal>
  </div>
</template>
<script>
import { onMounted, shallowRef, onDeactivated } from 'vue';
import { useRoute } from 'vue-router';
import emitter from 'tiny-emitter/instance';
import NodeList from './NodeList.vue';
import ChatProperties from './ChatProperties/index.vue';
import SettingsModal from './SettingsModal.vue';
import Node from '@/models/node';
import initDrawflow from '@/utils/initDrawflow';
import addNodeToDrawflow from '@/utils/addNodeToDrawflow';
import convertEditorData from '@/utils/convertEditorData';

export default {
  components: { NodeList, ChatProperties, SettingsModal },
  setup() {
    const editor = shallowRef(null);
    const route = useRoute();

    const storyId = route.params.storyid;

    function dropHandler({ dataTransfer, clientX, clientY }) {
      const name = dataTransfer.getData('node');

      if (!name) return;

      addNodeToDrawflow({ editor: editor.value, clientX, clientY, name });
    }
    function allowDrop(event) {
      event.preventDefault();
    }

    emitter.on('save-node', (callback) => {
      convertEditorData.toNode(storyId, editor.value.export()).then(() => {
        callback && callback();
      });
    });

    onMounted(() => {
      const nodes = Node.query().where('storyId', storyId).get();
      const drawflowData = convertEditorData.toDrawflow(nodes);

      editor.value = initDrawflow({
        element: document.querySelector('#drawflow'),
        storyId,
        data: drawflowData,
      });
    });
    onDeactivated(() => {
      convertEditorData.toNode(storyId, editor.value.export());
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

