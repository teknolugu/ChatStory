import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';

class Character extends Model {
  static entity = 'characters';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      name: this.string(''),
      profileUrl: this.string(''),
      storyId: this.attr(null),
    };
  }
}

export default Character;
