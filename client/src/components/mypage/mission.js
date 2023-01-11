import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mission.css';

const Mission = (props) => {
  const data = props.data;
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/missiondetail?missionid=${data.id}`);
  };
  return (
    <div className="missionContainer" onClick={clickHandler}>
      <div>{data.id}</div>
      <div>{data.title}</div>
      <div>{data.isComplete === true ? '✅' : '❎'}</div>
    </div>
  );
};

export default Mission;
