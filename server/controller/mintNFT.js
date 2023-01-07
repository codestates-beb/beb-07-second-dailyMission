require('dotenv').config();
const { getWeb3, getContract } = require('../utils/web3');
const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;
const erc721address = process.env.CONTRACT_ADDRESS_721;
const serverAddress = process.env.SERVER_ADDRESS;
const abi = require('../utils/abi/erc721ABI');

const web3 = getWeb3(network, port);
const contract = getContract(web3, abi, erc721address);

const { isWalletExist } = require('../prismaScript/user');

const mintNFT = async (req, res) => {
  const body = req.body;
  if (
    Object.keys(body).length !== 2 ||
    typeof body.address === 'undefined' ||
    typeof body.tokenURI === 'undefined'
  )
    return res.status(400).send({ status: 'fail', message: 'Bad Request' });

  const userExist = await isWalletExist(body.address);
  if (!userExist)
    return res
      .status(200)
      .send({ status: 'fail', message: 'User does not exist' });

  try {
    await contract.methods
      .mintNFT(body.tokenURI, body.address)
      .send({ from: serverAddress, gas: 4712388 });
    return res.status(201).send({ status: 'Success', message: 'Mint Success' });
  } catch (e) {
    return res.status(204).send({ status: 'Fail', message: 'Mint failed' });
  }
};

module.exports = mintNFT;
