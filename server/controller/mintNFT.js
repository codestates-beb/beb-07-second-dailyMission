require('dotenv').config();
const { getWeb3, getContract } = require('../utils/web3');
const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;
const erc721address = process.env.CONTRACT_ADDRESS_721;
const serverAddress = process.env.SERVER_ADDRESS;
const abi = require('../utils/abi/erc721ABI');

const web3 = getWeb3(network, port);
const contract = getContract(web3, abi, erc721address);

const { getUserByAddress } = require('../prismaScript/user');
const { mint, getMinted } = require('../prismaScript/nft');

const mintNFT = async (req, res) => {
  const body = req.body;
  if (Object.keys(body).length !== 1 || typeof body.address === 'undefined')
    return res.status(400).send({ status: 'fail', message: 'Bad Request' });

  const userExist = await getUserByAddress(body.address);
  if (!userExist)
    return res
      .status(200)
      .send({ status: 'fail', message: 'User does not exist' });

  const minted = await getMinted();
  const notMintedIds = [];
  minted.forEach((e) => notMintedIds.push(e.tokenId));
  for (let i = 1; i <= 80; i++) {
    if (notMintedIds.includes(i)) {
      notMintedIds.splice(notMintedIds.indexOf(i), 1);
    } else notMintedIds.push(i);
  }
  const randNum = Math.floor(Math.random() * (notMintedIds.length + 1));
  const tokenUri = `ipfs://QmeRUSf1MThCpDotXyvKgcdbW4dGc51hneTvMenBLfU69E/${notMintedIds[randNum]}.png`;

  try {
    await contract.methods
      .mintNFT(tokenUri, body.address)
      .send({ from: serverAddress, gas: 4712388 });
    return res.status(201).send({ status: 'Success', message: tokenUri });
  } catch (e) {
    return res.status(204).send({ status: 'Fail', message: 'Mint failed' });
  }
};

module.exports = mintNFT;
