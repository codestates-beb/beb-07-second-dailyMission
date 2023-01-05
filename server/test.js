require('dotenv').config();

const { getWeb3 } = require('./truffle/web3');

const web3 = getWeb3(
  process.env.LOCAL_RPC_SERVER_NETWORK,
  process.env.LOCAL_RPC_SERVER_PORT
);

const func = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
};

func();
