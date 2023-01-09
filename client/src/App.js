import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Mypage from "./pages/MyPage";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import MissionDetail from "./pages/MissionDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route
          path="/missiondetail"
          element={<MissionDetail isWriting={false} />}
        />
        <Route
          path="/newmission"
          element={<MissionDetail isWriting={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
