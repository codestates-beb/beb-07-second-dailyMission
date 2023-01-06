const prisma = require("../prisma/prisma");
const {
  sendEthereum,
  getTokenLasfFaucet,
  setTokenLasfFaucet,
  rewardTokenGanache,
} = require("../utils/transaction");
const { timeFormatted, checkBodyElements } = require("../utils/utils");

const tokenFaucetAmount = 50;
const ethFaucetAmount = 1;

const isDayPassed = (timestamp) => {
  return timeFormatted(new Date()) - timestamp > 10000;
};

module.exports = {
  getFaucet: async (req, res) => {
    try {
      const checkBodyRes = checkBodyElements(req.query, "userid", "type");
      if (!checkBodyRes.status) {
        return res
          .status(400)
          .send({ status: "failed", message: checkBodyRes.message });
      }
      const { userid, type } = req.query;
      const userData = await prisma.user.findUnique({
        where: { userId: userid },
      });
      // id 없을 때
      if (!userData) {
        return res
          .status(200)
          .send({ status: "failed", message: "UserId not found." });
      }
      // id 있을 때
      // type check
      const { address, lastFaucet } = userData;
      switch (type) {
        case "ethereum":
          if (!lastFaucet || isDayPassed(lastFaucet)) {
            const txResult = await sendEthereum(address, ethFaucetAmount);
            if (txResult.status === "success") {
              // 송금 후 lastFaucet 업데이트
              const lastFaucet = timeFormatted(new Date());
              const updateRes = await prisma.user.update({
                data: { lastFaucet: lastFaucet },
                where: { userId: userid },
              });
              console.log(updateRes);
              txResult.message.timestamp = lastFaucet;
            }
            return res.status(200).send(txResult);
          }
          return res.status(200).send({
            status: "failed",
            message: "Has not passed 24 hours since last faucet",
          });
        case "token":
          const timestamp = await getTokenLasfFaucet(address);
          if (timestamp === 0 || isDayPassed(timestamp)) {
            const rewardRes = await rewardTokenGanache(
              address,
              tokenFaucetAmount
            );
            if (rewardRes.status) {
              const lastFaucet = timeFormatted(new Date());
              const setTimestampRes = await setTokenLasfFaucet(
                address,
                lastFaucet
              );
              console.log(setTimestampRes);
              return res.status(200).send({
                status: "success",
                message: {
                  amount: tokenFaucetAmount,
                  timestamp: lastFaucet,
                },
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
        default:
          return res.status(400).send({
            status: "failed",
            message: "Type must be either ethereum or token",
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({ status: "failed", message: err });
    }
  },

  getLastFaucet: async (req, res) => {
    try {
      const checkBodyRes = checkBodyElements(req.query, "userid", "type");
      if (!checkBodyRes.status) {
        return res
          .status(400)
          .send({ status: "failed", message: checkBodyRes.message });
      }
      const { userid, type } = req.query;
      const userData = await prisma.user.findUnique({
        where: { userId: userid },
      });
      // id 없을 때
      if (!userData) {
        return res
          .status(200)
          .send({ status: "failed", message: "UserId not found." });
      }
      const { address, lastFaucet } = userData;
      switch (type) {
        case "ethereum":
          if (!lastFaucet)
            return res
              .status(200)
              .send({ status: "success", message: "No faucet history" });
          return res
            .status(200)
            .send({ status: "success", message: { lastFaucet: lastFaucet } });
        case "token":
          const tokenLastFaucet = await getTokenLasfFaucet(address);
          return res.status(400).send({
            status: "success",
            message: { lastFaucet: tokenLastFaucet },
          });
        default:
          return res.status(400).send({
            status: "failed",
            message: "Type must be either ethereum or token",
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({ status: "failed", message: err });
    }
  },
};
