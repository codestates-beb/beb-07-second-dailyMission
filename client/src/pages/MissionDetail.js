import React, { useEffect, useState } from "react";
import MissionInfo from "../components/mission/MissionInfo.js";
import CommentInfo from "../components/mission/CommentInfo.js";
import Comment from "../components/mission/Comment";
import { useRecoilValue } from "recoil";
import { missionDetailState } from "../status/mission";
import { CardGroup } from "reactstrap";
import axios from "axios";
import apiUrl from "../utils/api";

import Mission from "../components/landing/mission";

const MissionDetail = ({ isWriting }) => {
  // misionid -> missionDetail -> recoil로 mission state 관리 -> 자식 컴포넌츠에서 mission state 가져오기
  const missionDetail = useRecoilValue(missionDetailState);
  const comments = missionDetail.comments;
  const [isSigned, setIsSigned] = useState(false);
  const [missions, setMissions] = useState([]);
  const missionsPage = missions.slice(0, 10);
  const getMissions = () => {
    axios.get(`${apiUrl}/missions`).then((e) => {
      e.data.status === "success"
        ? setMissions(e.data.message)
        : setMissions([]);
    });
  };
  useEffect(() => {
    getMissions();
    setIsSigned(() => {
      return sessionStorage.getItem("signData") ? true : false;
    });
  }, [isSigned]);

  const writeMission = (
    <div>
      <MissionInfo isSigned={isSigned} isWriting={isWriting} />
    </div>
  );
  const showMission = (
    <div>
      <MissionInfo isSigned={isSigned} isWriting={isWriting} />
      <CommentInfo isSigned={isSigned} />
      {comments.length !== 0 ? (
        <CardGroup>
          {comments.map((comment) => (
            <Comment isSigned={isSigned} comment={comment} />
          ))}
        </CardGroup>
      ) : (
        <div>There is no comment</div>
      )}
      <div className="missionsContainer" align="center">
        {missions.length !== 0 ? (
          missionsPage.map((e) => {
            return <Mission key={missions.indexOf(e)} message={e} />;
          })
        ) : (
          <div className="noMissions">There is no pending missions</div>
        )}
      </div>
    </div>
  );

  return <div>{isWriting ? writeMission : showMission}</div>;
};

export default MissionDetail;
