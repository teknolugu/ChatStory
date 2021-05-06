import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';

class Setting extends Model {
  static entity = 'settings';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      backgroundMusic: this.string(''),
      chatDelay: this.number(1000),
      storyId: this.attr(null),
      autoPlay: this.boolean(true),
    };
  }
}

export default Setting;
