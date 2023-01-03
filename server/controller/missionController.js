const prisma = require("../prisma/prisma");

module.exports = {
  missions: async (req, res) => {
    try {
      const missionsNotCompleted = await prisma.mission.findMany({
        where: {
          isComplete: false,
        },
      });
      return missionsNotCompleted;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  missionDetail: async (req, res) => {
    try {
      const { missionId } = req.query;
      const missionDetailRes = await prisma.mission.findUnique({
        where: { id: missionId },
      });
      return missionDetailRes;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  newMission: async (req, res) => {
    try {
      const { userId, title, reward, recruitCount, content, endDate } =
        req.body;
      data = {
        userId,
        title,
        reward,
        recruitCount,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        endDate,
        isComplete: false,
      };
      const newMissionRes = await prisma.mission.create({ data: data });
      return newMissionRes;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

// client/mission에 접근시 client에서 server/mission로 요청
// server/mission => array of mission 반환
// const [missions, setMissions] = useState() 뭐 이런식
// missions.map(()) 해서 각 컴포넌트에 props 뿌림
// 컴포넌트는 Link to='/mission/detail?missionId=#로 연결 이거도 props로 뿌림.
// 위의 페이지에서는 missionId를 받아와서 mission data + comment data 가져오기
