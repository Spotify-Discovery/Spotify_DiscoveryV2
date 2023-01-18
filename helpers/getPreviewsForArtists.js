const axios = require('axios');
const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

module.exports.getPreviewsForArtists = (array, access_token) => {
  console.log('=================================');
  // console.log(array)
  let tracks = [];
  let requests = [];
  for (var i = 0; i < array.length; i++) {
    requests.push(
      axios.get(`${SPOTIFY_BASE}search?q=artist:${array[i].name}&type=track&limit=1`,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`
            }
          })
    )
  }
  return axios.all(requests).then(axios.spread((...responses) => {
    for (var i = 0; i < responses.length; i++) {
      // console.log(responses[i].data.tracks.items[0])
      array[i]['preview_url'] = responses[i].data.tracks.items[0].preview_url;
      tracks.push(responses[i].data.tracks.items[0]);
    }
    return array;
  }))

}