import React, { useState } from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { checkUndefine } from "../../utils/utils.js";
import IpfsModal from "./IpfsModal.js";
import axios from "axios";
import apiUrl from "../../utils/api";
import { useNavigate } from "react-router-dom";

const CommentInfo = ({ isSigned, missionDetail }) => {
  const navigate = useNavigate();
  const [commentValues, setCommentValues] = useState({});
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    setCommentValues({
      ...commentValues,
      [e.target.name]: e.target.value,
    });
    console.log(commentValues);
  };

  const handleSubmit = (e) => {
    const { content, ipfsHash } = commentValues;
    if (!checkUndefine(content)) {
      if (ipfsHash) {
        const reqBody = {
          missionId: missionDetail.id,
          userId: JSON.parse(sessionStorage.getItem("signData"))["userId"],
          content: content,
          ipfsHash: ipfsHash,
        };
        axios.post(`${apiUrl}newcomment`, reqBody).then((res) => {
          if (res.data.status === "success") {
            navigate("/");
          } else {
            alert("Comment Failed");
          }
        });
      } else console.log("failed uploading");
    } else {
      console.log("missing arg");
    }
  };

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Form>
        <Col>
          <FormGroup>
            <Input
              name="content"
              type="textarea"
              placeholder="Write your answer"
              onChange={handleChange}
              value={commentValues.content || ""}
            />
          </FormGroup>
          <Input
            name="ipfsHash"
            placeholder="Insert copied ipfs hash"
            onChange={handleChange}
            value={commentValues.ipfsHash || ""}
          />
          <Button sm={5} size="lg" onClick={toggle} disabled={!isSigned}>
            Upload file
          </Button>
          <IpfsModal isOpen={modal} toggle={toggle} />
          <Button sm={5} size="lg" onClick={handleSubmit} disabled={!isSigned}>
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default CommentInfo;
