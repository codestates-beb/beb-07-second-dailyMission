const cron = require('node-cron');
const Web3 = require('web3');

const web3 = new Web3('http://localhost:7545');

const getLatestBlock = async () => await web3.eth.getBlockNumber();
const blockInfo = async (num) => console.log(await web3.eth.getBlock(num));

const txInfo = async (tx) => console.log(await web3.eth.getTransaction(tx));

let blocknum = 0;
const changeblocknum = (num) => {
  blocknum = num;
};
const task = cron.schedule('* * * * * *', async () => {
  getLatestBlock().then((res) => {
    if (res != blocknum) {
      blockInfo();
      txInfo();
      changeblocknum(res);
    }
  });
});

task.start();
