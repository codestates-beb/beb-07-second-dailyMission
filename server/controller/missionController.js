const prisma = require("../prisma/prisma");

module.exports = {
  missions: async (req, res) => {
    try {
      const missionsNotCompleted = await prisma.mission.findMany({
        where: {
          isComplete: false,
        },
      });
      res.send({ status: "success", message: missionsNotCompleted });
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Failed to call missions" });
    }
  },
  missionDetail: async (req, res) => {
    try {
      const { missionid } = req.query;
      const missionDetailRes = await prisma.mission.findUnique({
        where: { id: parseInt(missionid) },
      });
      if (missionDetailRes)
        res.send({ status: "success", message: missionDetailRes });
      else
        res.send({ status: "failed", message: "Failed to find the mission" });
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Failed to call the mission" });
    }
  },
  newMission: async (req, res) => {
    try {
      console.log(req.body);
      const { userId, title, reward, recruitCount, content, endDate } =
        req.body;

      // 잔고 체크 + address와 비밀번호를 가지고 total = reward + 35 token 송금.
      // contract.methods.balanceOf(address) 과 total 비교
      const address = await prisma.user.findUnique({
        where: { userId: userId },
      });

      data = {
        userId: userId,
        title: title,
        reward: parseInt(reward),
        recruitCount: parseInt(recruitCount),
        content: content,
        createdAt: new Date(),
        updatedAt: new Date(),
        endDate: endDate,
        isComplete: false,
      };
      const newMissionRes = await prisma.mission.create({ data: data });
      res.send({ status: "success", message: newMissionRes });
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Failed to add the mission" });
    }
  },
};

// client/mission에 접근시 client에서 server/mission로 요청
// server/mission => array of mission 반환
// const [missions, setMissions] = useState() 뭐 이런식
// missions.map(()) 해서 각 컴포넌트에 props 뿌림
// 컴포넌트는 Link to='/mission/detail?missionId=#로 연결 이거도 props로 뿌림.
// 위의 페이지에서는 missionId를 받아와서 mission data + comment data 가져오기
