import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../utils/api';

import Mission from '../components/landing/mission';

import './Landing.css';
import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { status } from '../status/store';

import isSigned from '../status/isSigned';
import {
  UNSAFE_enhanceManualRouteObjects,
  useNavigate,
} from 'react-router-dom';

const Landing = () => {
  const [signStatus, setSignStatus] = useRecoilState(status);
  const [missions, setMissions] = useState([]);
  const [curPage, setPage] = useState(0);
  const navigate = useNavigate();
  const getMissions = () => {
    axios.get(`${apiUrl}/missions`).then((e) => {
      e.data.status === 'success'
        ? setMissions(e.data.message)
        : setMissions([]);
    });
  };
  const missionsPage = missions.slice(curPage, curPage + 10);
  const nextPage = () => {
    if (Math.floor(missions.length / 10) === Math.floor(curPage / 10)) return;
    else setPage(curPage + 10);
  };
  const prevPage = () => {
    if (Math.floor(curPage / 10) === 0) return;
    else setPage(curPage - 10);
  };

  const newMissionClickHandler = () => {
    if (signStatus.isSigned) navigate('/newmission');
    else alert('You have to sign in to create a new mission!');
  };
  useEffect(() => {
    getMissions();
    const userData = isSigned();
    if (userData.isSigned) setSignStatus(() => userData);
  }, []);

  return (
    <div align="center">
      <div className="Landing">
        <div className="buttonContainer">
          <button className="prevPage" onClick={prevPage}>
            prev page
          </button>
          <div className="curPage">
            {Math.floor(curPage / 10) + 1}/
            {Math.floor(missions.length / 10) + 1}
          </div>
          <button className="nextPage" onClick={nextPage}>
            next page
          </button>
          <button className="newMission" onClick={newMissionClickHandler}>
            new mission
          </button>
        </div>
        <div className="missionHeader">
          <div>ID</div>
          <div>R/C</div>
          <div>Reward</div>
          <div>Title(selected/comments)</div>
          <div>Author</div>
          <div>
            CreatedAt<br></br>EndAt
          </div>
        </div>
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
    </div>
  );
};

export default Landing;
