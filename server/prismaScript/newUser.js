const prisma = require('../prisma/prisma');

const createUser = async (data) => {
  const { userId, password, userName, address } = data;
  try {
    const newUserRes = await prisma.user.create({
      data: {
        userId,
        password,
        userName,
        address,
      },
    });
    return newUserRes;
  } catch (e) {
    console.log(e);
  }
};

const changeUserName = async (data) => {
  const { userId, userName } = data;
  try {
    const changeRes = await prisma.user.update({
      where: {
        userId,
      },
      data: {
        userName,
      },
    });
    return changeRes;
  } catch (e) {
    console.log(e);
  }
};

const userData = {
  userId: 'dbstn',
  password: 'asdf1234',
  userName: 'goodMan',
  address: '0x2345',
};

const changeData = {
  userId: 'alstjq',
  userName: 'angelMan',
};
