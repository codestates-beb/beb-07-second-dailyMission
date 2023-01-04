const prisma = require("../prisma/prisma");

module.exports = {
  newComment: async (req, res) => {
    try {
      const { missionId, userId, content, ipfsHash } = req.body;
      if (!missionId || !userId || !content || !ipfsHash) {
        return res.status(400).send({
          status: "failed",
          message:
            "Invalid request body. Need missionId, userId, content, ipfsHash",
        });
      }
      const data = { missionId, userId, content, ipfsHash, isSelected: false };
      const newCommentRes = await prisma.comment.create({ data: data });
      return res
        .status(200)
        .send({ status: "success", message: newCommentRes });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .send({ status: "failed", message: "Failed in commenting" });
    }
  },
};
