const prisma = require("../prisma/prisma");

module.exports = {
  missions: missions,
  missionDetail: async () => {},
  newMission: async () => {},
};

const missions = async (data) => {
  const { userId, password, userName, address } = data;
  try {
    const newUserRes = await prisma.user.create({
      data: {
        userId,
        password,
        userName,
        address,
      },
    });
    return newUserRes;
  } catch (e) {
    console.log(e);
  }
};
