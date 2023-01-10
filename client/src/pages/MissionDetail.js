import React, { useEffect, useState } from "react";
import MissionInfo from "../components/mission/MissionInfo.js";
import CommentInfo from "../components/mission/CommentInfo.js";
import Comment from "../components/mission/Comment";
import axios from "axios";
import apiUrl from "../utils/api";
import { useRecoilValue } from "recoil";
import { missionDetailState } from "../status/mission";
import { ListGroup, CardGroup } from "reactstrap";

const MissionDetail = ({ isWriting }) => {
  // misionid -> missionDetail -> recoil로 mission state 관리 -> 자식 컴포넌츠에서 mission state 가져오기
  const missionDetail = useRecoilValue(missionDetailState);
  const comments = missionDetail.comments;

  const writeMission = <MissionInfo isWriting={isWriting} />;
  const showMission = (
    <div>
      <MissionInfo isWriting={isWriting} />
      <CommentInfo isWriting={isWriting} />
      {comments.length !== 0 ? (
        <CardGroup>
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </CardGroup>
      ) : (
        <div>There is no comment</div>
      )}

      {/* <Comments mission={mission} isWriting={isWriting} /> */}
    </div>
  );

  return <div>{isWriting ? writeMission : showMission}</div>;
};

export default MissionDetail;
