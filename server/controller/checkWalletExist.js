const { isWalletExist } = require('../prismaScript/user');

const checkWallet = async (req, res) => {
  const body = req.params;
  if (Object.keys(body).length != 1 || typeof body.address === 'undefined')
    res.status(400).send({ status: 'Failed', message: 'Bad Request' });

  const getWalletRes = await isWalletExist(body.address);
  if (!getWalletRes) res.status(200).send({ status: false });
  else res.status(200).send({ status: true });
};

module.exports = { checkWallet };
