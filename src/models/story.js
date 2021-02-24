import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';
import Character from './character';
import Node from './node';

class Story extends Model {
  static entity = 'stories';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      title: this.string(''),
      description: this.string(''),
      characters: this.hasMany(Character, 'storyId'),
      nodes: this.hasMany(Node, 'storyId'),
    };
  }
}

export default Story;
