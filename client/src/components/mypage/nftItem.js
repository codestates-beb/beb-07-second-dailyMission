import React from 'react';
import './nftItem.css';

const NFTItem = (props) => {
  return (
    <div className="itemContainer" align="center">
      <div className="tokenId">tokenId : {props.data[0]}</div>
      <img src={props.data[1]} className="image" />
    </div>
  );
};

export default NFTItem;
