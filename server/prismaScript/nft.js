const prisma = require('../prisma/prisma');

const getMinted = async () => {
  try {
    const minted = await prisma.nFT.findMany({});
    return minted;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const mint = async (tokenId) => {
  try {
    const mintRes = await prisma.nFT.create({ data: { tokenId } });
    return { status: 'success', message: mintRes };
  } catch (e) {
    console.log(e);
    return { status: 'fail', message: 'fail' };
  }
};

module.exports = {
  getMinted,
  mint,
};
