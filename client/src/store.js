import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import viewReducer from './slices/viewSlice';
import playbackReducer from './slices/playbackSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    playback: playbackReducer,
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