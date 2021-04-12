import { Model } from '@vuex-orm/core';

class Progress extends Model {
  static primaryKey = '_id'

  static entity = 'progresses'

  static fields() {
    return {
      options: this.attr([]),
      storyId: this.attr(null),
      isFinished: this.boolean(false),
    };
  }
}

export default Progress;
