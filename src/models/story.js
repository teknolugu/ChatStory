import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';
import Character from './character';
import Node from './node';
import Style from './style';
import Setting from './setting';

class Story extends Model {
  static entity = 'stories';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      title: this.string(''),
      description: this.string(''),
      mainCharacter: this.string(''),
      category: this.string(''),
      tags: this.string(''),
      images: this.attr(['']),
      characters: this.hasMany(Character, 'storyId'),
      nodes: this.hasMany(Node, 'storyId'),
      style: this.hasOne(Style, 'storyId'),
      setting: this.hasOne(Setting, 'storyId'),
    };
  }
}

export default Story;
