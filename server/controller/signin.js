const prisma = require("../prisma/prisma");

module.exports = {
    signIn: async (req, res) => {
        const { id, pw } = req.body;
        const user = await prisma.user.findMany({
            where: {
                userId: id,
            },
        })

        if (user.length === 0 || user[0].userId != req.body.id) {
            return res
                .status(200)
                .send({ status: "falied", message: "로그인 정보가 일치하지 않습니다." });
        } else if (user[0].password != req.body.pw) {
            return res
                .status(200)
                .send({ status: "falied", message: "로그인 정보가 일치하지 않습니다." });
        }
        return res.status(200).send({
            status: "success", message: {
                userId: user[0].userId,
                userName: user[0].userName,
                address: user[0].address,
            }
        });
    },
};