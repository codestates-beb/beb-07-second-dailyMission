const prisma = require('../../prisma/prisma');

const getCommentsById = async (missionId) => {
  try {
    const getCommentsRes = await prisma.comment.findMany({
      where: {
        missionId,
      },
    });
    return getCommentsRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { getCommentsById };
