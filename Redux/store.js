// Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducer/rootReducer'; // Your combined reducers

const store = configureStore({
  reducer: rootReducer,
  // Middleware like 'thunk' is included by default with Redux Toolkit
});

export default store;
