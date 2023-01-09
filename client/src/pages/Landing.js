import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "../utils/api";

import Mission from "../components/landing/mission";

import "./Landing.css";
import { Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import { status } from "../status/store";

const Landing = () => {
  const [signStatus, setSignStatus] = useRecoilState(status);
  const [missions, setMissions] = useState([]);
  const [curPage, setPage] = useState(0);
  const getMissions = () => {
    axios.get(`${apiUrl}/missions`).then((e) => {
      e.data.status === "success"
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
  useEffect(() => {
    getMissions();
    console.log(missions);
  }, []);

  const settingSignStatus = () => {
    setSignStatus((status) => {
      return { userId: "asdf", isSigned: true };
    });
  };
  const navigate = useNavigate();
  const navigatetomypage = () => {
    navigate("/mypage");
  };

  return (
    <div align="center">
      <div className="Landing">
        <div>This is Landing</div>
        <div>{signStatus.userId}</div>
        <button onClick={settingSignStatus}>login</button>
        <button onClick={navigatetomypage}>mypage</button>
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
          <button className="newMission">new mission</button>
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
            <div className="noMissions">No missions</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
