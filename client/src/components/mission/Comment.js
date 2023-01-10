import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, CardText } from "reactstrap";
import { IpfsImage } from "react-ipfs-image";
import axios from "axios";
import apiUrl from "../../utils/api";
import signData from "../../status/isSigned";
import { missionDetailState } from "../../status/mission";
import { useRecoilValue } from "recoil";

const Comment = ({ comment }) => {
  const missionDetail = useRecoilValue(missionDetailState);
  const [isSelected, setIsSelected] = useState(comment.isSelected);
  const [isSinged, setIsSigned] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  useEffect(() => {
    setIsSigned(() => signData());
    if (
      isSinged &&
      missionDetail.userId ===
        JSON.parse(sessionStorage.getItem("signData"))["userId"]
    ) {
      setIsWriter(true);
    }
  });

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
      <Card>
        <IpfsImage
          hash={comment.ipfsHash}
          style={{
            height: 300,
          }}
          top
          width="100%"
        />
        <CardBody>
          <CardText>{comment.content}</CardText>
          <CardText>
            <small className="text-muted">{comment.userId}</small>
          </CardText>
          {isSelected ? (
            <Button disabled>Selected</Button>
          ) : isWriter ? (
            <Button onClick={onSelectClick}>Select</Button>
          ) : (
            ""
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Comment;
