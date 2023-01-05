const { sha256 } = require('js-sha256').sha256;
const prisma = require('../prisma/prisma');

module.exports = {
  timeFormatted: () => {
    const utc = new Date().getTime();
    const timeDiff = 9 * 60 * 60 * 1000;
    const now = new Date(utc + timeDiff);
    const [day, time] = now.toISOString().split('T');
    return day.split('-').join('') + time.split(':').slice(0, 2).join('');
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
};
