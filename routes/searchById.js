const axios = require('axios');
const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

module.exports.searchById = (array, access_token) => {
  console.log('=================================');
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


  // for (var i = 0; i < array.length; i++) {
  //   promises.push(
  //     axios.get(`${SPOTIFY_BASE}search?q=isrc:${array[i].external_ids.isrc}&type=track&limit=1`,
  //       {
  //         headers: {
  //           "Authorization": `Bearer ${access_token}`
  //         }
  //       }).then((res) => {
  //         res.data.tracks.items[0].index = count;
  //         tracks.push(res.data.tracks.items[0])
  //       })
  //   )
  // }

  // return Promise.all(promises)
  //   .then((res) => {
  //     // console.log(tracks)
  //     return tracks
  //   })
  // for (var i = 0; i < array.length; i++) {
  //   if (array[i].preview_url === null) {
  //     // console.log('null', i)
  //     axios.get(`${SPOTIFY_BASE}search?q=isrc:${array[i].external_ids.isrc}&type=track&limit=1`,
  //       {
  //         headers: {
  //           "Authorization": `Bearer ${access_token}`
  //         }
  //       }).then((result) => {
  //         console.log('name:', result.data.tracks.items[0].name, 'url', result.data.tracks.items[0].preview_url, 'index', i)
  //         // array[i].preview_url = result.data.tracks.items[0].preview_url;
  //         // console.log('replaced with:', array[i].preview_url)
  //       })
  //       .catch(err => console.log(err))
  //   }
  // }

  // return array;
}

