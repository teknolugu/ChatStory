import * as Vue from 'vue';
import Drawflow from 'drawflow';
import NodeStart from '@/components/nodes/NodeStart.vue';
import NodeChat from '@/components/nodes/NodeChat.vue';
import NodeOption from '@/components/nodes/NodeOption.vue';
import NodeEnd from '@/components/nodes/NodeEnd.vue';
import NodeSettings from '@/components/nodes/NodeSettings.vue';
import NodeAnnotation from '@/components/nodes/NodeAnnotation.vue';
import NodeTransition from '@/components/nodes/NodeTransition.vue';
import { nodes } from './shared';
import Node from '@/models/node';
import '@/assets/css/drawflow.css';

export default function ({ element, storyId, data }) {
  const editor = new Drawflow(element, Vue);
  const componentProps = { editor, name: 'test' };

  editor.useuuid = true;

  editor.start();

  editor.registerNode('start', NodeStart);
  editor.registerNode('settings', NodeSettings);
  editor.registerNode('chat', NodeChat, componentProps, {});
  editor.registerNode('option', NodeOption, componentProps, {});
  editor.registerNode('annotation', NodeAnnotation, componentProps, {});
  editor.registerNode('transition', NodeTransition, componentProps, {});
  editor.registerNode('end', NodeEnd);

  editor.removeNodeId = function (id) {
    const nodeId = id.slice(5);
    const moduleName = this.getModuleFromNodeId(nodeId);
    const data = this.drawflow.drawflow[moduleName].data[nodeId];

    if (data.name !== 'start') {
      this.removeConnectionNodeId(id);

      if (this.module === moduleName) {
        document.getElementById(id).remove();
      }

      delete this.drawflow.drawflow[moduleName].data[nodeId];

      this.dispatch('nodeRemoved', nodeId);
      Node.delete(nodeId);
    }
  };

  editor.on('connectionCreated', ({ output_id, input_id, output_class, input_class }) => {
    const { name: outputName, outputs } = editor.getNodeFromId(output_id);
    const { name: inputName } = editor.getNodeFromId(input_id);
    const { allowedInput, maxConnection } = nodes[outputName];
    const isAllowed = allowedInput.includes(inputName);
    const isMaxConnections = outputs[output_class].connections.length > maxConnection;

    if (!isAllowed || isMaxConnections) {
      editor.removeSingleConnection(output_id, input_id, output_class, input_class);
    }
  });
  editor.on('nodeCreated', (id) => {
    const { name } = editor.getNodeFromId(id);
    const nodeData = nodes[name]?.data || null;

    if (name === 'settings') return;

    Node.insert({
      data: {
        id,
        data: nodeData,
        storyId,
        type: name,
      },
    });
  });

  if (data) {
    editor.import(data);
  }

  if (editor.getNodesFromName('start').length === 0) {
    editor.addNode('start', 0, 1, 50, 200, 'start', {}, 'start', 'vue');
  }
  editor.addNode('settings', 0, 0, 50, 360, 'settings', {}, 'settings', 'vue');

  return editor;
}
