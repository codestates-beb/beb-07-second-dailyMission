const { setSelected } = require('../prismaScript/comment/updateSelected');
const { checkSelected } = require('../prismaScript/comment/checkSelected');
const {
  getCommentsById,
} = require('../prismaScript/comment/getCommentsByMissionId');
const { getUserById } = require('../prismaScript/user');
const {
  setComplete,
  getMission,
} = require('../prismaScript/mission/setMissionComplete');
const { getWeb3, getContract } = require('../utils/web3');

require('dotenv').config();
const abi = require('../utils/abi/erc20ABI');
const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;
const contractAddress = process.env.CONTRACT_ADDRESS;
const serverAddress = process.env.SERVER_ADDRESS;

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
  if (!checkData)
    return res
      .status(200)
      .send({ status: 'Failed', message: 'Mission ID does not exist' });
  let missionData;
  if (checkData.recruitCount === checkData.selectedAmount) {
    missionData = await setComplete(missionId);
    const web3 = getWeb3(network, port);
    const contract = getContract(web3, abi, contractAddress);
    const selectedComments = [];
    for (let i of comments) {
      const userData = await getUserById(i.userId);
      if (i.isSelected) selectedComments.push(userData.address);
    }
    for (let i of selectedComments) {
      contract.methods
        .transfer(i, Math.floor(missionData.reward / checkData.selectedAmount))
        .send({ from: serverAddress });
    }

    return res.status(200).send({
      status: 'Success',
      message: {
        isFull: true,
        mission: missionData,
        comments,
      },
    });
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
};

module.exports = selComment;
