import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, CardText } from "reactstrap";
import { IpfsImage } from "react-ipfs-image";
import axios from "axios";
import apiUrl from "../../utils/api";
import { missionDetailState } from "../../status/mission";
import { useRecoilValue } from "recoil";

const Comment = ({ isSigned, comment }) => {
  const missionDetail = useRecoilValue(missionDetailState);
  const [isSelected, setIsSelected] = useState(comment.isSelected);
  const [isWriter, setIsWriter] = useState(false);
  useEffect(() => {
    if (isSigned) {
      setIsWriter(
        missionDetail.userId ===
          JSON.parse(sessionStorage.getItem("signData"))["userId"]
      );
    }
  }, [isWriter, missionDetail, isSigned]);
  const onSelectClick = (e) => {
    axios
      .post(`${apiUrl}selcomment`, {
        commentId: comment.id,
        missionId: comment.missionId,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setIsSelected(true);
        }
      });
  };

  return (
    <div key={`${comment.middionId}-${comment.id}`}>
      <Card key={`${comment.middionId}-${comment.id}`}>
        <IpfsImage
          hash={comment.ipfsHash}
          style={{
            height: 300,
            width: 400,
          }}
          top
        />
        <CardBody>
          <CardText>{comment.content}</CardText>
          <CardText>
            <small className="text-muted">{comment.userId}</small>
          </CardText>
          {isSelected ? (
            <Button disabled>Selected</Button>
          ) : (
            <Button onClick={onSelectClick} disabled={!isWriter}>
              Select
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Comment;
