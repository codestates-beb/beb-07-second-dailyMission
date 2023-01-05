const Web3 = require('web3');

const getWeb3 = (network, port) =>
  new Web3(new Web3.providers.HttpProvider(`${network}:${port}`));

const getContract = (web3, abi, contractAddr) =>
  new web3.eth.Contract(abi, contractAddr);

module.exports = { getWeb3, getContract };
