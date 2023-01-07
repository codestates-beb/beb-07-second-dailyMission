const ERC20abi = require('./abi/erc20ABI');
const { getWeb3, getContract } = require('./web3');
require('dotenv').config({ path: '../.env' });

const { LOCAL_RPC_SERVER_NETWORK, LOCAL_RPC_SERVER_PORT, CONTRACT_ADDRESS } =
  process.env;
const web = getWeb3(LOCAL_RPC_SERVER_NETWORK, LOCAL_RPC_SERVER_PORT);
const tokenContract = getContract(web, ERC20abi, CONTRACT_ADDRESS);

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
