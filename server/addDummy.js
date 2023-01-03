const prisma = require("./prisma/prisma");

const removeData = async () => {
  await prisma.user.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.comment.deleteMany();
};

class user {
  constructor(userId, password, userName, address) {
    this.userId = userId;
    this.password = password;
    this.userName = userName;
    this.address = address;
  }
}

class mission {
  constructor(
    userId,
    title,
    reward,
    recruitCount,
    content,
    createdAt,
    endDate
  ) {
    this.userId = userId;
    this.title = title;
    this.reward = reward;
    this.recruitCount = recruitCount;
    this.content = content;
    this.createdAt = createdAt;
    this.endDate = endDate;
  }
}

class comment {
  constructor(missionId, userId, content, ipfsHash) {
    this.missionId = missionId;
    this.userId = userId;
    this.content = content;
    this.ipfsHash = ipfsHash;
  }
}

const users = [
  new user("user1", "qwer123!", "fUser", "0x1234"),
  new user("user2", "asdf123!", "sUser", "0x5678"),
  new user("user3", "zxcv123!", "tUser", "0x1357"),
];
const missions = [
  new mission(
    "user1",
    `firstUser's Mission`,
    10,
    2,
    "take Pic",
    `2301031400`,
    `2301041400`
  ),
  new mission(
    "user2",
    `secondUser's Mission`,
    100,
    10,
    "댓글",
    `2301031500`,
    `2301042000`
  ),
  new mission(
    "user3",
    `thirdUser's Mission`,
    200,
    4,
    "say hello",
    `2301031530`,
    `2301042359`
  ),
];
const comments = [
  new comment(1, `user1`, `first Pic`, `ipfs://asdf`),
  new comment(1, `user3`, `second Pic`, `ipfs://qwer`),
  new comment(2, `user2`, `comment`, `ipfs://asdf`),
  new comment(3, `user2`, `hello`, `ipfs://asdf`),
];

const addData = async () => {
  await removeData();
  for (let i of users) {
    await prisma.user.create({ data: i });
  }
  for (let i of missions) {
    try {
      await prisma.mission.create({ data: i });
    } catch (e) {
      console.log(e);
    }
  }
  for (let i of comments) {
    await prisma.comment.create({ data: i });
  }
};

addData();
