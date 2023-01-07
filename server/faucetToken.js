require('dotenv').config();
const { getContract, getWeb3 } = require('./utils/web3');

const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;
const contractAddres = process.env.CONTRACT_ADDRESS;
const serverAddress = process.env.SERVER_ADDRESS;
const abi = require('./utils/abi/ICTokenABI');

const web3 = getWeb3(network, port);
const contract = getContract(web3, abi, contractAddres);

const toAddress = '0xA4a59937e858F2B9E074EB1A80472625Cd9D35e2';
const amount = 100;
contract.methods
  .transfer(toAddress, amount)
  .send({ from: serverAddress })
  .then((e) => console.log(e));
