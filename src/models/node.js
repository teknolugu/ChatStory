import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';

class Node extends Model {
  static entity = 'nodes';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      type: this.string(''),
      storyId: this.attr(null),
      data: this.attr(null),
    };
  }
}

export default Node;
