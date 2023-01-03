const prisma = require("../prisma/prisma");

module.exports = {
  missions: async (req, res) => {
    try {
      const missionsNotCompleted = await prisma.mission.findMany({
        where: {
          isComplete: false,
        },
      });
      res.send({ status: "success", message: missionsNotCompleted });
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Failed to call missions" });
    }
  },
  missionDetail: async (req, res) => {
    console.log(req.query);
    try {
      const { missionid } = req.query;
      const missionDetailRes = await prisma.mission.findUnique({
        where: { id: parseInt(missionid) },
      });

      res.send({ status: "success", message: missionDetailRes });
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Failed to call the mission" });
    }
  },
  newMission: async (req, res) => {
    try {
      console.log(req.body);
      const { userId, title, reward, recruitCount, content, endDate } =
        req.body;

      const address = await prisma.user.findUnique({
        where: { userId: userId },
      });
      // 잔고 체크 + address와 비밀번호를 가지고 total = reward + 35 token 송금.
      // contract.methods.balanceOf(address) 과 total 비교

      data = {
        userId: userId,
        title: title,
        reward: parseInt(reward),
        recruitCount: parseInt(recruitCount),
        content: content,
        createdAt: new Date(),
        updatedAt: new Date(),
        endDate: endDate,
        isComplete: false,
      };
      const newMissionRes = await prisma.mission.create({ data: data });
      res.send({ status: "success", message: newMissionRes });
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Failed to add the mission" });
    }
  },
};

// client/mission에 접근시 client에서 server/mission로 요청
// server/mission => array of mission 반환
// const [missions, setMissions] = useState() 뭐 이런식
// missions.map(()) 해서 각 컴포넌트에 props 뿌림
// 컴포넌트는 Link to='/mission/detail?missionId=#로 연결 이거도 props로 뿌림.
// 위의 페이지에서는 missionId를 받아와서 mission data + comment data 가져오기

// const Web3 = require("web3");
// const abi = require("../utils/ERC20abi");
// const web = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// const erc20Address = "0xb711fcEaec7377D84eb8A6107B9190d417426596";

// const hostAddr = "0x74BBFDC4D1f6f18D94E1a32AE88FedBdA30Ca8e7";
// const hostPrivateKey =
//   "68ababc729468392d4697546b4f4d87afb283c1110ec80b632b3dac6b2678d66";
// const user1Addr = "0x7eA2f58FEB7C8BA8A1ed46520955a8233BFBE9D3";
// const user2Addr = "0xA6dc4fae0553Bd19F8688e701b47a51ED2beA031";

// const tokenContract = new web.eth.Contract(abi, erc20Address);
// tokenContract.methods
//   .balanceOf(hostAddr)
//   .call()
//   .then((bal) => {
//     console.log(bal);
//   }).

// tokenContract.methods.transfer(user1Addr, 10000).then((tx) => console.log(tx));

// tokenContract.methods
//   .balanceOf(user1Addr)
//   .call()
//   .then((bal) => {
//     console.log(bal);
//   });

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
