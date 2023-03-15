import axios from "axios"

import { refreshToken } from "../slices/userSlice";
import UserNotRegistered from './UserNotRegistered';

/**
 *
 * @returns
 */
let refreshAccessToken = () => {
  return axios({
    method: "get",
    url: `/refresh?` + new URLSearchParams({refresh_token: refresh_token})
  })
  .then((response) => {
    if (response.status === 200) {
      return talkToSpotify(params);
    } else {
      console.log("error from talkToSpotify:");
      console.log(error);
    }
  });
}

/**
 *
 * @param {*} params
 * @returns
 */
let talkToSpotify = async (params) => {
  const refresh_token = localStorage.getItem('refresh_token');

  return axios({
    method: params.method,
    url: `${params.endpoint}?` +
      new URLSearchParams({
        ...params.query
      }),
    data: params.data
  })
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      return refreshAccessToken();
    } else {
      console.log("error from talkToSpotify:");
      console.log(response);
    }
  })
  .catch((error) => {
    if (error.response.status === 401) {
      return refreshAccessToken();
    } else if (error.response.status === 403) {
      throw new UserNotRegistered();
    }
  });
}

export default talkToSpotify;