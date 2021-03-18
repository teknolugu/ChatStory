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
      outputs: this.attr(null),
      inputs: this.attr(null),
      pos_x: this.number(0),
      pos_y: this.number(0),
    };
  }
}

export default Node;
