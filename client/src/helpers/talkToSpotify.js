import axios from "axios"

let talkToSpotify = async (params) => {
  const access_token = params.user.access_token;
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
    console.log("error from talkToSpotify:");
    console.log(error);
  });
}

export default talkToSpotify;