import bcrypt from "bcrypt";

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

export const bcryptPassword = (password) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, encryptedPassword) => {
      return encryptedPassword;
    });
  });
};

export const getCurrentDate = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let today = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
};
