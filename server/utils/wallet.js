const Web3 = require("web3");
const ERC20abi = require("./abi/ERC20abi");
require("dotenv").config({ path: "../.env" });

const { ERC20_ADDRESS } = process.env;
const web = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const tokenContract = new web.eth.Contract(ERC20abi, ERC20_ADDRESS);

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
