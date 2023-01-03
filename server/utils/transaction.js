const Web3 = require("web3");
const ERC20abi = require("./abi/ERC20abi");

const web = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const erc20Address = "0xb711fcEaec7377D84eb8A6107B9190d417426596";

const adminAddr = "0x74BBFDC4D1f6f18D94E1a32AE88FedBdA30Ca8e7";
const privateKey =
  "68ababc729468392d4697546b4f4d87afb283c1110ec80b632b3dac6b2678d66";
const user1Addr = "0x7eA2f58FEB7C8BA8A1ed46520955a8233BFBE9D3";
const user2Addr = "0xA6dc4fae0553Bd19F8688e701b47a51ED2beA031";

const tokenContract = new web.eth.Contract(ERC20abi, erc20Address);

const signTx = async (tx, privateKey) => {
  try {
    const txSigned = await web.eth.accounts.signTransaction(tx, privateKey);
    // console.log("signed", txSigned);
    const hash = web.eth.sendSignedTransaction(
      txSigned.rawTransaction,
      (err, hash) => {
        if (err) console.log("Transaction Error:", err);
      }
    );
    return hash;
  } catch (err) {
    console.log("Promise Error:", err);
    return false;
  }
};

module.exports = {
  sendGanache: async (address) => {
    try {
      const data = await tokenContract.methods
        .transfer(user1Addr, 10000)
        .send({ from: adminAddr });
      return data.status;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  sendGoerli: async (address) => {
    try {
      const data = await tokenContract.methods
        .transfer(user1Addr, 10000)
        .encodeABI();
      const tx = {
        to: erc20Address,
        gas: 500000,
        data: data,
      };
      const txHash = await signTx(tx, privateKey, web);
      return txHash.status;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

// (async () => {
//   const data = await tokenContract.methods
//     .transfer(user1Addr, 10000)
//     .encodeABI();
//   const tx = {
//     to: erc20Address,
//     gas: 500000,
//     data: data,
//   };
//   const txHash = await signTx(tx, privateKey, web);
//   console.log(txHash.status);

// const data = await tokenContract.methods
//   .transfer(user1Addr, 10000)
//   .send({ from: adminAddr });
// console.log(data.status);
// const bal = await tokenContract.methods.balanceOf(user1Addr).call();
// console.log(bal);
// })();

// const newMission = async (req, res) => {
//   try {
//     const { userId, title, reward, recruitCount, content, endDate } = req.body;

//     const address = await prisma.user.findUnique({
//       where: { userId: userId },
//     });
//     // 잔고 체크 + address와 비밀번호를 가지고 total = reward + 35 token 송금.
//     // contract.methods.balanceOf(address) 과 total 비교

//     data = {
//       userId,
//       title,
//       reward,
//       recruitCount,
//       content,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       endDate,
//       isComplete: false,
//     };
//     const newMissionRes = await prisma.mission.create({ data: data });
//     return newMissionRes;
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// };
