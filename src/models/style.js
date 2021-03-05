import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';

class Style extends Model {
  static entity = 'styles';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      storyId: this.attr(null),
      general: this.attr({
        fontFamily: 'Poppins',
        textColor: '#fff',
        backgroundColor: '#1e293b',
      }),
      option: this.attr({
        textColor: '#fff',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        borderRadius: [12, 6, 12, 12],
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        borderStyle: 'solid',
      }),
      annotation: this.attr({
        textColor: '#ddd',
        backgroundColor: '#2d3749',
        borderRadius: [4, 4, 4, 4],
        borderColor: '#000',
        borderWidth: 0,
        borderStyle: 'none',
      }),
      navigation: this.attr({
        textColor: '#fff',
        backgroundColor: '#111827',
        borderRadius: [4, 4, 4, 4],
        borderColor: '#000',
        borderWidth: 0,
        borderStyle: 'none',
      }),
      chatImage: this.attr({
        borderRadius: [12, 12, 12, 12],
        borderColor: '#000',
        borderWidth: 0,
        borderStyle: 'none',
      }),
      mainCharacter: this.attr({
        textColor: '#fff',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderRadius: [12, 6, 12, 12],
        borderColor: 'rgba(59, 130, 246, 0.4)',
        borderWidth: 2,
        borderStyle: 'solid',
      }),
      characterChat: this.attr({
        textColor: '#fff',
        backgroundColor: 'rgb(75, 85, 99)',
        borderRadius: [6, 12, 12, 12],
        borderColor: 'rgb(55, 65, 81)',
        borderWidth: 2,
        borderStyle: 'solid',
      }),
      profilePicture: this.attr({
        borderRadius: [9999, 9999, 9999, 9999],
        borderColor: '#000',
        borderWidth: 0,
        borderStyle: 'none',
      }),
    };
  }
}

export default Style;
