const prisma = require('../prisma/prisma');
const { timeFormatted } = require('../utils/utils');
const { openMission } = require('../utils/transaction');

const missionFee = 35;

module.exports = {
  missions: async (req, res) => {
    try {
      const missionsNotCompleted = await prisma.mission.findMany({
        where: {
          isComplete: false,
        },
      });
      return res
        .status(200)
        .send({ status: 'success', message: missionsNotCompleted });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .send({ status: 'failed', message: 'Failed to call missions' });
    }
  },
  missionDetail: async (req, res) => {
    try {
      const { missionid } = req.query;
      if (
        typeof missionid === 'undefined' ||
        Object.keys(req.query).length !== 1
      ) {
        return res
          .status(400)
          .send({ status: 'failed', message: 'Invalid missionid' });
      }
      const missionDetailRes = await prisma.mission.findUnique({
        where: { id: parseInt(missionid) },
      });
      if (missionDetailRes) {
        const comments = await prisma.comment.findMany({
          where: { missionId: parseInt(missionid) },
        });
        missionDetailRes.comments = comments;
        return res
          .status(200)
          .send({ status: 'success', message: missionDetailRes });
      } else
        return res
          .status(200)
          .send({ status: 'failed', message: 'Failed to find the mission' });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ status: 'failed', message: e });
    }
  },
  newMission: async (req, res) => {
    try {
      const { userId, title, reward, recruitCount, content, endDate } =
        req.body;

      if (
        !userId ||
        !title ||
        !reward ||
        !recruitCount ||
        !content ||
        !endDate
      ) {
        return res.status(400).send({
          status: 'failed',
          message:
            'Check body data. Body data needs userId, title, reward, recruitCount, content, endDate',
        });
      }

      // ?????? ?????? + address??? ??????????????? ????????? total = reward + 35 token ??????.
      // contract.methods.balanceOf(address) ??? total ??????
      const userData = await prisma.user.findUnique({
        where: { userId: userId },
      });
      const { address } = userData;
      const openMissionRes = await openMission(
        address,
        parseInt(reward) + parseInt(missionFee)
      );

      if (openMissionRes.status) {
        data = {
          userId: userId,
          title: title,
          reward: parseInt(reward),
          recruitCount: parseInt(recruitCount),
          content: content,
          createdAt: timeFormatted(new Date()),
          updatedAt: timeFormatted(new Date()),
          endDate: endDate,
          isComplete: false,
        };
        const newMissionRes = await prisma.mission.create({ data: data });
        return res
          .status(200)
          .send({ status: 'success', message: newMissionRes });
      } else
        return res
          .status(200)
          .send({ status: 'failed', message: 'Failed opening mission' });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ status: 'failed', message: e });
    }
  },
};

// client/mission??? ????????? client?????? server/mission??? ??????
// server/mission => array of mission ??????
// const [missions, setMissions] = useState() ??? ?????????
// missions.map(()) ?????? ??? ??????????????? props ??????
// ??????????????? Link to='/mission/detail?missionId=#??? ?????? ????????? props??? ??????.
// ?????? ?????????????????? missionId??? ???????????? mission data + comment data ????????????
