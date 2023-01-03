const { sha256 } = require("js-sha256").sha256;

module.exports = {
  timeFormatted: () => {
    const now = new Date();
    const [day, time] = now.toISOString().split("T");
    return day.split("-").join("") + time.split(":").slice(0, 2).join("");
  },

  passwordHashed: (id, password) => {
    return sha256(id + password);
  },
};
