import React from "react";
import { Card, CardBody, Button, CardText, ListGroupItem } from "reactstrap";
import { IpfsImage } from "react-ipfs-image";
// const missionDetail = useRecoilValue(missionDetailState);

const Comment = ({ comment }) => {
  const onSelectClick = (e) => {
    console.log(comment.id);
  };
  const onImageClick = (e) => {};
  return (
    <Card key={`${comment.middionId}-${comment.id}`}>
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
        <Button onClick={onSelectClick}>Select</Button>
      </CardBody>
    </Card>
  );
};

export default Comment;
