const axios = require('axios');
const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

module.exports.searchById = (array, access_token) => {
  // console.log('=================================');
  let tracks = [];
  let requests = [];
  for (var i = 0; i < array.length; i++) {
    requests.push(
      axios.get(`${SPOTIFY_BASE}search?q=isrc:${array[i].external_ids.isrc}&type=track&limit=1`,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`
            }
          })

    )
  }
  return axios.all(requests).then(axios.spread((...responses) => {
    for (var i = 0; i < responses.length; i++) {
      tracks.push(responses[i].data.tracks.items[0]);
    }
    return tracks
  }))

}

module.exports.getNullPreviews = (track, access_token) => {
  return axios.get(`${SPOTIFY_BASE}search?q=isrc:${track.external_ids.isrc}&type=track&limit=1`,
    {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    }
  ).then((response) => {
    console.log('got res from searchById');
    return response.data.tracks.items[0].preview_url;
  })
}

module.exports.searchByIds = (data, access_token) => {
  /**
   * Spotify's search endpoint is bugged and so we actually need to search each track received from the search by its ID
   */
  return axios.get(`${SPOTIFY_BASE}me`, {
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
  })
    .then((response) => {
      //console.log(response);
      const market = response.data.country;

      let ids = '';
      data.map((track) => {
        ids += `${track.id},`
      });
      ids = ids.slice(0,-1); // remove last comma

      return axios.get(`${SPOTIFY_BASE}tracks?ids=${ids}&market=${market}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
      })
        .then((response) => {
          return response.data;
        })
    });
}