import { nanoid } from 'nanoid';
import { ref } from 'vue';
import { nodes } from './shared';

export default function ({ name, editor, clientX, clientY }) {
  const nodeId = nanoid();
  const { input, output, data } = nodes[name];

  const xPosition =
    clientX * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) -
    editor.precanvas.getBoundingClientRect().x *
      (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom));
  const yPosition =
    clientY * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) -
    editor.precanvas.getBoundingClientRect().y *
      (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom));

  editor.addNode(name, input, output, xPosition, yPosition, name, ref(data), name, 'vue');
}
