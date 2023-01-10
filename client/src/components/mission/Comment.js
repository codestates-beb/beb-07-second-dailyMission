import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, CardText, ListGroupItem } from "reactstrap";
import { IpfsImage } from "react-ipfs-image";
import axios from "axios";
import apiUrl from "../../utils/api";
// const missionDetail = useRecoilValue(missionDetailState);

const Comment = ({ comment }) => {
  const [isSelected, setIsSelected] = useState(comment.isSelected);
  useEffect(() => {
    console.log(comment);
  }, []);

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
  const onImageClick = (e) => {};
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
          onClick={onImageClick}
        />
        <CardBody>
          <CardText>{comment.content}</CardText>
          <CardText>
            <small className="text-muted">{comment.userId}</small>
          </CardText>
          {isSelected ? (
            <Button disabled>Selected</Button>
          ) : (
            <Button onClick={onSelectClick}>Select</Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Comment;
