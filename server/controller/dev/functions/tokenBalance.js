require('dotenv').config();

const { getContract, getWeb3 } = require('../../../utils/web3');

// fetch env variables
const env = process.env;
const network = env.LOCAL_RPC_SERVER_NETWORK;
const port = env.LOCAL_RPC_SERVER_PORT;
const contractAddress = env.CONTRACT_ADDRESS;

const abi = require('../../../utils/abi/erc20ABI');

const getBalance = async (req, res) => {
  const web3 = getWeb3(network, port);
  const contract = getContract(web3, abi, contractAddress);

  const params = req.params;

  if (Object.keys(params).length !== 1 || typeof params.address === 'undefined')
    return res.status(400).send('Bad Resquest');

  try {
    const tokenBalance = await contract.methods
      .balanceOf(params.address)
      .call();
    // const tokenBalance = await contract.methods.name().call();
    return res.status(200).send(`tokenBalance : ${tokenBalance}`);
  } catch (e) {
    console.log(e);
    return res.status(200).send(`Contract doesn't have address`);
  }
};

module.exports = { getBalance };
