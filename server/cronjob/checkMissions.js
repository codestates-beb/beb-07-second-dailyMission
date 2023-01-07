require('dotenv').config();
const env = process.env;

const {
  getUncompletedMissions,
} = require('../prismaScript/mission/getUncompletedMissions');
const {
  setComplete,
  getMission,
} = require('../prismaScript/mission/setMissionComplete');
const {
  getCommentsById,
} = require('../prismaScript/comment/getCommentsByMissionId');
const { getUserById } = require('../prismaScript/user');

const { getWeb3, getContract } = require('../utils/web3');
const network = env.LOCAL_RPC_SERVER_NETWORK;
const port = env.LOCAL_RPC_SERVER_PORT;
const contractAddress = env.CONTRACT_ADDRESS;
const abi = require('../utils/abi/erc20ABI');
const serverAddress = env.SERVER_ADDRESS;

const checkMission = async () => {
  const web3 = getWeb3(network, port);
  const contract = getContract(web3, abi, contractAddress);

  const timeDiff = 9 * 60 * 60 * 1000;
  // const timeDiff = 0;

  const curr = new Date();
  // const utc = curr.getTime();
  // const kst = new Date(utc + timeDiff);
  const kst = new Date();

  const time = [
    kst.getFullYear(),
    kst.getMonth() + 1,
    kst.getDate(),
    kst.getHours(),
    kst.getMinutes(),
  ];

  let nowString = '';
  time.forEach((e) => {
    if (e < 10) {
      nowString += '0';
      nowString += e;
    } else nowString += e;
  });

  const uncompletedMissions = await getUncompletedMissions();
  if (!uncompletedMissions) return;

  const missions = uncompletedMissions.filter((e) => e.endDate === nowString);
  if (missions.length === 0) return;

  for (let mission of missions) {
    const missionData = await getMission(mission.id);
    const comments = await getCommentsById(mission.id);
    await setComplete(mission.id);
    const selectedComments = [];
    const selectedUserAddresses = [];
    for (let comment of comments) {
      if (comment.isSelected === true) selectedComments.push(comment);
      const userAddress = await getUserById(comment.userId);
      selectedUserAddresses.push(userAddress.address);
    }
    let distributeAmount = 0;
    if (selectedComments.length != 0) {
      distributeAmount = Math.floor(
        missionData.reward / selectedComments.length
      );
      for (let address of selectedUserAddresses) {
        // 분배 contract 필요
        await contract.methods
          .transfer(address, distributeAmount)
          .send({ from: serverAddress });
      }
    }
  }
};

module.exports = checkMission;
