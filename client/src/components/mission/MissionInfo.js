import React from "react";
import { Form, FormGroup, Label, Col, Input, Row } from "reactstrap";

const MissionInfo = ({ missionDetail }) => {
  const { title, reward, recruitCount, content, date, time } = missionDetail;

  return (
    <div>
      <Form>
        <FormGroup row>
          <Label size="lg" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input
              name="title"
              bsSize="lg"
              value={title || ""}
              placeholder="write a title"
              disabled={true}
            />
          </Col>
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label>Reward</Label>
              <Input
                name="reward"
                type="number"
                value={reward || ""}
                disabled={true}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Recruit</Label>
              <Input
                name="recruitCount"
                value={recruitCount || ""}
                disabled={true}
              ></Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleDate">Date</Label>
              <Input
                name="date"
                placeholder="date placeholder"
                type="date"
                value={date || ""}
                disabled={true}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Time</Label>
              <Input
                name="time"
                type="time"
                value={time || ""}
                disabled={true}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input
            name="content"
            type="textarea"
            placeholder="Write your mission"
            value={content || ""}
            disabled={true}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default MissionInfo;
