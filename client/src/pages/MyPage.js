import React from 'react';

import './MyPage.css';

const Mypage = () => {
  return (
    <div className="mypage">
      <div className="Mypage">This is Mypage</div>
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
  );
};

export default Mypage;
