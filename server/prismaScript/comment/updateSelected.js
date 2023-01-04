const prisma = require('../../prisma/prisma');

const setSelected = async (id) => {
  try {
    const updateSelStatus = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        isSelected: true,
      },
    });
    return updateSelStatus;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  setSelected,
};
