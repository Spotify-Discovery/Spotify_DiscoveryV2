import axios from "axios"

import { refreshToken } from "../slices/userSlice";

let talkToSpotify = async (params) => {
  const access_token = !params.new_token ? params.user.access_token : params.new_token;
  const refresh_token = params.user.refresh_token;

  return axios({
    method: params.method,
    url: `${params.endpoint}?` +
      new URLSearchParams({
        token: access_token, ...params.query
      }),
    data: params.data
  })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    if (error.response.status === 401) {
      axios({
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
    }
  });
}

export default talkToSpotify;