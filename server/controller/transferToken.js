require('dotenv').config();
const { isWalletExist } = require('../prismaScript/user');
const { sendTokenGanache } = require('../utils/transaction');
const { getWeb3 } = require(`../utils/web3`);
const abi = require(`../utils/abi/ICTokenABI`);

const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;
const contractAddress = process.env.CONTRACT_ADDRESS;
const web3 = getWeb3(network, port);
const contract = new web3.eth.Contract(abi, contractAddress);

const transferToken = async (req, res) => {
  const body = req.body;
  if (
    Object.keys(body).length !== 3 ||
    typeof body.senderAddr === 'undefined' ||
    typeof body.receiverAddr === 'undefined' ||
    typeof body.amount === 'undefined'
  )
    return res.status(400).send({ status: 'fail', message: 'Bad Request' });

  const receiver = await isWalletExist(body.receiverAddr);
  if (!receiver)
    return res
      .status(200)
      .send({ status: 'fail', message: `Wallet Does not exist` });

  const transferRes = await sendTokenGanache(
    body.senderAddr,
    body.receiverAddr,
    body.amount
  );
  if (!transferRes.status)
    return res
      .status(200)
      .send({ status: 'fail', message: transferRes.message });
  else
    res.status(200).send({ status: 'success', message: transferRes.message });
};

module.exports = transferToken;
