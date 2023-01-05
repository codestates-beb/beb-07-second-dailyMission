const prisma = require("../prisma/prisma");
const { createWallet } = require("../utils/wallet");

const isUserIdExist = async (userId) => {
    const user = await prisma.user.findMany({
        where: {
            userId: userId,
        },
    });
    if (user.length === 0) return false;
    return true;
};

const isUserNameExist = async (userName) => {
    const user = await prisma.user.findMany({ where: { userName: userName } });
    if (user.length === 0) return false;
    return true;
};

module.exports = {
    signUp: async (req, res) => {
        const { userId, password, userName } = req.body;

        if (await isUserIdExist(userId)) {
            return res
                .status(200)
                .send({ status: "falied", message: "Same userId exists" });
        } else if (await isUserNameExist(userName)) {
            return res
                .status(200)
                .send({ status: "failed", message: "Same userName exists" });
        }

        const address = await createWallet(password);
        const newUser = await prisma.user.create({
            data: {
                userId: userId,
                password: password,
                userName: userName,
                address: address,
            },
        });
        return res.status(201).send({ status: "success" });
    },
};
