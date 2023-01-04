require('dotenv').config({ path: '../.env' });

const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(`${network}:${port}`));

const contract = new web3.eth.Contract(
  require('./abi/ICTokenABI'),
  process.env.CONTRACT_ADDRESS
);

module.exports = contract;
