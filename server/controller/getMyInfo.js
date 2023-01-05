const prisma = require("../prisma/prisma");

module.exports = {
    getMyInfo: async (req, res) => {
        const { id } = req.body;

        const user = await prisma.user.findMany({
            where: {
                userId: id,
            },
        })

        const myMission = await prisma.mission.findMany({
            where: {
                userId: id,
            },
        })

        const myComment = await prisma.comment.findMany({
            where: {
                userId: id,
            },
        })

        if (user.length === 0 || user[0].userId != req.body.id) {
            return res
                .status(200)
                .send({ status: "falied" });
        }

        if (user[0].userId === req.body.id) {
            return res
                .status(200)
                .send({
                    status: "success", message: {
                        mission: myMission,
                        comment: myComment,
                    }
                })
        }
    },
};