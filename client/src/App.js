import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Mypage from './pages/MyPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
