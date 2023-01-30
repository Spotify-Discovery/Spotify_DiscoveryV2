import axios from "axios"

import { refreshToken } from "../slices/userSlice";


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
      return axios({
        method: "get",
        url: `/refresh/${refresh_token}`
      })
      .then((response) => {
        if (response.status === 200) {
          return talkToSpotify(params);
        } else {
          console.log("error from talkToSpotify:");
          console.log(error);
        }
      });
    } else {
      console.log("error from talkToSpotify:");
      console.log(response);
    }
  })
  .catch((error) => {
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
  });
}

export default talkToSpotify;