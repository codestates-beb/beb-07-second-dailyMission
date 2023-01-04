const { isWalletExist } = require('../prismaScript/user');
const { sendTokenGanache } = require('../utils/transaction');

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
    amount
  );
  if (!transferRes)
    return res
      .status(200)
      .send({ status: 'fail', message: transferRes.message });
  else
    res.status(200).send({ status: 'success', message: transferRes.message });
};

module.exports = transferToken;
