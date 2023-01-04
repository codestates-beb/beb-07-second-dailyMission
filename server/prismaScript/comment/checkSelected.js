const prisma = require('../../prisma/prisma');

const checkSelected = async (missionId) => {
  let missionData;
  let selectedAmount;
  try {
    missionData = await prisma.mission.findUnique({
      where: {
        id: missionId,
      },
    });
  } catch (e) {
    console.log(e);
    return null;
  }

  try {
    selectedAmount = await prisma.comment.count({
      where: {
        missionId,
        isSelected: true,
      },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
  return {
    recruitCount: missionData.recruitCount,
    selectedAmount,
  };
};

module.exports = { checkSelected };
