const Web3 = require('web3');

const getWeb3 = (network, port) =>
  new Web3(new Web3.providers.HttpProvider(`${network}:${port}`));

module.exports = { getWeb3 };
