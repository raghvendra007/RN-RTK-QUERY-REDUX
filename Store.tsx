// import {createStore, applyMiddleware} from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './RootReducer'; // Import your root reducer
// import rootSaga from './RootSaga'; // Import your root saga
// import logger from 'redux-logger';

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// sagaMiddleware.run(rootSaga);

// export default store;
import {configureStore} from '@reduxjs/toolkit';
import {cartSlice} from './cartSlice';
import {myPost} from './api';
const store = configureStore({
  reducer: {
    [myPost.reducerPath]: myPost.reducer,
    [cartSlice.name]: cartSlice.reducer,

    // or we can write like this also
    // myPost:myPost.reducer,
    // cartSlice:cartSlice.reducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(myPost.middleware),
});

export default store;
