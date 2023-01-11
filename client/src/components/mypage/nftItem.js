import React from 'react';
import './nftItem.css';
import { IpfsImage } from 'react-ipfs-image';

const NFTItem = (props) => {
  const urlHeader = props.data[1].split(':')[0];
  return (
    <div className="itemContainer" align="center">
      <div className="tokenId">tokenId : {props.data[0]}</div>
      {urlHeader === 'http' || urlHeader === 'https' ? (
        <img src={props.data[1]} className="image" />
      ) : urlHeader === 'ipfs' ? (
        <>
          <IpfsImage
            hash={props.data[1]}
            gatewayUrl="https://gateway.pinata.cloud/ipfs"
            className="image"
          ></IpfsImage>
        </>
      ) : (
        `Failed to load image`
      )}
    </div>
  );
};

export default NFTItem;
