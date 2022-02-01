import { people } from "./mockdata";

export const getPeopleData = () => {
  return Promise.resolve(people);
};

const sendData = () => {};

export default sendData;
