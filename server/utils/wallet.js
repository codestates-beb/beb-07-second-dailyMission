const Web3 = require("web3");
const ERC20abi = require("./abi/ERC20abi");

const web = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const erc20Address = "0xb711fcEaec7377D84eb8A6107B9190d417426596";

const adminAddr = "0x74BBFDC4D1f6f18D94E1a32AE88FedBdA30Ca8e7";
const privateKey =
  "68ababc729468392d4697546b4f4d87afb283c1110ec80b632b3dac6b2678d66";
const user1Addr = "0x7eA2f58FEB7C8BA8A1ed46520955a8233BFBE9D3";
const user2Addr = "0xA6dc4fae0553Bd19F8688e701b47a51ED2beA031";

const tokenContract = new web.eth.Contract(ERC20abi, erc20Address);

module.exports = {
  tokenBalance: async (address) => {
    return await tokenContract.methods.balanceOf(address).call();
  },
  createWallet: async () => {},
};

const createWallet = async (password) => {
  const newAcc = web.eth.personal.newAccount(password);
  return newAcc;
};

createWallet(password).then((res) => console.log(res));
