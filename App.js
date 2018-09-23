import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import * as firebase from 'firebase'

import reducer from './src/reducers'
import Main from './src/Main'


//Sets dev or production config automatically
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

//Firebase DB Initialization
const firebaseConfig = {
   apiKey: config.database.firebase.apiKey,
   authDomain: config.database.firebase.authDomain,
   databaseURL: config.database.firebase.databaseURL,
 } 

firebase.initializeApp(firebaseConfig)

//Redux Intialization
const loggerMiddleware = createLogger({ predicate: (getState, actions) => __DEV__ })

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, 
      loggerMiddleware,
    ),
  )

  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

//App class declaration
export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}