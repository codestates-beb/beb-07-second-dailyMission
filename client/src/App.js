import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Mypage from "./pages/MyPage";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.css";
import MissionDetail from "./pages/MissionDetail";
import NewMission from "./pages/NewMission";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path={"/missiondetail"} element={<MissionDetail />} />
        <Route path="/newmission" element={<NewMission />} />
        <Route path="signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
