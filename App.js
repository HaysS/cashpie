import React from 'react';
import { 
  Platform, 
  StatusBar, 
  StyleSheet, 
  View, 
  Dimensions,
  Text,
  TouchableOpacity,
  NativeModules,
  InteractionManager, } from 'react-native';
import Expo, { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './src/reducers'
import Main from './src/Main'


//Sets dev or production config automatically
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

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

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}