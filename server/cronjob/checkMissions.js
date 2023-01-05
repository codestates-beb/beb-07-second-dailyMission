const {
    getUncompletedMissions,
} = require('../prismaScript/mission/getUncompletedMissions');
const {
    setComplete,
    getMission,
} = require('../prismaScript/mission/setMissionComplete');
const {
    getCommentsById,
} = require('../prismaScript/comment/getCommentsByMissionId');
const { getUserById } = require('../prismaScript/user');
const checkMission = async () => {
    // const timeDiff = 9 * 60 * 60 * 1000;
    const timeDiff = 0;

    const utc = new Date().getTime();
    const kst = new Date(utc + timeDiff);

    const time = [
        kst.getFullYear(),
        kst.getMonth() + 1,
        kst.getDate(),
        kst.getHours(),
        kst.getMinutes(),
    ];

    let nowString = '';
    time.forEach((e) => {
        if (e < 10) {
            nowString += '0';
            nowString += e;
        } else nowString += e;
    });

    const uncompletedMissions = await getUncompletedMissions();
    if (!uncompletedMissions) return;

    const missions = uncompletedMissions.filter((e) => e.endDate === nowString);
    if (missions.length === 0) return;

    for (let mission of missions) {
        const missionData = await getMission(mission.id);
        const comments = await getCommentsById(mission.id);
        await setComplete(mission.id);
        const selectedComments = [];
        const selectedUserAddresses = [];
        for (let comment of comments) {
            if (comment.isSelected === true) selectedComments.push(comment);
            const userAddress = await getUserById(comment.userId);
            selectedUserAddresses.push(userAddress.address);
        }
        let distributeAmount = 0;
        if (selectedComments.length != 0) {
            distributeAmount = Math.floor(
                missionData.reward / selectedComments.length
            );
            for (let address of selectedUserAddresses) {
                // 분배 contract 필요
                console.log(`${address} 에게 ${distributeAmount}만큼 분배`);
            }
        }
    }
};

module.exports = checkMission;
