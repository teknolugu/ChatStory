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
