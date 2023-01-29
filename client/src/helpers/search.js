import talkToSpotify from "./talkToSpotify";
import { setTracks, setArtists } from "../slices/searchResultsSlice";

const search = {
  fromQuery: (user, dispatch, query) => {
    return talkToSpotify({
      method: 'GET',
      endpoint: '/search',
      user: user,
      dispatch: dispatch,
      query: {q: query}
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export default search;