const prisma = require("../prisma/prisma");

module.exports = {
    signUp: async (req, res) => {
        const { userId, password, userName, address } = req.body;

        let user;

        //userId 중복 체크
        if (userId) {
            user = await prisma.user.findUnique({
                where: {
                    userId,
                },
            });
            if (!user) {
                console.log('User Create');
                user = await prisma.user.create({
                    data: {
                        userId: userId,
                        password: password,
                        userName: userName,
                        address: address,
                    },
                });
            } else {
                console.log('userId Duplicated');
                console.log('user');
            }
        }

    }
};