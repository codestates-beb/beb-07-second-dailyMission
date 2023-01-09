import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Mypage from "./pages/MyPage";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.css";
import MissionDetail from "./pages/MissionDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route
          path={"/missiondetail"}
          element={<MissionDetail isWriting={false} />}
        />
        <Route
          path="/newmission"
          element={<MissionDetail isWriting={true} />}
        />
        <Route path="signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
