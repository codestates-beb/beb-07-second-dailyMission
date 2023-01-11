import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { status } from '../status/store';
import axios from 'axios';
import apiUrl from '../utils/api';
import { useNavigate } from 'react-router-dom';

const MintPage = () => {
  const signStatus = useRecoilValue(status);
  const [userData, setUserData] = useState();
  useEffect(async () => {
    setUserData(await axios.get(`${apiUrl}mypage?id=${signStatus.userId}`));
  }, []);

  console.log(userData);
  const clickHandler = async () => {};
  return (
    <div className="mintpage" align="center">
      <div>Token Balance</div>
      <button onClick={clickHandler}>Mint!</button>
    </div>
  );
};

export default MintPage;
