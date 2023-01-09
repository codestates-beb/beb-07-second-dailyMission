import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../utils/api';

import { useRecoilState } from 'recoil';
import { status } from '../status/store';

import './MyPage.css';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState();
  const [signStatus, setSignStatus] = useRecoilState(status);
  // axios.get(`${apiUrl}/mypage?id=${}`)
  useEffect(() => {});
  return (
    <div align="center">
      <div className="mypage">
        <div className="Mypage">This is Mypage {signStatus.userId}</div>
        <div className="userInfo">
          <div className="username">username</div>
          <div className="userAddress">address</div>
        </div>
        <div className="tokenInfo">
          <div className="balances">
            <div className="tokenBalance">tokenbalance</div>
            <div className="etherBalance">etherBalance</div>
          </div>
          <div className="transferToken">
            <input
              className="receiverAddress"
              type="text"
              placeholder="receiverAddress"
            ></input>
            <input
              className="tokenTransferAmount"
              type="text"
              placeholder="tokenTransferAmout"
            ></input>
            <button className="transferToken">Transfer</button>
          </div>
        </div>
        <div className="myStuffs">
          <div className="myMissions">myMissions</div>
          <div className="myComments">myComments</div>
          <div className="myNFTs">myNFTs</div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
