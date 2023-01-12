import { atom } from "recoil";
const missionDetailState = atom({
  key: "missionDetailState",
  default: {},
});
const missionIdState = atom({
  key: "missionIdState",
  default: "",
});
export { missionDetailState };
