import React, { useState } from "react";
import MissionInfo from "../components/mission/MissionInfo.js";
import CommentInfo from "../components/mission/CommentInfo.js";
import axios from "axios";
import apiUrl from "../utils/api";

const MissionDetail = ({ isWriting }) => {
  // misionid -> missionDetail -> recoil로 mission state 관리 -> 자식 컴포넌츠에서 mission state 가져오기
  const missionid = 1;

  const writeMission = <MissionInfo isWriting={isWriting} />;
  const showMission = () => {
    axios.get(`${apiUrl}/missiondetail?missionid=${missionid}`).then((res) => {
      res.data.status === "success"
        ? console.log("success", res.data.message)
        : console.log("failed");
    });
    return (
      <div>
        <MissionInfo isWriting={isWriting} />
        <CommentInfo isWriting={isWriting} />
        {/* <Comments mission={mission} isWriting={isWriting} /> */}
      </div>
    );
  };

  return <div>{isWriting ? writeMission : showMission()}</div>;
};

export default MissionDetail;
