class Node {
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

      if (this.progress.length !== 0) {
        const currentOption = this.progress.shift();
        const selectedOption = options.find(({ id }) => id === currentOption);

        if (!selectedOption) {
          this.loadProgress = false;

          return resolve();
        }

        this.addChat({
          type: 'chat',
          message: selectedOption.text,
          characterId: this.story.mainCharacter,
        });

        if (this.progress.length === 0) {
          this.dispatch('progress-loaded', this.chats);
          this.chats = [];
          this.loadProgress = false;
        }

        resolve(selectedOption.id);
      } else {
        this.addChat({
          type: 'options',
          options,
        });

        resolve();
      }
    });
  }
  endNode(node) {
    return new Promise((resolve) => {
      this.addChat({
        text: node.data?.text ?? '',
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
    this.progress = [];
    this.isDestroyed = false;
    this.loadProgress = false;
    this.chatContainer = chatContainer;
    this.backgroundMusic = null;

    this.init();
  }

  init() {
    this.chatHandler();

    if (this.story.setting?.backgroundMusic) {
      this.backgroundMusic = new Audio(this.story.setting.backgroundMusic);
      this.backgroundMusic.loop = true;
      this.backgroundMusic.play();
    }
  }

  start(id) {
    const startNode = this.findNodeBy('type', 'start');
    const paramNode = this.findNodeBy('id', id);
    const node = paramNode || startNode;

    if (!node) {
      console.error(`Can't find the start node or the ID that you passing is not found`);
      return;
    }

    this.nodeHandler(node);
  }
  nodeHandler(node) {
    if (!node || this.isDestroyed) return;

    const eventName = `${node.type}Node`;
    const event = this[eventName] && this[eventName](node);

    event?.then((nextNodeId) => {
      if (!nextNodeId) return;

      const nextNode = this.findNodeBy('id', nextNodeId);

      this.nodeHandler(nextNode);
    });
  }
  chatHandler() {
    if (this.isDestroyed) return;

    const currentChat = this.chats.shift();

    if (currentChat && !this.loadProgress) {
      const { type } = currentChat;

      if (type === 'options') {
        this.dispatch('options', currentChat.options);
      } else if (type === 'ending') {
        this.dispatch('chat-added', currentChat);
        this.dispatch('end');
        this.destroy();
        return;
      } else {
        this.dispatch('chat-added', currentChat);
      }
    }

    if (this.story.setting?.autoPlay) {
      const chatDelay = this.story.setting?.chatDelay ?? 1000;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.chatHandler();
      }, chatDelay);

      this.chatContainer.onclick = () => {
        clearTimeout(timeout);
        this.chatHandler();
      };
    } else {
      this.chatContainer.onclick = this.chatHandler.bind(this);
    }
  }
  findNodeBy(key, value) {
    return this.story.nodes.find((node) => node[key] === value);
  }

  playBackgroundMusic(play = true) {
    if (!this.backgroundMusic) return;

    play ? this.backgroundMusic.play() : this.backgroundMusic.pause();
  }
  load(progress = []) {
    const startNode = this.findNodeBy('type', 'start');

    if (!startNode || !Array.isArray(progress)) {
      return console.error('Start node is not found');
    }

    this.progress = progress;
    this.loadProgress = true;
    this.nodeHandler(startNode);
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
    this.chatContainer.onclick = null;
    this.backgroundMusic?.pause();
    this.backgroundMusic = null;
  }
}

export default Story;
