import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../utils/api';
import './mission.css';

const Mission = (props) => {
  const mission = props.message;
  const [missionData, setMissionData] = useState({
    data: { message: { comments: [] } },
  });
  useEffect(() => {
    axios.get(`${apiUrl}/missiondetail?missionid=${mission.id}`).then((e) => {
      setMissionData(e);
    });
  });
  const comments = missionData.data.message.comments;
  const selectedComments = comments.reduce((sum, now) => {
    if (now.isSelected === true) return sum++;
  }, 0);

  return (
    <div className="mission">
      <div className="id">{mission.id}</div>
      <div className="recruitCount">{mission.recruitCount}</div>
      <div className="reward">{mission.reward} IT</div>
      <div className="title">
        {mission.title} ({selectedComments}/{comments.length})
      </div>
      <div className="author">{mission.userId}</div>
      <div className="createdAt">{mission.createdAt}</div>
      <div className="endAt">{mission.endDate}</div>
    </div>
  );
};

export default Mission;
