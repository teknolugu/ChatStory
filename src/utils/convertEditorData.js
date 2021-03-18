import Node from '@/models/Node';

function toNode(storyId, drawflowData) {
  const nodes = Node.query().where('storyId', storyId).get();
  const { data } = drawflowData.drawflow.Home;

  nodes.forEach(({ id, type }) => {
    if (!data[id]) return;

    const { inputs, outputs, pos_y, pos_x } = data[id];

    Node.update({
      where: (node) => node.id === id && node.storyId === storyId,
      data: { inputs, outputs, pos_x, pos_y },
    });
  });
  console.log(Node.all(), data);
}
function toDrawflow(nodes) {
  const data = nodes.reduce((obj, node) => {
    obj[node.id] = {
      ...node,
      data: {},
      class: node.type,
      html: node.type,
      name: node.type,
      typenode: 'vue',
    };
    return obj;
  }, {});

  return {
    drawflow: {
      Home: {
        data,
      },
    },
  };
}

export default {
  toNode,
  toDrawflow,
};
