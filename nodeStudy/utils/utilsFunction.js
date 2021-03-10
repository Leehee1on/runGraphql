export const totalPage = (arrLength, listLength) => {
  if (listLength === null || listLength === undefined) return null;
  return Math.ceil(arrLength / listLength);
};

export const slideArr = (arr, listLength, index) => {
  if (listLength === null || listLength === undefined) return arr;
  if (index === null || index === undefined) return arr;
  if (Number(index) === 1) {
    return arr.slice(0, listLength);
  } else if (totalPage(arr.length / listLength) === index) {
    return arr.slice(listLength * (index - 1), listLength * index);
  } else {
    return arr.slice(listLength * (index - 1), listLength * index);
  }
};
