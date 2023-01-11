import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Col, Input, Button, Row } from "reactstrap";
import { mergeDateTime, checkUndefine } from "../../utils/utils.js";
import apiUrl from "../../utils/api";
import { missionDetailState } from "../../status/mission";
import { useRecoilValue } from "recoil";
import { dateFormatter } from "../../utils/dateFormatter";

const MissionInfo = ({ isSigned }) => {
  const missionDetail = useRecoilValue(missionDetailState);
  const [userId, setUserId] = useState("");
  const [missionValues, setMissionValues] = useState(missionDetail);

  useEffect(() => {
    if (isSigned) {
      setUserId(JSON.parse(sessionStorage.getItem("signData"))["userId"]);
    }
    const [date, time] = dateFormatter(missionValues.endDate).split(" ");
    setMissionValues((curr) => {
      const withDateTime = { ...curr };
      withDateTime.date = "20" + date;
      withDateTime.time = time;
      return withDateTime;
    });
  }, []);

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
              value={missionValues.title || ""}
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
                value={missionValues.reward || ""}
                disabled={true}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Recruit</Label>
              <Input
                name="recruitCount"
                value={missionValues.recruitCount || ""}
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
                value={missionValues.date || ""}
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
                value={missionValues.time || ""}
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
            value={missionValues.content || ""}
            disabled={true}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default MissionInfo;
