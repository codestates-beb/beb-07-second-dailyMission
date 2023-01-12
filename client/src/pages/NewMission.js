import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Col, Input, Button, Row } from "reactstrap";
import { mergeDateTime, checkUndefine } from "../utils/utils.js";
import apiUrl from "../utils/api";

const NewMission = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(sessionStorage.getItem("signData"))["userId"];
  const [missionValues, setMissionValues] = useState({ recruitCount: "1" });

  const handleChange = (e) => {
    setMissionValues({
      ...missionValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    const { title, reward, recruitCount, content, date, time } = missionValues;
    if (!checkUndefine(title, reward, recruitCount, content, date, time)) {
      const reqBody = {
        userId: userId,
        title: missionValues.title,
        reward: missionValues.reward,
        recruitCount: missionValues.recruitCount,
        content: missionValues.content,
        endDate: mergeDateTime(missionValues.date, missionValues.time),
      };
      console.log(reqBody);
      axios.post(`${apiUrl}newmission`, reqBody).then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          alert("New Mission Created");
          navigate("/");
        } else {
          alert(res.data.message);
        }
      });
    } else {
      console.log("missing arg");
    }
  };

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
              onChange={handleChange}
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
                onChange={handleChange}
                value={missionValues.reward || ""}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Recruit</Label>
              <Input
                name="recruitCount"
                type="select"
                onChange={handleChange}
                value={missionValues.recruitCount || ""}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleDate">Date</Label>
              <Input
                name="date"
                placeholder="date placeholder"
                type="date"
                onChange={handleChange}
                value={missionValues.date || ""}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Time</Label>
              <Input
                name="time"
                type="time"
                onChange={handleChange}
                value={missionValues.time || ""}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input
            name="content"
            type="textarea"
            placeholder="Write your mission"
            onChange={handleChange}
            value={missionValues.content || ""}
          />
        </FormGroup>
        <Button size="lg" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewMission;
