import { post, remove, patch, get } from "./Web.Request";
import { ENDPOINTURL } from "../utils/Helper";

export const userHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/list`, body);
};

export const userDelete = (id) => {
  return remove(`${ENDPOINTURL}/user/${id}`);
};

export const userAddData = (body) => {
  return post(`${ENDPOINTURL}/user/register`, body);
};

export const userSingleData = (id) => {
  return get(`${ENDPOINTURL}/user/${id}`);
};

export const userEditData = (id, body) => {
  return patch(`${ENDPOINTURL}/user/${id}`, body);
};



