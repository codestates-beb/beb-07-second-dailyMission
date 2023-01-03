const prisma = require("../prisma/prisma");

module.exports = {
  newComment: async (req, res) => {
    try {
      const { missionId, userId, content, ipfsHash } = req.body;
      const data = { missionId, userId, content, ipfsHash, isSelected: false };
      const newCommentRes = await prisma.comment.create({ data: data });
      return newCommentRes;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
