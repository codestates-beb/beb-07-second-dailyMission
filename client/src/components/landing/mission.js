import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../utils/api';
import './mission.css';
import { dateFormatter } from '../../utils/dateFormatter';
import { useRecoilState } from 'recoil';
import { missionDetailState } from '../../status/mission';

const Mission = (props) => {
  const mission = props.message;
  const [missionData, setMissionData] = useState({
    data: { message: { comments: [] } },
  });
  useEffect(() => {
    axios.get(`${apiUrl}missiondetail?missionid=${mission.id}`).then((e) => {
      setMissionData(e);
    });
  }, []);
  const navigate = useNavigate();
  const comments = missionData.data.message.comments;
  const selectedComments = comments.reduce((sum, now) => {
    if (now.isSelected === true) return sum++;
  }, 0);

  const handleMissionClick = (e) => {
    navigate(`/missiondetail?missionid=${mission.id}`);
    console.log(mission.id);
    setMissionDetail(missionData.data.message);
  };
  const [missionDetail, setMissionDetail] = useRecoilState(missionDetailState);

  return (
    <div className="mission">
      <div className="id">{mission.id}</div>
      <div className="recruitCount">{mission.recruitCount}</div>
      <div className="reward">{mission.reward} IT</div>
      <div className="title" onClick={handleMissionClick}>
        {mission.title} ({selectedComments}/{comments.length})
      </div>
      <div className="author">{mission.userId}</div>
      <div className="createdAt">{dateFormatter(mission.createdAt)}</div>
      <div className="endAt">{dateFormatter(mission.endDate)}</div>
    </div>
  );
};

export default Mission;
