import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { status } from '../status/store';
import axios from 'axios';
import apiUrl from '../utils/api';
import { useNavigate } from 'react-router-dom';
import signData from '../status/isSigned';
import data from '../utils/data';
import { IpfsImage } from 'react-ipfs-image';

const MintPage = () => {
  const [signStatus, setSignStatus] = useRecoilState(status);
  const [mintStatus, setMintStatus] = useState({ status: 'waiting', img: '' });
  const userData = signData();
  const navigate = useNavigate();
  const [userInfo, setUserData] = useState({ banlance: 0 });
  useEffect(() => {
    if (!userData.isSigned) navigate('/');
    axios.get(`${apiUrl}mypage?id=${userData.userId}`).then((res) => {
      setUserData(res.data.message);
      setSignStatus(userData);
    });
  }, []);

  const clickHandler = () => {
    axios
      .post(`${apiUrl}transfertokentoserver`, {
        senderAddr: signStatus.address,
        amount: data.mint_price,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          axios
            .post(`${apiUrl}mintnft`, { address: signStatus.address })
            .then((res) => {
              if (res.data.status === 'Success') {
                setMintStatus({ status: 'success', img: res.data.message });
              } else {
                setMintStatus({ status: 'fail', img: '' });
              }
            });
        } else {
          alert(res.data.message);
          setMintStatus({ status: 'fail', img: '' });
        }
      });
  };
  return (
    <div className="mintpage" align="center">
      <div>Token Balance : {userInfo.banlance}</div>
      <div>Mint Price : {data.mint_price} token</div>
      <br></br>
      <button onClick={clickHandler}>Mint!</button>
      <div>
        {mintStatus.status === 'success' ? (
          <div>
            <div>Your New NFT Here!</div>
            <>
              <IpfsImage
                hash={mintStatus.img}
                gatewayUrl="https://gateway.pinata.cloud/ipfs"
              ></IpfsImage>
            </>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default MintPage;
