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
    const { missionId } = req.query;
    try {
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
    const { userId, title, reward, recruitCount, content, endDate } = req.body;
    try {
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

// 일정 개수만큼 mission 목록 가져오기 단, isComplete는 false인걸 -> mission 페이지에 보이도록
const missions = async (req, res) => {
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
};

const newMission = async (req, res) => {
  const { userId, title, reward, recruitCount, content, endDate } = req.body;
  try {
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
};

const missionDetail = async (req, res) => {
  const { missionId } = req.query;
  try {
    const missionDetailRes = await prisma.mission.findUnique({
      where: { id: missionId },
    });
    const commentRes = await prisma.comment.findMany({
      where: { missionId: missionId },
    });
    // console.log(commentRes);
    missionDetailRes.comments = commentRes;
    return missionDetailRes;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const req = {
  body: {
    userId: "bbabi",
    title: "omg",
    reward: 100,
    recruitCount: 10,
    content: "adfads asdfasdf asdfasdf",
    endDate: "230103",
  },
  query: {
    missionId: 1,
  },
};

// newMission(req).then((res) => console.log(res));
missionDetail(req).then((res) => console.log(res));
// missions().then((res) => console.log(res));

// client/mission에 접근시 client에서 server/mission로 요청
// server/mission => array of mission 반환
// const [missions, setMissions] = useState() 뭐 이런식
// missions.map(()) 해서 각 컴포넌트에 props 뿌림
// 컴포넌트는 Link to='/mission/detail?missionId=#로 연결 이거도 props로 뿌림.
// 위의 페이지에서는 missionId를 받아와서 mission data + comment data 가져오기
