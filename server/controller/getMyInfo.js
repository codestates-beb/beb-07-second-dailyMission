const { tokenContract } = require("../utils/abi/testERC-20ABI")
const { nftContract } = require("../utils/abi/testERC-721ABI")

const prisma = require("../prisma/prisma");

module.exports = {
    getMyInfo: async (req, res) => {
        const { id } = req.query;

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

        const myBalance = await tokenContract.methods
            .balanceOf(user[0].address)
            .call();

        const myNFTs = await nftContract.methods
            .getNftToken(user[0].address)
            .call();

        if (user.length === 0 || user[0].userId != req.query.id) {
            return res
                .status(200)
                .send({ status: "falied" });
        }

        if (user[0].userId === req.query.id) {
            return res
                .status(200)
                .send({
                    status: "success", message: {
                        mission: myMission,
                        comment: myComment,
                        banlance: myBalance,
                        NFT: myNFTs
                    }
                })
        }
    },
};