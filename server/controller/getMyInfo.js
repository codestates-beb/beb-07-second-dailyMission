require('dotenv').config();
// const { tokenContract } = require('../utils/abi/testERC-20ABI');
// const { nftContract } = require('../utils/abi/testERC-721ABI');

const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;
const erc20address = process.env.CONTRACT_ADDRESS;
const erc721address = process.env.CONTRACT_ADDRESS_721;

const { getWeb3, getContract } = require('../utils/web3');
const erc20abi = require('../utils/abi/ERC-20ABI');
const erc721abi = require('../utils/abi/ERC-721ABI');
const web3 = getWeb3(network, port);
const tokenContract = getContract(web3, erc20abi, erc20address);
const nftContract = getContract(web3, erc721abi, erc721address);

const prisma = require('../prisma/prisma');

module.exports = {
  getMyInfo: async (req, res) => {
    const { id } = req.query;

    const user = await prisma.user.findMany({
      where: {
        userId: id,
      },
    });

    const myMission = await prisma.mission.findMany({
      where: {
        userId: id,
      },
    });

    const myComment = await prisma.comment.findMany({
      where: {
        userId: id,
      },
    });

    const myBalance = await tokenContract.methods
      .balanceOf(user[0].address)
      .call();

    const myNFTs = await nftContract.methods
      .getNftToken(user[0].address)
      .call();

    if (user.length === 0 || user[0].userId != req.query.id) {
      return res.status(200).send({ status: 'falied' });
    }

    if (user[0].userId === req.query.id) {
      return res.status(200).send({
        status: 'success',
        message: {
          mission: myMission,
          comment: myComment,
          banlance: myBalance,
          NFT: myNFTs,
        },
      });
    }
  },
};
