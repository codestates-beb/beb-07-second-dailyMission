import { create as ipfsHttpClient } from "ipfs-http-client";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, Input, Button } from "reactstrap";
import { IpfsImage } from "react-ipfs-image";

function IpfsModal({ isOpen, toggle }) {
  const [ipfsHash, setIpfsHash] = useState("");
  const [image, setImage] = useState();
  const projectId = process.env.REACT_APP_PROJECT_ID;
  const projectAPIKey = process.env.REACT_APP_API_KEY;
  const authorization = "Basic " + btoa(projectId + ":" + projectAPIKey);
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    const result = await ipfs.add(file);
    setIpfsHash(result.path);
    form.reset();
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Upload image on IPFS</ModalHeader>
      <ModalBody>
        {ipfs && (
          <>
            <Form onSubmit={onSubmitHandler}>
              <Input type="file" name="file" />
              <Button type="submit">Upload file</Button>
            </Form>
          </>
        )}
        <IpfsImage
          hash={ipfsHash}
          style={{
            height: 300,
          }}
          top
          width="100%"
        />
      </ModalBody>
      <ModalBody>{`Copy IPFS hash : ${ipfsHash}`}</ModalBody>
    </Modal>
  );
}

export default IpfsModal;
