import React, { useState } from "react";
import MissionInfo from "../components/mission/MissionInfo.js";
import CommentInfo from "../components/mission/CommentInfo.js";
import axios from "axios";

const MissionDetail = async () => {
  const [isWriting, setIsWriting] = useState(false);
  let mission = {};
  // misionid -> missionDetail -> recoil로 mission state 관리 -> 자식 컴포넌츠에서 mission state 가져오기
  const missionid = 1;
  mission = await axios.get(`/missiondetail?missionid=${missionid}`);
  console.log(mission);

  const writeMission = <MissionInfo mission={{}} isWriting={isWriting} />;
  const showMission = (
    <div>
      <MissionInfo mission={mission} isWriting={isWriting} />
      <CommentInfo mission={mission} isWriting={isWriting} />
      {/* <Comments mission={mission} isWriting={isWriting} /> */}
    </div>
  );

  return (
    <div className="newmission">{isWriting ? writeMission : showMission}</div>
  );
};

export default MissionDetail;
