require('dotenv').config();
const { isWalletExist, getUserByAddress } = require('../prismaScript/user');
const { getWeb3, getContract } = require(`../utils/web3`);
const abi = require(`../utils/abi/erc20ABI`);

// fetch env variables
const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;
const contractAddress = process.env.CONTRACT_ADDRESS;
const web3 = getWeb3(network, port);
const contract = getContract(web3, abi, contractAddress);

const transferToken = async (req, res) => {
  const body = req.body;
  const { senderAddr, receiverAddr, amount } = body;
  if (
    Object.keys(body).length !== 3 ||
    typeof senderAddr === 'undefined' ||
    typeof receiverAddr === 'undefined' ||
    typeof amount === 'undefined'
  )
    return res.status(400).send({ status: 'fail', message: 'Bad Request' });

  const senderData = await getUserByAddress(senderAddr);
  if (!senderData)
    return res
      .status(200)
      .send({ status: 'fail', message: `Sender Wallet Does Not Exist in DB` });

  const receiver = await isWalletExist(body.receiverAddr);
  if (!receiver)
    return res.status(200).send({
      status: 'fail',
      message: `Recevier Wallet Does Not Exist in DB`,
    });

  const transferData = await contract.methods.transfer(receiverAddr, amount);
  const ethGas = await transferData.estimateGas();

  const ethBalance = await web3.eth.getBalance(senderAddr);
  if (ethBalance < ethGas)
    return res
      .status(200)
      .send({ status: 'fail', message: 'Not enough ETH for gas' });

  const tokenBalance = await contract.methods.balanceOf(senderAddr).call();
  if (tokenBalance < amount)
    return res
      .status(200)
      .send({ status: 'fail', message: 'Not enough Token' });

  const unlock = await web3.eth.personal.unlockAccount(
    senderAddr,
    senderData.password,
    3
  );

  if (!unlock)
    return res
      .status(200)
      .send({ status: 'fail', message: 'Failed to unlock sender wallet' });

  const transferRes = await transferData.send({ from: senderAddr });
  if (transferRes) {
    await web3.eth.personal.lockAccount(senderAddr);
    return res
      .status(200)
      .send({ status: 'success', message: 'Transfer Success' });
  } else {
    await web3.eth.personal.lockAccount(senderAddr);
    return res.status(200).send({ status: 'fail', message: 'Unknow Error' });
  }
};

module.exports = transferToken;
