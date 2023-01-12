import React from "react";
import { Form, FormGroup, Label, Col, Input, Row } from "reactstrap";

const MissionInfo = ({ missionDetail }) => {
  const { title, reward, recruitCount, content, date, time, userId } =
    missionDetail;

  return (
    <div>
      <Form>
        <Row>
          <Col md={5}>
            <FormGroup>
              <Label size="lg" sm={3}>
                Title
              </Label>
              <Input
                name="title"
                bsSize="lg"
                value={title || ""}
                placeholder="write a title"
                disabled={true}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>User</Label>
              <Input name="userId" value={userId || ""} disabled={true} />
            </FormGroup>
          </Col>
        </Row>

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
