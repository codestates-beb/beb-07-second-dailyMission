import React, { useEffect, useState } from "react";
import { Form, FormGroup, Col, Input, Button, Row } from "reactstrap";
import { mergeDateTime, checkUndefine } from "../../utils/utils.js";
import { missionDetailState } from "../../status/mission";
import { useRecoilValue } from "recoil";
import { create as ipfsHttpClient } from "ipfs-http-client";
// import { ImageUpload } from "react-ipfs-uploader";

const CommentInfo = ({ isSigned }) => {
  const [commentValues, setCommentValues] = useState({});
  const missionDetail = useRecoilValue(missionDetailState);
  const handleChange = (e) => {
    setCommentValues({
      ...commentValues,
      [e.target.name]: e.target.value,
    });
  };

  const {
    REACT_APP_IPFS_API_ENDPOINT,
    REACT_APP_API_KEY,
    REACT_APP_PROJECT_ID,
  } = process.env;
  const projectId = process.env.REACT_APP_PROJECT_ID;
  const projectAPIKey = process.env.REACT_APP_API_KEY;
  const authorization = "Basic " + btoa(projectId + ":" + projectAPIKey);
  const [uploadedImage, setUploadedImage] = useState();
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  // uploading + hashing data
  const uploadIpfs = async () => {
    return false;
  };

  const handleSubmit = (e) => {
    // upload file on ipfs
    const { content, file } = commentValues;
    if (!checkUndefine(content, file)) {
      const ipfsHash = uploadIpfs(file);
      if (ipfsHash) {
        const requestBody = {
          missionid: missionDetail.id,
          userid: JSON.parse(sessionStorage.getItem("signData"))["userId"],
          content: content,
          ipfsHash: ipfsHash,
        };
        console.log(requestBody);
      } else console.log("failed uploading");
    } else {
      console.log("missing arg");
    }

    // login status에 따라 submit button disabled
  };
  // useEffect(() => {}, []);

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
            {/* <ImageUpload setUrl={setImageUrl} /> */}
            {/* ImageUrl :
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              {imageUrl}
            </a> */}
          </Col>
          <Col sm={2}>
            <Button size="lg" onClick={handleSubmit} disabled={!isSigned}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CommentInfo;
