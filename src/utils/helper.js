import { helpers } from '@vuelidate/validators';

export function isAllEqual(array) {
  return array.every((item) => array[0] === item);
}

export function convertToCss(obj) {
  if (!obj) return;

  const copyObj = { ...obj };

  if (obj.fontFamily) {
    copyObj.fontFamily = `'${obj.fontFamily}', sans-serif`;
  }
  if (obj.textColor) {
    copyObj.color = obj.textColor;
  }
  if (obj.borderRadius) {
    copyObj.borderRadius = obj.borderRadius.map((num) => `${num}px`).join(' ');
  }
  if (obj.borderWidth) {
    copyObj.borderWidth = `${obj.borderWidth}px`;
  }

  return copyObj;
}

export function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export const usernameValidation = helpers.withMessage(
  "Username can only contain letters, numbers and '_'",
  (value) => /^[a-zA-Z0-9\_]+$/.test(value)
);

export function convertStoryObj(story) {
  const copy = { ...story };

  const dataKeys = ['nodes', 'characters', 'style', 'setting'];
  const deleteKeys = [
    'isInCollection',
    'isLiked',
    'isDataRetrieved',
    'author',
    '$id',
    'id',
    'createdAt',
    'likeCount',
    'playedCount',
    'progress',
    ...dataKeys,
  ];

  copy.data = {};

  dataKeys.forEach((key) => {
    copy.data[key] = copy[key];

    if (Array.isArray(copy.data[key])) {
      copy.data[key].forEach((item) => {
        delete item.$id;
        delete item.storyId;
      });
    } else if (typeof copy.data[key] === 'object' && copy.data[key] !== null) {
      delete copy.data[key].storyId;
      delete copy.data[key].$id;
      delete copy.data[key].id;
    }
  });
  deleteKeys.forEach((key) => delete copy[key]);

  return copy;
}
