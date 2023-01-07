require('dotenv').config();

const { getWeb3, getContract } = require('../../../utils/web3');

// fetch env variables
const env = process.env;
const network = env.LOCAL_RPC_SERVER_NETWORK;
const port = env.LOCAL_RPC_SERVER_PORT;
const contractAddress = env.CONTRACT_ADDRESS;

const abi = require('../../../utils/abi/erc20ABI');

const getAccounts = async (req, res) => {
  const web3 = getWeb3(network, port);
  const contract = getContract(web3, abi, contractAddress);
  const accounts = await web3.eth.getAccounts();
  const accountsWithBalance = {};
  for (let i of accounts) {
    const balance = await contract.methods.balanceOf(i).call();
    accountsWithBalance[i] = balance;
  }
  res.status(200).send(accountsWithBalance);
};

module.exports = { getAccounts };
