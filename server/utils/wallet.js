const Web3 = require("web3");
const ERC20abi = require("./abi/ERC20abi");
const { passwordHashed } = require("./utils");
require("dotenv").config({ path: "../.env" });

const web = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const { ERC20_ADDRESS, ADMIN_ADDRESS, ADMIN_PRIVATEKEY } = process.env;

const tokenContract = new web.eth.Contract(ERC20abi, ERC20_ADDRESS);

module.exports = {
  tokenBalance: async (address) => {
    return await tokenContract.methods.balanceOf(address).call();
  },
  ethBalance: async (address) => {
    return await web.eth.getBalance(address);
  },
  createWallet: async (password) => {
    return await web.eth.personal.newAccount(password);
  },
};

const { ethBalance, tokenBalance, createWallet } = require("./wallet");
const { rewardTokenGanache, giveTokenGanache } = require("./transaction");

const user1Addr = "0xFEC227b9622080B64cCc5709faDdb1600E5B5721";
const user1PW = "password";
const user2Addr = "0x6691803fFFc87734951185809feA9092a02f8634";

// eth가 없으면 (gas가 없으면) return false => estimatedGas vs eth balance 비교하는 함수 필요
const sendTokenGanache = async (from, to, amount) => {
  try {
    const bal = await tokenBalance(from);
    if (amount > bal) return false;
    const unlock = await web.eth.personal.unlockAccount(user1Addr, user1PW, 3);
    if (unlock) {
      const giveRes = giveTokenGanache(from, to, amount);
      return giveRes;
    } else return unlock;
  } catch (e) {
    console.log(e);
    return false;
  }
};

rewardTokenGanache(user1Addr, 3000)
  .then((res) => console.log("res", res))
  .then(async () => {
    const bal = await tokenBalance(user1Addr);
    console.log(bal);
  });

// sendTokenGanache(user1Addr, user2Addr, 5000)
//   .then((res) => console.log(res))
//   .then(async () => {
//     const bal = await tokenBalance(user2Addr);
//     console.log(bal);
//   });
// createWallet(password).then((res) => console.log(res));
