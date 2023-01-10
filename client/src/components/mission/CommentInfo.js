import React, { useState } from "react";
import { Form, FormGroup, Col, Input, Button, Row } from "reactstrap";
import { mergeDateTime, checkUndefine } from "../../utils/utils.js";
import { missionDetailState } from "../../status/mission";
import { useRecoilValue } from "recoil";

const CommentInfo = () => {
  const [commentValues, setCommentValues] = useState({});
  const missionDetail = useRecoilValue(missionDetailState);
  const handleChange = (e) => {
    setCommentValues({
      ...commentValues,
      [e.target.name]: e.target.value,
    });
    console.log(commentValues);
  };

  // uploading + hashing data
  const uploadIpfs = (file) => {};

  const handleSubmit = (e) => {
    // upload file on ipfs
    const { content, file } = commentValues;
    if (!checkUndefine(content, file)) {
      const ipfsHash = uploadIpfs(commentValues.file);
      const requestBody = {
        missionid: missionDetail.id,
        userid: JSON.parse(sessionStorage.getItem("signData"))["userId"],
        content: commentValues.content,
        ipfsHash: ipfsHash,
      };
      console.log(requestBody);
      // axios.post('/newcomment')
    } else {
      console.log("missing arg");
    }

    // login status에 따라 submit button disabled
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Input
            name="content"
            type="textarea"
            placeholder="Write your answer"
            onChange={handleChange}
            value={commentValues.content}
          />
        </FormGroup>
        <Row>
          <Col sm={10}>
            <FormGroup>
              <Input name="file" type="file" onChange={handleChange} />
            </FormGroup>
          </Col>

          <Col sm={2}>
            <Button size="lg" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CommentInfo;
