const { sha256 } = require("js-sha256").sha256;
const prisma = require("../prisma/prisma");

module.exports = {
  timeFormatted: (time) => {
    const [day, hour] = time.toISOString().split("T");
    return day.split("-").join("") + hour.split(":").slice(0, 2).join("");
  },

  passwordHashed: (id, password) => {
    return sha256(id + password);
  },

  getPasswordByAddr: async (address) => {
    try {
      const password = await prisma.user.findMany({
        where: {
          address: address,
        },
      });
      return password[0].password;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  checkBodyElements: (body, ...elements) => {
    const { ...args } = body;
    for (let el of elements) {
      if (!Object.keys(query).includes(el)) {
        return { status: false, message: `Missing ${el}` };
      }
    }
    return { status: true };
  },
};
