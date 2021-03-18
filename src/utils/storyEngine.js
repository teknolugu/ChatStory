class Node {
  findNodeBy(key, value) {
    return this.story.nodes.find((node) => node[key] === value);
  }

  chatNode({ outputs, data }) {
    return new Promise((resolve) => {
      const { connections } = outputs.output_1;

      data.chats.forEach((chat) => {
        this.addChat({ ...chat, type: 'chat' });
      });

      resolve(connections[0].node);
    });
  }
  startNode({ outputs }) {
    return new Promise((resolve) => {
      const nodeId = outputs.output_1.connections[0]?.node;

      resolve(nodeId);
    });
  }
  annotationNode({ outputs, data }) {
    return new Promise((resolve) => {
      this.addChat({
        type: 'annotation',
        text: data.text,
      });

      resolve(outputs.output_1.connections[0]?.node);
    });
  }
  optionNode({ outputs, data, id }) {
    return new Promise((resolve) => {
      const options = Object.values(outputs).reduce((arr, { connections }, index) => {
        const nodeId = connections[0]?.node;

        if (nodeId) {
          arr.push({
            id: nodeId,
            type: 'option',
            text: data.options[index],
          });
        }

        return arr;
      }, []);

      this.addChat({
        type: 'options',
        options,
      });

      resolve();
    });
  }
  endNode() {
    return new Promise((resolve) => {
      this.addChat({
        type: 'ending',
      });

      resolve();
    });
  }
}

class Story extends Node {
  constructor(story, chatContainer) {
    super();
    this.story = story;

    this.chats = [];
    this.events = {};
    this.chatIndex = 0;
    this.isDestroyed = false;
    this.chatContainer = chatContainer;

    this.chatHandler();
  }

  start(id) {
    const startNode = this.findNodeBy('name', 'start');
    const paramNode = this.findNodeBy('id', id);
    const node = paramNode ? paramNode : startNode;

    if (!node) {
      console.error(`Can't find the start node or the ID that you passing is not found`);
      return;
    }

    this.nodeHandler(node);
  }
  nodeHandler(node) {
    if (!node) return;

    const eventName = `${node.type}Node`;
    const event = this[eventName] && this[eventName](node);

    event?.then((nextNodeId) => {
      if (nextNodeId === 'end') {
        this.destroy();
        return;
      }

      if (!nextNodeId) return;

      const nextNode = this.findNodeBy('id', nextNodeId);

      this.nodeHandler(nextNode);
    });
  }
  chatHandler() {
    if (this.isDestroyed) return;

    const currentChat = this.chats[this.chatIndex];

    if (currentChat) {
      const { type } = currentChat;

      if (type === 'options') {
        this.dispatch('options', currentChat.options);
      } else if (type === 'ending') {
        this.dispatch('chat-added', currentChat);
        this.destroy();
        console.log('and in the end...');
        return;
      } else {
        this.dispatch('chat-added', currentChat);
      }

      this.chatIndex += 1;
    }

    const chatDelay = this.story.settings?.chatDelay ?? 1000;
    const timeout = setTimeout(() => {
      this.chatHandler();
    }, chatDelay);

    this.chatContainer.onclick = () => {
      this.chatHandler();
      clearTimeout(timeout);
    };
  }

  on(name, callback) {
    if (typeof callback !== 'function') {
      console.error('The callback must be a function');
      return;
    }

    if (typeof name !== 'string') {
      console.error('The event name must be a string');
      return;
    }

    if (!this.events[name]) {
      this.events[name] = {
        listeners: [],
      };
    }

    this.events[name].listeners.push(callback);
  }
  dispatch(name, param) {
    if (!this.events[name]) return;

    this.events[name].listeners.forEach((event) => {
      event(param);
    });
  }
  addChat(chat) {
    if (chat.type === 'chat') {
      const isPreviousCharacter =
        this.chats[this.chats.length - 1]?.characterId === chat.characterId;

      this.chats.push({
        isMainCharacter: this.story.mainCharacter === chat.characterId,
        isPreviousCharacter,
        ...chat,
      });
    } else {
      this.chats.push(chat);
    }
  }
  destroy() {
    this.isDestroyed = true;
    this.chats = [];
    this.events = {};
    this.chatIndex = 0;
    this.chatContainer.onclick = null;
  }
}

export default Story;
