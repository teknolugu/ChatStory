import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';
import Character from './character';
import Node from './node';
import Style from './style';
import Setting from './setting';
import Progress from './progress';

class Story extends Model {
  static entity = 'stories';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      title: this.string(''),
      description: this.string(''),
      author: this.attr(null),
      createdAt: this.attr(''),
      mainCharacter: this.string(''),
      category: this.string(''),
      bannerImage: this.string(''),
      iconImage: this.string(''),
      data: this.string(''),
      likeCount: this.number(0),
      playedCount: this.number(0),
      isDataRetrieved: this.boolean(false),
      isLiked: this.boolean(false),
      isInCollection: this.boolean(false),
      characters: this.hasMany(Character, 'storyId'),
      nodes: this.hasMany(Node, 'storyId'),
      style: this.hasOne(Style, 'storyId'),
      setting: this.hasOne(Setting, 'storyId'),
      progress: this.hasOne(Progress, 'storyId'),
    };
  }
}

export default Story;
