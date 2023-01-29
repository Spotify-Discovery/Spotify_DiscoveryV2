import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import viewReducer from './slices/viewSlice';
import playbackReducer from './slices/playbackSlice';
import songPreviewSlice from './slices/songPreviewSlice';
import searchResultsSlice from './slices/searchResultsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    playback: playbackReducer,
    previewSong: songPreviewSlice,
    searchResults: searchResultsSlice
  }
});

// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers/index.js';

// let initialState = {};

// const configureStore = () => {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunk)));
// };

// export default configureStore();