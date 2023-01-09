import React, { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Row } from "reactstrap";
import { mergeDateTime, checkUndefine } from "../../utils/utils.js";

const CommentInfo = ({ mission, isWriting }) => {
  //   isWriting = true;
  const [commentValues, setCommentValues] = useState(mission);
  const handleChange = (e) => {
    setCommentValues({
      ...commentValues,
      [e.target.name]: e.target.value,
    });
    console.log(commentValues);
  };

  //   const handleSubmit = (e) => {
  //     // request body -> userid, title, reward, recruitCount, content, endDate -> check and fill request body
  //     const { title, reward, recruitCount, content, date, time } = missionValues;
  //     if (!checkUndefine(title, reward, recruitCount, content, date, time)) {
  //       const endDate = mergeDateTime(missionValues.date, missionValues.time);
  //       console.log(endDate, typeof endDate);
  //     } else {
  //       console.log("missing arg");
  //     }
  //   };
  const handleSubmit = (e) => {
    // upload file on ipfs
    const { content, file } = commentValues;
    if (!checkUndefine(content, file)) {
      const ipfsHash = commentValues.file;
      const requestBody = {
        missionid: "",
        userid: "",
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
            disabled={isWriting ? true : false}
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
