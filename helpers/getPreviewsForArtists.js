const axios = require('axios');
const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

module.exports.getPreviewsForArtists = (array, access_token) => {
  console.log('=================================');
  // console.log(array)
  let tracks = [];
  let requests = [];
  for (var i = 0; i < array.length; i++) {
    requests.push(
      axios.get(`${SPOTIFY_BASE}artists/${array[i].id}/top-tracks?market=US`,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`
            }
          })
    )
  }
  return axios.all(requests).then(axios.spread((...responses) => {
    for (var i = 0; i < responses.length; i++) {
      console.log(responses[i].data.tracks[0])
      array[i]['preview_url'] = responses[i].data.tracks[0].preview_url;
    }
    return array;
  }))

}