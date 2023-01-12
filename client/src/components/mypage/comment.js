import React from "react";
import { useNavigate } from "react-router-dom";
import "./comment.css";

const Comment = (props) => {
  const data = props.data;
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/missiondetail/${data.missionId}`);
  };
  return (
    <div className="commentContainer" onClick={clickHandler}>
      <div>{data.missionId}</div>
      <div>{data.content}</div>
      <div>{data.isSelected === true ? "✅" : "❎"}</div>
    </div>
  );
};

export default Comment;
