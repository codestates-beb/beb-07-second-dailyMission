import React, { useEffect, useState } from "react";
import MissionInfo from "../components/mission/MissionInfo.js";
import CommentInfo from "../components/mission/CommentInfo.js";
import Comment from "../components/mission/Comment";
import { CardGroup } from "reactstrap";
import axios from "axios";
import apiUrl from "../utils/api";
import Mission from "../components/landing/mission";
import isSigned from "../status/isSigned";
import { useRecoilState } from "recoil";
import { status } from "../status/store";
import { useParams } from "react-router-dom";
import { dateFormatter } from "../utils/dateFormatter.js";

const MissionDetail = () => {
  // misionid -> missionDetail -> recoil로 mission state 관리 -> 자식 컴포넌츠에서 mission state 가져오기
  const [missionDetail, setMissionDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [signed, setSigned] = useState(false);
  const [signStatus, setSignStatus] = useRecoilState(status);
  const [missions, setMissions] = useState([]);
  const missionsPage = missions.slice(0, 10);
  const { missionid } = useParams();

  const getMissions = () => {
    axios.get(`${apiUrl}/missions`).then((e) => {
      e.data.status === "success"
        ? setMissions(e.data.message)
        : setMissions([]);
    });
  };

  useEffect(() => {
    const getMission = async () => {
      const res = await axios.get(
        `${apiUrl}missiondetail?missionid=${missionid}`
      );
      const mission = res.data.message;
      setMissionDetail(() => {
        const [date, time] = dateFormatter(mission.endDate).split(" ");
        mission.date = "20" + date;
        mission.time = time;
        return mission;
      });
      setComments(mission.comments);
    };

    const userData = isSigned();
    setSigned(userData.isSigned);
    if (userData.isSigned) setSignStatus(() => userData);
    getMission();
    getMissions();
  }, [missionid]);

  const showMission = (
    <div>
      <MissionInfo missionDetail={missionDetail} />
      <CommentInfo isSigned={signed} missionDetail={missionDetail} />
      {comments.length !== 0 ? (
        <CardGroup>
          {comments.map((comment) => (
            <Comment isSigned={signed} comment={comment} />
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

  return <div>{showMission}</div>;
};

export default MissionDetail;
