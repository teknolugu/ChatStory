export function isAllEqual(array) {
  return array.every((item) => array[0] === item);
}

export function convertToCss(obj) {
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
