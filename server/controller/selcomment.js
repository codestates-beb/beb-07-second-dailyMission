const { setSelected } = require('../prismaScript/comment/updateSelected');
const { checkSelected } = require('../prismaScript/comment/checkSelected');
const {
  getCommentsById,
} = require('../prismaScript/comment/getCommentsByMissionId');
const {
  setComplete,
  getMission,
} = require('../prismaScript/mission/setMissionComplete');

const selComment = async (req, res) => {
  const body = req.body;
  const { missionId, commentId } = body;
  if (
    Object.keys(body).length != 2 ||
    typeof commentId === 'undefined' ||
    typeof missionId === 'undefined'
  ) {
    return res.status(400).send({ status: 'Failed', message: 'Bad Request' });
  }

  const setSelectedRes = await setSelected(commentId);
  if (!setSelectedRes)
    return res
      .status(200)
      .send({ status: 'Failed', message: 'SetSelected Failed' });

  const comments = await getCommentsById(missionId);

  const checkData = await checkSelected(missionId);
  let missionData;
  if (checkData.recruitCount == checkData.selectedAmount) {
    missionData = await setComplete(missionId);
  } else {
    missionData = await getMission(missionId);
    return res.status(200).send({
      status: 'Success',
      message: {
        isFull: false,
        mission: missionData,
        comments,
      },
    });
  }
  return res.status(200).send({
    status: 'Success',
    message: {
      isFull: true,
      mission: missionData,
      comments,
    },
  });
};

module.exports = selComment;
