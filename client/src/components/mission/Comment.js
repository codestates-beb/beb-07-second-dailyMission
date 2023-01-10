import { useRecoilValue } from "recoil";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  Row,
  CardText,
  ListGroupItem,
} from "reactstrap";

// const missionDetail = useRecoilValue(missionDetailState);

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <ListGroupItem key={comment.id}>
      <Card className="my-2">
        <CardImg
          alt="Card image cap"
          src="https://picsum.photos/900/180"
          style={{
            height: 180,
          }}
          top
          width="100%"
        />
        <CardBody>
          <Row>
            <CardText>{comment.content}</CardText>
            <CardText>
              <small className="text-muted">{comment.userId}</small>
            </CardText>
          </Row>
        </CardBody>
      </Card>
    </ListGroupItem>
  );
};

export default Comment;
