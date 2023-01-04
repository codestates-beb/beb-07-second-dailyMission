
const Web3 = require("web3");
const ERC20abi = require("./abi/ERC20abi");
const { ethBalance, tokenBalance } = require("./wallet");
const { getPasswordByAddr } = require("./utils");
require("dotenv").config({ path: "../.env" });

const { ERC20_ADDRESS, ADMIN_ADDRESS, ADMIN_PRIVATEKEY } = process.env;
const web = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const tokenContract = new web.eth.Contract(ERC20abi, ERC20_ADDRESS);

const isEthEnough = async (from, gas) => {
  const eth = await ethBalance(from);
  if (gas < eth) return true;
  return false;
};

const isTokenEnough = async (from, amount) => {
  const token = await tokenBalance(from);
  if (amount < token) return true;
  return false;
};

const sendTokenGanache = async (from, to, amount) => {
  try {
    if (!isTokenEnough) {

      return { status: false, message: "Not enough token to send" };

    }
    const data = await tokenContract.methods.transfer(to, amount);
    const gas = await data.estimateGas();
    if (!isEthEnough(from, gas)) {

      return { status: false, message: "Not enough ethereum to pay gas" };

    }
    const result = await data.send({ from: from });
    return {
      status: result.status,
      message:
        from === ADMIN_ADDRESS
          ? 'Rewarded successfully'
          : 'Sended successfully',
    };
  } catch (e) {
    console.log(e);
    return { status: false, message: e };
  }
};

module.exports = {
  rewardTokenGanache: async (to, amount) =>
    await sendTokenGanache(ADMIN_ADDRESS, to, amount),
  sendTokenGanache: async (from, to, amount) => {
    const password = await getPasswordByAddr(from);

    if (!password) return { status: false, message: "Address Not Found." };

    const unlock = await web.eth.personal.unlockAccount(from, password, 3);
    if (unlock) {
      const giveRes = await sendTokenGanache(from, to, amount);
      await web.eth.personal.lockAccount(from);

      return giveRes;
    } else return { status: false, message: "Failed to unlock address" };

  },
  // rewardTokenGoerli: async (to, amount) =>
  //   await sendTokenGoerli(ADMIN_ADDRESS, to, amount),
  // sendTokenGoerli: async (from, to, amount) =>
  //   await sendTokenGoerli(from, to, amount),
};

// Goerli Testnet
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

const signTx = async (tx) => {
  try {
    const txSigned = await web.eth.accounts.signTransaction(
      tx,
      ADMIN_PRIVATEKEY
    );
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
