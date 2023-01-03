const prisma = require('../../prisma/prisma');

const setComplete = async (missionId) => {
  try {
    const settingRes = await prisma.mission.update({
      where: {
        id: missionId,
      },
      data: {
        isComplete: true,
      },
    });
    return settingRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getMission = async (missionId) => {
  try {
    const missionData = await prisma.mission.findUnique({
      where: {
        id: missionId,
      },
    });
    return missionData;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { setComplete, getMission };
