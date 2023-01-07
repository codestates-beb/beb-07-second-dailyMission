require('dotenv').config();
const { getWeb3 } = require('./utils/web3');

const network = process.env.LOCAL_RPC_SERVER_NETWORK;
const port = process.env.LOCAL_RPC_SERVER_PORT;

const web3 = getWeb3(network, port);

const amount = '1';
const privateKey =
  'd9a659e735deeea984c33d9095ab5909f2ec3e721682a2e0063e7ef56debef7a';
console.log(web3.utils.toWei(amount, 'ether'));

const tx = {
  to: '0xA4a59937e858F2B9E074EB1A80472625Cd9D35e2',
  value: web3.utils.toWei(amount, 'ether'),
  gas: 21000,
};
web3.eth.accounts.signTransaction(tx, privateKey).then((e) => {
  console.log(e);
  web3.eth.sendSignedTransaction(e.rawTransaction).then(console.log);
});
