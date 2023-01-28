const axios = require('axios');
const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

module.exports.getAlbumTracks = (array, access_token) => {
  console.log('=================================');
  // console.log(array)
  let tracks = [];
  let requests = [];
  for (var i = 0; i < array.length; i++) {
    requests.push(
      axios.get(`${SPOTIFY_BASE}albums/${array[i].id}/tracks?market=US&limit=1`,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`
            }
          })
    )
  }
  return axios.all(requests).then(axios.spread((...responses) => {
    for (var i = 0; i < responses.length; i++) {
      // console.log(responses[i].data)
      array[i]['tracks'] = responses[i].data.items;
    }
    return array;
  }))

}