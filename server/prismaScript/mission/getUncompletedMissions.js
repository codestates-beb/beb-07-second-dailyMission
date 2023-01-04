const prisma = require('../../prisma/prisma');

const getUncompletedMissions = async () => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        isComplete: false,
      },
    });
    return missions;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { getUncompletedMissions };
