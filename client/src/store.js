import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import viewReducer from './slices/viewSlice';
import playbackReducer from './slices/playbackSlice';
import songPreviewReducer from './slices/songPreviewSlice';
import searchResultsReducer from './slices/searchResultsSlice';
import recommendationsReducer from './slices/recommendationsSlice';
import contextMenuReducer from './slices/contextMenuSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    playback: playbackReducer,
    previewSong: songPreviewReducer,
    searchResults: searchResultsReducer,
    recommendations: recommendationsReducer,
    contextMenu: contextMenuReducer,
    modal: modalReducer
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