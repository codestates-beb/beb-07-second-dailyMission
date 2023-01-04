const Web3 = require("web3");
const ERC20abi = require("./abi/ERC20abi");
require("dotenv").config({ path: "../.env" });
const { ethBalance, tokenBalance, createWallet } = require("./wallet");

const web = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const { ERC20_ADDRESS, ADMIN_ADDRESS, ADMIN_PRIVATEKEY } = process.env;

const tokenContract = new web.eth.Contract(ERC20abi, ERC20_ADDRESS);

const signTx = async (tx) => {
  try {
    const txSigned = await web.eth.accounts.signTransaction(
      tx,
      ADMIN_PRIVATEKEY
    );
    // console.log("signed", txSigned);
    const hash = web.eth.sendSignedTransaction(
      txSigned.rawTransaction,
      (err, hash) => {
        if (err) console.log("Transaction Error:", err);
      }
    );
    return hash;
  } catch (err) {
    console.log("Promise Error:", err);
    return false;
  }
};

const isGasEnough = async (from, gas) => {
  const eth = await ethBalance(from);
  if (gas < eth) return true;
  return false;
};

// from이 admin이 아니면 unlock 처리 필요. 끝나면 다시 lock -> 어디서 처리할지 확인
const sendTokenGanache = async (from, to, amount) => {
  try {
    const data = await tokenContract.methods.transfer(to, amount);
    const gas = await data.estimateGas();
    if (!isGasEnough(from, gas)) {
      return { status: false, message: "Not enough ethereum to pay gas" };
    }
    const result = await data.send({ from: from });
    return {
      status: result.status,
      message:
        from === ADMIN_ADDRESS
          ? "Rewarded successfully"
          : "Sended successfully",
    };
  } catch (e) {
    console.log(e);
    return { status: false, message: e };
  }
};

// from 처리 필요
const sendTokenGoerli = async (from, to, amount) => {
  try {
    const data = await tokenContract.methods.transfer(to, amount).encodeABI();
    const tx = {
      to: ERC20_ADDRESS,
      gas: 500000,
      data: data,
    };
    const txHash = await signTx(tx);
    return txHash.status;
  } catch (e) {
    console.log(e);
    return false;
  }
};
module.exports = {
  rewardTokenGanache: async (to, amount) =>
    await sendTokenGanache(ADMIN_ADDRESS, to, amount),
  rewardTokenGoerli: async (to, amount) =>
    await sendTokenGoerli(ADMIN_ADDRESS, to, amount),
  giveTokenGanache: async (from, to, amount) =>
    await sendTokenGanache(from, to, amount),
  giveTokenGoerli: async (from, to, amount) =>
    await sendTokenGoerli(from, to, amount),
};
