const mergeDateTime = (date, time) => {
  return date.split("-").join("") + time.split(":").join("");
};

const checkUndefine = (...args) => {
  for (let arg of args) {
    if (arg === undefined) return true;
  }
  return false;
};

export { mergeDateTime, checkUndefine };
