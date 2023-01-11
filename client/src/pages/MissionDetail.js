import React, { useEffect, useState } from "react";
import MissionInfo from "../components/mission/MissionInfo.js";
import CommentInfo from "../components/mission/CommentInfo.js";
import Comment from "../components/mission/Comment";
import { useRecoilValue } from "recoil";
import { missionDetailState } from "../status/mission";
import { CardGroup } from "reactstrap";

const MissionDetail = ({ isWriting }) => {
  // misionid -> missionDetail -> recoil로 mission state 관리 -> 자식 컴포넌츠에서 mission state 가져오기
  const missionDetail = useRecoilValue(missionDetailState);
  const comments = missionDetail.comments;
  const [isSigned, setIsSigned] = useState(false);
  useEffect(() => {
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
    </div>
  );

  return <div>{isWriting ? writeMission : showMission}</div>;
};

export default MissionDetail;
