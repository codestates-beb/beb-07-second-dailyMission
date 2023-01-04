const { ethBalance, tokenBalance, createWallet } = require("./wallet");
const { rewardTokenGanache, sendTokenGanache } = require("./transaction");

const user1Addr = "0xFEC227b9622080B64cCc5709faDdb1600E5B5721";
const user2Addr = "0x6691803fFFc87734951185809feA9092a02f8634";

rewardTokenGanache(user1Addr, 3000)
  .then((res) => console.log("reward res", res))
  .then(async () => {
    const bal = await tokenBalance(user1Addr);
    console.log(bal);
  });

tokenBalance(user1Addr)
  .then((bal) => {
    console.log("before sending", bal);
  })
  .then(async () => {
    const sendingRes = await sendTokenGanache(user1Addr, user2Addr, 171);
    console.log("sendingRes", sendingRes);
    const user1token = await tokenBalance(user1Addr);
    const user2token = await tokenBalance(user2Addr);
    console.log("after sending", user1token, user2token);
  });
