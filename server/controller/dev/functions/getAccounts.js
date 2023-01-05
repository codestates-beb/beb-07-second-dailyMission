require('dotenv').config();

const { getWeb3 } = require('../../../utils/web3');

// fetch env variables
const env = process.env;
const network = env.LOCAL_RPC_SERVER_NETWORK;
const port = env.LOCAL_RPC_SERVER_PORT;

const getAccounts = async (req, res) => {
  const web3 = await getWeb3(network, port);
  const accounts = await web3.eth.getAccounts();
  res.status(200).send(accounts);
};

module.exports = { getAccounts };
