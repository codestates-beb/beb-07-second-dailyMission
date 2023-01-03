const prisma = require('../prisma/prisma');
const getUserById = async (userId) => {
  try {
    const getUserRes = await prisma.user.findUnique({ where: { userId } });
    return getUserRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { getUserById };
