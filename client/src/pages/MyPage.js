import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../utils/api';

import { useRecoilState } from 'recoil';
import { status } from '../status/store';
import signData from '../status/isSigned';
import NFTComp from '../components/mypage/nftItem';
import MissionComp from '../components/mypage/mission';
import CommentComp from '../components/mypage/comment';
import web3Data from './web3';
import Web3 from 'web3';

import './MyPage.css';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [userId, setUserId] = useState('');
  const [signStatus, setSignStatus] = useRecoilState(status);
  const [ethBalance, setEthBalance] = useState(0);
  const [receiverAddr, setReceiverAddr] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`${web3Data.network}:${web3Data.port}`)
  );

  useEffect(() => {
    const userData = signData();
    if (userData.isSigned) {
      setUserId(userData.userId);
    } else if (!userData.isSigned) {
      alert('You need to Sign in');
      return navigate('/');
    }
    web3.eth
      .getBalance(userData.address)
      .then((res) => setEthBalance(web3.utils.fromWei(res, 'ether')));
    axios.get(`${apiUrl}mypage?id=${userData.userId}`).then((res) => {
      setUserInfo(res.data.message);
      setSignStatus(userData);
    });
  }, []);

  const receiverEvent = (e) => {
    setReceiverAddr(e.target.value);
  };

  const amountHandler = (e) => {
    setTransferAmount(e.target.value);
  };

  const transferClickHandler = (e) => {
    axios
      .post(`${apiUrl}transfertoken`, {
        senderAddr: signStatus.address,
        receiverAddr,
        amount: transferAmount,
      })
      .then((res) => {
        alert(`Result : ${res.data.status}, ${res.data.message}`);
        window.location.reload();
      });
  };
  return (
    <div align="center">
      <div className="mypage">
        <div className="userInfo">
          <div className="username">
            username<br></br>
            {signStatus.userName}
          </div>
          <div className="userAddress">
            address<br></br>
            {signStatus.address}
          </div>
        </div>
        <div className="tokenInfo">
          <div className="balances">
            <div className="tokenBalance">
              tokenBlance :
              {typeof userInfo === 'undefined' ? 0 : userInfo.banlance}
            </div>
            <div className="etherBalance">etherBalance : {ethBalance} ETH</div>
          </div>
          <div className="transferToken">
            <input
              className="receiverAddress"
              type="text"
              placeholder="receiverAddress"
              onChange={receiverEvent}
            ></input>
            <input
              className="tokenTransferAmount"
              type="number"
              placeholder="tokenTransferAmount"
              onChange={amountHandler}
            ></input>
            <button className="transferToken" onClick={transferClickHandler}>
              Transfer
            </button>
          </div>
        </div>
        <div className="myStuffs">
          <div className="myMissions">
            <div className="missionTitleContainer">
              <div className="mymissionstitle">MyMissions</div>
              <div>ID</div>
              <div>Title</div>
              <div>Complete</div>
            </div>
            <div>
              {typeof userInfo !== 'undefined'
                ? userInfo.mission.length === 0
                  ? `No Missions`
                  : userInfo.mission.map((e) => (
                      <MissionComp key={userInfo.mission.indexOf(e)} data={e} />
                    ))
                : `no data`}
            </div>
          </div>
          <div className="myComments">
            <div className="commentTitleContainer">
              <div className="mycommentstitle">MyComments</div>
              <div>missionID</div>
              <div>Content</div>
              <div>Complete</div>
            </div>
            <div>
              {typeof userInfo !== 'undefined'
                ? userInfo.comment.length === 0
                  ? `No Comments`
                  : userInfo.comment.map((e) => (
                      <CommentComp key={userInfo.comment.indexOf(e)} data={e} />
                    ))
                : `no data`}
            </div>
          </div>
          <div className="myNFTs">
            <div>My NFTs</div>
            <div>
              {typeof userInfo !== 'undefined'
                ? userInfo.nft.length === 0
                  ? `No Items`
                  : userInfo.nft.map((e) => (
                      <NFTComp key={userInfo.nft.indexOf(e)} data={e} />
                    ))
                : `no data`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
