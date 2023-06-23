import talkToSpotify from "./talkToSpotify";

import { setUserData, setTopTracks, setTopArtists, addToHistory } from "../slices/userSlice";

import { addToFeed, setIsLoading } from "../slices/recommendationsSlice";

import { toggleLoading, setSong } from "../slices/songPreviewSlice";

const spotify = {
  /**
   *
   * @param {*} user
   * @param {*} dispatch
   */
  getUserData: async (user, dispatch) => {
    talkToSpotify({
      method: "GET",
      endpoint: `/user`,
      user: user,
      dispatch: dispatch,
    })
      .then((data) => {
        dispatch(
          setUserData({
            username: data.display_name,
            email: data.email,
            user_id: data.id,
            market: data.country,
            product: data.product,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   *
   * @param {*} user
   * @param {*} dispatch
   * @param {*} timeRange
   */
  getTopTracks: async (user, dispatch, timeRange = "short_term") => {
    return talkToSpotify({
      method: "GET",
      endpoint: `/user/topTracks`,
      user: user,
      dispatch: dispatch,
      query: { time_range: timeRange },
    })
      .then((data) => {
        dispatch(
          setTopTracks({
            timeRange: timeRange,
            topTracks: data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   *
   * @param {*} user
   * @param {*} dispatch
   * @param {*} timeRange
   */
  getTopArtists: async (user, dispatch, timeRange = "short_term") => {
    return talkToSpotify({
      method: "GET",
      endpoint: `/user/topArtists`,
      user: user,
      dispatch: dispatch,
      query: { time_range: timeRange },
    })
      .then((data) => {
        console.log("top artists", data);
        return dispatch(
          setTopArtists({
            timeRange: timeRange,
            topArtists: data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   *
   * @param {*} user
   * @param {*} dispatch
   * @param {*} id
   */
  getRelated: (user, dispatch, track, album) => {
    dispatch(setIsLoading(true));
    dispatch(addToHistory(track));
    console.log("get related");
    talkToSpotify({
      method: "GET",
      endpoint: `/related`,
      user: user,
      dispatch: dispatch,
      query: { track_id: track.id },
    })
      .then((data) => {
        dispatch(setIsLoading(false));

        dispatch(
          addToFeed({
            type: "TRACKS",
            relatedTo: track,
            relatedTracks: data,
          })
        );
      })
      .catch((error) => {
        dispatch();
        console.log(error);
      });
  },

  getArtistDetails: (user, dispatch, artist) => {
    console.log("spot", artist);
    dispatch(setIsLoading(true));
    
    talkToSpotify({
      method: "GET",
      endpoint: `/artist`,
      user: user,
      dispatch: dispatch,
      query: { artist_id: artist.id },
    })
      .then((data) => {
        data.artist = artist;
        console.log("Artist data:", data);
        dispatch(addToHistory(data.topTracks[0]));
        dispatch(setIsLoading(false));
        dispatch(
          addToFeed({
            type: "ARTIST",
            relatedTo: artist,
            albums: data.albums.filter((album) => album.album_type === "album"),
            singles: data.albums.filter((album) => album.album_type === "single"),
            appearsOn: data.albums.filter((album) => album.album_type === "appears_on"),
            relatedArtists: data.relatedArtists,
            topTracks: data.topTracks,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getAlbumTracks: (user, dispatch, album) => {
    dispatch(setIsLoading(true));
    talkToSpotify({
      method: "GET",
      endpoint: "/album",
      user: user,
      dispatch: dispatch,
      query: { album_id: album.id, albumName: album.name },
    }).then((data) => {
      console.log("album data:", data);
      data.map((track) => {track.album = album});
      dispatch(setIsLoading(false));
      dispatch(
        addToFeed({
          type: "ALBUM",
          album: album,
          tracks: data,
        })
      );
    });
  },

  getPreview: (user, dispatch, track) => {
    dispatch(toggleLoading(true));
    return talkToSpotify({
      method: "GET",
      endpoint: "/preview",
      user: user,
      dispatch: dispatch,
      query: { 
        artistName: track.artists[0].name,
        trackName: track.name,
        albumName: track.album.name, 
      }
    })
  },

  getPreviewForArtist: (user, dispatch, artist) => {
    dispatch(toggleLoading(true));
    return talkToSpotify({
      method: "GET",
      endpoint: "/preview/artist",
      user: user,
      dispatch: dispatch,
      query: { 
        artistID: artist.id,
      }
    })
  },

  createPlaylist: (user, dispatch, tracks, relatedToName) => {
    let uris = tracks.map((track) => track.uri).join(",");
    return talkToSpotify({
      method: "POST",
      endpoint: "/playlist/create",
      user: user,
      dispatch: dispatch,
      query: {
        user_id: user.user_id,
        trackUris: uris,
        relatedToName: relatedToName,
      }
    })
  },

  followArtist: (user, dispatch, artist) => {
    return talkToSpotify({
      method: "PUT",
      endpoint: "/artist/follow",
      user: user,
      dispatch: dispatch,
      query: {
        artist_id: artist.id,
      }
    })
  }
};
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
