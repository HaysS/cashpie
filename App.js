import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import thunkMiddleware frmo 'redux-thunk'
import createLogger from 'redux-logger'
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

//Sets dev or production config automatically
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    hasInitialized: false,
  };

  componentDidMount() {
    console.log('env: ', env, ' !hasInitialized == ', !this.state.hasInitialized)

    if(env == 'production' && !this.state.hasInitialized) {
      Expo.Amplitude.initialize(config.amplitude.apiKey) //Amplitude analytics
      Expo.Amplitude.logEvent('USER_LOGGED_IN')

      InteractionManager.runAfterInteractions(() => {
        this.setState({hasIntialized: true})
      })
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
