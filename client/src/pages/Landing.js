import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../utils/api";

import Mission from "../components/landing/mission";

import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  const [missions, setMissions] = useState([]);
  const getMissions = () => {
    axios.get(`${apiUrl}/missions`).then((e) => {
      e.data.status === "success"
        ? setMissions(e.data.message)
        : setMissions([]);
    });
  };

  useEffect(() => {
    getMissions();
    console.log(missions);
  }, []);

  return (
    <div className="Landing" align="center">
      <div>This is Landing</div>
      <button>prev page</button>
      <button>next page</button>
      {/* <button>new mission</button> */}
      <Link to="/newmission">
        <button>new mission</button>
      </Link>
      <div className="missionHeader">
        <div>ID</div>
        <div>R/C</div>
        <div>Reward</div>
        <div>Title(selected/comments)</div>
        <div>Author</div>
        <div>CreatedAt</div>
      </div>
      <div className="missionsContainer" align="center">
        {missions.length !== 0 ? (
          missions.map((e) => {
            return <Mission key={missions.indexOf(e)} message={e} />;
          })
        ) : (
          <div className="noMissions">No missions</div>
        )}
      </div>
    </div>
  );
};

export default Landing;
