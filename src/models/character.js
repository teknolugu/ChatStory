import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';
import Node from './node';

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

  static afterDelete(model) {
    const nodes = Node.query().where('storyId', model.storyId).get();

    nodes.forEach(({ id, data }) => {
      if (data === null) return;

      const chats = data?.chats.filter(({ characterId }) => characterId !== model.id);

      Node.update({
        where: id,
        data: {
          data: {
            chats,
          },
        },
      });
    });
  }
}

export default Character;
