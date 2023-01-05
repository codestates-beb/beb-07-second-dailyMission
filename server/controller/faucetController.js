const prisma = require("../prisma/prisma");
const { sendEthereum } = require("../utils/transaction");
const { timeFormatted } = require("../utils/utils");

const isDayPassed = (timestamp) => {
  return timeFormatted(new Date()) - timestamp > 10000;
};

module.exports = {
  getEthFaucet: async (req, res) => {
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
    // type이 token일시
    // 컨트랙트의 dailyRewardTimestamp 체크
    // 토큰 전송 후 timestamp 업데이트. send().
  },
  getLastTokenFaucet: async (req, res) => {},
};
