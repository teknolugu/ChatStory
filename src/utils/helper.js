export function convertToCssObject(obj) {
  const copyObj = { ...obj };

  copyObj.fontFamily = `'${obj.fontFamily}', sans-serif`;
  copyObj.color = obj.textColor;
  console.log(copyObj);
  return copyObj;
}
