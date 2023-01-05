const prisma = require("../prisma/prisma");
const {
  sendEthereum,
  getTokenLasfFaucet,
  setTokenLasfFaucet,
  rewardTokenGanache,
} = require("../utils/transaction");
const { timeFormatted } = require("../utils/utils");

const isDayPassed = (timestamp) => {
  return timeFormatted(new Date()) - timestamp > 10000;
};

const tokenFaucet = 50;
module.exports = {
  getEthFaucet: async (req, res) => {
    try {
      const { userid } = req.query;
      if (!userid) {
        return res.status(400).send({
          status: "failed",
          message: "Missing userId",
        });
      }
      const userData = await prisma.user.findUnique({
        where: { userId: userid },
      });
      // id 없을때
      if (!userData) {
        return res
          .status(200)
          .send({ status: "failed", message: "UserId not found." });
      }
      // 송금
      // db의 lastFaucet 체크 (받은 적이 없거나 받은 지 일정 시간이 지나야함)
      const { address, lastFaucet } = userData;
      if (!lastFaucet || isDayPassed(lastFaucet)) {
        const txResult = await sendEthereum(address, 1);
        if (txResult.status === "success") {
          // 송금 후 lastFaucet 업데이트
          const lastFaucet = timeFormatted(new Date());
          const updateRes = await prisma.user.update({
            data: { lastFaucet: lastFaucet },
            where: { userId: userid },
          });
          console.log(updateRes);
          txResult.message.lastFaucet = lastFaucet;
        }
        return res.status(200).send(txResult);
      }
      return res.status(200).send({
        status: "failed",
        message: "Has not passed 24 hours since last faucet",
      });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .send({ status: "failed", message: "Failed in getting faucet" });
    }
  },
  getLastEthFaucet: async (req, res) => {
    try {
      const { userid } = req.query;
      if (!userid) {
        return res.status(400).send({
          status: "failed",
          message: "Need userId",
        });
      }
      const userData = await prisma.user.findUnique({
        where: { userId: userid },
      });
      if (!userData) {
        return res
          .status(200)
          .send({ status: "failed", message: "UserId not found." });
      }
      const { lastFaucet } = userData;
      if (!lastFaucet)
        return res
          .status(200)
          .send({ status: "success", message: "No faucet history" });
      return res
        .status(200)
        .send({ status: "success", message: { lastFaucet: lastFaucet } });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ status: "failed", message: e });
    }
  },
  getTokenFaucet: async (req, res) => {
    try {
      const userId = req.query.userid;
      if (!userId)
        return res
          .status(400)
          .send({ status: "failed", message: "Missing userid" });
      // id 있는지
      const userData = await prisma.user.findUnique({
        where: { userId: userId },
      });
      if (!userData) {
        return res
          .status(200)
          .send({ status: "failed", message: "UserId not found." });
      }
      // 전송
      // 컨트랙트의 dailyRewardTimestamp 체크
      const { address } = userData;
      const timestamp = await getTokenLasfFaucet(address);
      if (timestamp === 0 || isDayPassed(timestamp)) {
        const rewardRes = await rewardTokenGanache(address, tokenFaucet);
        if (rewardRes.status) {
          const setTimestampRes = await setTokenLasfFaucet(
            address,
            timeFormatted(new Date())
          );
          console.log(setTimestampRes);
          return res.status(200).send({
            status: "success",
            message: { address: address, tokenFaucet: tokenFaucet },
          });
        } else {
          return res
            .status(200)
            .send({ status: "failed", message: "Failed in sending token" });
        }
      } else {
        return res.status(200).send({
          status: "failed",
          message: "Has not passed 24 hours since last faucet",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({ status: "failed", message: err });
    }
  },
  getLastTokenFaucet: async (req, res) => {
    try {
      const userId = req.query.userid;
      if (!userId)
        return res
          .status(400)
          .send({ status: "failed", message: "Missing userid" });
      const userData = await prisma.user.findUnique({
        where: { userId: userId },
      });
      if (!userData) {
        return res
          .status(200)
          .send({ status: "failed", message: "UserId not found." });
      }
      const { address } = userData;
      const lastFaucet = await getTokenLasfFaucet(address);
      return res
        .status(400)
        .send({ status: "success", message: { lastFaucet: lastFaucet } });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ status: "failed", message: err });
    }
  },
};
