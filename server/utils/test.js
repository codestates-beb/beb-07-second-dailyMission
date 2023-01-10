const { decode } = require("jsonwebtoken");
const ERC20abi = require("./abi/ERC20abi");
const { sendTokenGanache } = require("./transaction");
const { getPasswordByAddr, timeFormatted } = require("./utils");
const { tokenBalance, createWallet, ethBalance } = require("./wallet");
const { getWeb3, getContract } = require("./web3");
require("dotenv").config({ path: "../.env" });

const user1Addr = "0x97e74ed726cE475249aa7711C2069c473646799d";
const user2Addr = "0xACB8950e67142D776b4f95D9D655181e3E4bEea2";

const {
  LOCAL_RPC_SERVER_NETWORK,
  LOCAL_RPC_SERVER_PORT,
  CONTRACT_ADDRESS,
  SERVER_ADDRESS,
  SERVER_PRIVATE_KEY,
} = process.env;

const web = getWeb3(LOCAL_RPC_SERVER_NETWORK, LOCAL_RPC_SERVER_PORT);
const tokenContract = getContract(web, ERC20abi, CONTRACT_ADDRESS);

(async () => {
  const wallet = await createWallet("password");
  console.log(wallet);
  const wallet2 = await createWallet("qwerty0901");
  console.log(wallet2);
  // const bal = await tokenBalance(user2Addr);
  // const eth = await ethBalance(user2Addr);
  // console.log(bal, eth);
  // const unlock = await web.eth.personal.unlockAccount(
  //   user2Addr,
  //   "password2",
  //   3
  // );
  // if (unlock) {
  //   const openMissionRes = await tokenContract.methods
  //     .openMission(user2Addr, 9, 11)
  //     .send({ from: user2Addr, gas: 500000 });
  //   console.log(openMissionRes);
  // }
  // const bal = await tokenBalance(user2Addr);
  // const eth = await ethBalance(user2Addr);
  // console.log(bal, eth);
  // const mission = await tokenContract.methdos.mission(1).call();
  // console.log(mission);
  // const token = await tokenBalance(user2Addr);
  // console.log(token);
})();

// 구현할 메소드
// 0. 잔여 토큰 체크
// 1. openMission => reward만큼 받아 놓는다. host -> server
// 2. closeMission => isComplete를 확인. reward를 guest의 수만큼 n분의 1해서 server에서 나눠준다. server -> guest. isComplete는 true로.
// 서버가 불필요한 가스비를 부담함.
// 3. mission(id) call => mission 정보 확인가능.
// 4. 답변 채택시 mission의 guest배열에 address 추가. recruitCount 체크, isComplete 체크

// missionid를 통해
