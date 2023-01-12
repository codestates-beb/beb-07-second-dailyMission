import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Mypage from "./pages/MyPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.css";
import MissionDetail from "./pages/MissionDetail";
import NewMission from "./pages/NewMission";
import MintPage from './pages/nftmint';

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
        <Route path="/mint" element={<MintPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
