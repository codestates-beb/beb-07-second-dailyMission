const ERC20abi = require('./abi/erc20ABI');
const { ethBalance, tokenBalance } = require('./wallet');
const { getPasswordByAddr } = require('./utils');
const { getWeb3, getContract } = require('./web3');
require('dotenv').config({ path: '../.env' });

const {
  LOCAL_RPC_SERVER_NETWORK,
  LOCAL_RPC_SERVER_PORT,
  CONTRACT_ADDRESS,
  SERVER_ADDRESS,
  SERVER_PRIVATE_KEY,
} = process.env;

const web = getWeb3(LOCAL_RPC_SERVER_NETWORK, LOCAL_RPC_SERVER_PORT);
const tokenContract = getContract(web, ERC20abi, CONTRACT_ADDRESS);

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
      return { status: false, message: 'Not enough token to send' };
    }
    const data = await tokenContract.methods.transfer(to, amount);
    const estimateGas = await data.estimateGas();
    const gasInWei = await web.utils.toWei(String(estimateGas), 'gwei');
    if (!isEthEnough(from, gasInWei)) {
      return { status: false, message: 'Not enough ethereum to pay gas' };
    }
    const result = await data.send({ from: from });
    return {
      status: result.status,
      message:
        from === SERVER_ADDRESS
          ? 'Rewarded successfully'
          : 'Sended successfully',
    };
  } catch (e) {
    console.log(e);
    return { status: false, message: e };
  }
};

const signTx = async (tx) => {
  try {
    const txSigned = await web.eth.accounts.signTransaction(
      tx,
      SERVER_PRIVATE_KEY
    );
    const hash = web.eth.sendSignedTransaction(
      txSigned.rawTransaction,
      (err, hash) => {
        if (err) console.log('Transaction Error:', err);
      }
    );
    return hash;
  } catch (err) {
    console.log('Promise Error:', err);

    return false;
  }
};

module.exports = {
  rewardTokenGanache: async (to, amount) =>
    await sendTokenGanache(SERVER_ADDRESS, to, amount),
  sendTokenGanache: async (from, to, amount) => {
    const password = await getPasswordByAddr(from);

    if (!password) return { status: false, message: 'Address Not Found.' };

    const unlock = await web.eth.personal.unlockAccount(from, password, 3);
    if (unlock) {
      const giveRes = await sendTokenGanache(from, to, amount);
      await web.eth.personal.lockAccount(from);

      return giveRes;
    } else return { status: false, message: 'Failed to unlock address' };
  },
  openMission: async (host, amount) => {
    const password = await getPasswordByAddr(host);
    if (!password) return { status: false, message: 'Address Not Found.' };

    const unlock = await web.eth.personal.unlockAccount(host, password, 3);
    if (unlock) {
      const giveRes = await sendTokenGanache(host, SERVER_ADDRESS, amount);
      await web.eth.personal.lockAccount(host);

      return giveRes;
    } else return { status: false, message: 'Failed to unlock address' };
  },
  // rewardTokenGoerli: async (to, amount) =>
  //   await sendTokenGoerli(ADMIN_ADDRESS, to, amount),
  // sendTokenGoerli: async (from, to, amount) =>
  //   await sendTokenGoerli(from, to, amount),
  sendEthereum: async (address, amount) => {
    const wei = await web.utils.toWei(String(amount), 'ether');
    if (!(await isEthEnough(SERVER_ADDRESS, wei))) {
      return {
        status: 'failed',
        message: 'Not enought ethereum in server address',
      };
    }
    const nonce = await web.eth.getTransactionCount(SERVER_ADDRESS, 'latest');
    const tx = {
      to: address,
      value: wei,
      gas: 30000,
      nonce: nonce,
    };
    const hash = await signTx(tx);
    if (hash) {
      return {
        status: 'success',
        message: {
          amount: amount,
        },
      };
    } else {
      return { status: 'failed', message: 'Transaction failed' };
    }
  },
  getTokenLasfFaucet: async (address) => {
    const lastFaucet = await tokenContract.methods
      .getTokenFaucetTimestamp(address)
      .call();
    return lastFaucet; // 0 if no history
  },
  setTokenLasfFaucet: async (address, time) => {
    const timestamp = parseInt(time);
    const setTimestampRes = await tokenContract.methods
      .setTokenFaucetTimestamp(address, timestamp)
      .send({ from: SERVER_ADDRESS });
    return setTimestampRes.status;
  },
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
