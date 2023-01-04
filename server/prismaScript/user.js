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

const isWalletExist = async (walletAddr) => {
  try {
    const wallet = await prisma.user.findFirst({
      where: {
        address: walletAddr,
      },
    });
    return wallet;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { getUserById, isWalletExist };
