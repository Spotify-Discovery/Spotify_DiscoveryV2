import axios from "axios"

// const handleError = (error, refresh_token, setAccess_token) => {
//   if (error.response.status === 401) {
//     axios.get(`/spotify/auth/refresh/${refresh_token}`)
//       .then((response) => {
//         setAccess_token(response.data.access_token);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   } else {
//     throw 'Something went wrong talking to Spotify!';
//   }
// }

const spotify = {

  getTopTracks: async (access_token, timeRange = 'short_term') => {
    return axios({
      method: 'get',
      url: `./topTracks?token=${access_token}&time_range=${timeRange}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res.data
    })
  }
}
export default spotify;

// const SERVER_ADDR = process.env.SERVER_ADDR + ':' + process.env.PORT;

// /**
//  *
//  * @param {*} error
//  */
// const handleError = (error, refresh_token, setAccess_token) => {
//   if (error.response.status === 401) {
//     axios.get(`/spotify/auth/refresh/${refresh_token}`)
//       .then((response) => {
//         setAccess_token(response.data.access_token);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   } else {
//     throw 'Something went wrong talking to Spotify!';
//   }
// }

// const spotify = {
//   /**
//    * Asks spotify for information from /me endpoint
//    *
//    * @param {*} access_token - auth token
//    * @param {*} refresh_token - if our auth token is expired, we need to request a new one using our refresh token
//    * @param {*} setAccess_token - our setAccess_token hook (wrapped in a non-hook function)
//    * @returns
//    */
//   whoAmI: async (access_token, refresh_token, setAccess_token) => {
//     return axios.get(`/spotify/me/${access_token}`)
//       .then((response) => {
//         if (response.status === 200) {
//           return {
//             'spotifyId': response.data.id,
//             'email': response.data.email
//           };
//         } else {
//           throw 'Something went wrong talking to Spotify!  Could not get /me';
//         }
//       })
//       .catch((error) => {
//         handleError(error, refresh_token, setAccess_token);
//       })
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} playlist_id
//    * @param {*} setAccess_token
//    * @returns
//    */
//   getPlaylist: (access_token, refresh_token, playlist_id, setAccess_token) => {
//     return axios.get(`/spotify/playlist/get/${playlist_id}/${access_token}`)
//       .then((response) => {
//         if (response.status === 200) {
//           return response.data;
//         } else {
//           throw 'Something went wrong talking to Spotify!  Could not get playlist ' + playlist_id;
//         }
//       })
//       .catch((error) => {
//         handleError(error, refresh_token, setAccess_token);
//       });
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} playlist_id
//    * @param {*} setAccess_token
//    * @param {*} body
//    * @returns
//    */
//   updatePlaylistInfo: (access_token, refresh_token, playlist_id, body, setAccess_token) => {
//     return axios.put(`/spotify/playlist/${playlist_id}/${access_token}`, body)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         handleError(error, refresh_token, setAccess_token);
//       });
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} playlist_id
//    * @param {*} setAccess_token
//    * @param {*} body
//    * @returns
//    */
//   getPlaylistTracks: (access_token, playlist_id, body, setAccess_token) => {
//     return axios.get(`/spotify/playlist/${playlist_id}/tracks/${access_token}`, body)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         handleError(error, refresh_token, setAccess_token);
//       });
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} playlist_id
//    * @param {*} body
//    * @param {*} setAccess_token
//    * @returns
//    */
//   addTrackToPlaylist: (access_token, refresh_token, playlist_id, body, setAccess_token) => {
//     return axios.post(`/spotify/playlist/${playlist_id}/tracks/${access_token}`, body)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         handleError(error, refresh_token, setAccess_token);
//       });
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} playlist_id
//    * @param {*} body
//    * @param {*} setAccess_token
//    * @returns
//    */
//   removeTrackFromPlaylist: (access_token, refresh_token, playlist_id, body, setAccess_token) => {
//     return axios.delete(`/spotify/playlist/${playlist_id}/tracks/${access_token}`, body)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         handleError(error, refresh_token, setAccess_token);
//       });
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} playlist_id
//    * @param {*} setAccess_token
//    * @returns
//    */
//   getMyPlaylists: (access_token, refresh_token, user_id, setAccess_token) => {
//     return axios.get(`/spotify/playlist/${user_id}/${access_token}`,)
//       .then((response) => {
//         if (response.status === 200) {
//           return response.data.items;

//         } else {
//           throw 'Something went wrong talking to Spotify!  Could not get user\'s playlists';
//         }
//       })
//       .catch((error) => {
//         handleError(error, refresh_token, setAccess_token);
//       });
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} user_id
//    * @param {*} setAccess_token
//    * @returns
//    */
//   createPlaylist: (access_token, refresh_token, user_id, setAccess_token) => {
//     return axios.get(`/users/${user_id}/playlists/${access_token}`)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         handleError(error);
//       });
//   },

//   /**
//    *
//    * @param {*} access_token
//    * @param {*} refresh_token
//    * @param {*} setAccess_token
//    */
//   setPlayback: (access_token, refresh_token, setAccess_token, uri) => {
//     const body = {
//       context_uri: uri
//     };

//     return axios.put(`/spotify/play/${access_token}`, body)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       handleError(error);
//     });
//   },

//   /**
//    * Spotify's Webplayback SDK
//    *
//    * @param {*} access_token - auth token
//    * @param {*} setPlayer - our setPlayer hook (wrapped in a non-hook function)
//    * @param {*} setPaused - our setPaused hook (wrapped in a non-hook function)
//    * @param {*} setActive - our setActive hook (wrapped in a non-hook function)
//    * @param {*} setTrack - our setTrack hook (wrapped in a non-hook function)
//    */
//   createAndConnectDevice: async (access_token, setPlayer, setPaused, setActive, setTrack) => {

//     // https://developer.spotify.com/documentation/web-playback-sdk/guide/#react-components
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;

//     document.body.appendChild(script);

//     window.onSpotifyWebPlaybackSDKReady = () => {

//         const player = new window.Spotify.Player({
//             name: 'neuRAVE',
//             getOAuthToken: cb => {
//               cb(access_token);
//             },
//             volume: 0.2
//         });

//         setPlayer(player);

//         player.addListener('ready', ({ device_id }) => {
//             console.log('Ready with Device ID', device_id);
//             const connectToDevice = () => {
//               const body = {
//                 device_ids: [device_id],
//                 play: false,
//               }
//               axios.put(`${SERVER_ADDR}/spotify/player/${access_token}`, body)
//                 .catch((error) => {
//                   handleError(error);
//                 });
//             }

//             connectToDevice();
//         });

//         player.addListener('not_ready', ({ device_id }) => {
//             console.log('Device ID has gone offline', device_id);
//         });

//         player.addListener("authentication_error", ({ message }) => {
//           console.error(message);
//         });

//         player.addListener('player_state_changed', ( state => {

//           if (!state) {
//               return;
//           }

//           setTrack(state.track_window.current_track);
//           setPaused(state.paused);


//           player.getCurrentState().then( state => {
//               (!state)? setActive(false) : setActive(true)
//           });

//         }));

//         player.connect().then((success) => {
//           if (success) {
//             console.log("The Web Playback SDK successfully connected to Spotify!");
//           }
//         });;

//     };
//   },
// }

// export default spotify;