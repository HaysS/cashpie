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
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';


//Sets dev or production config automatically
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const { StatusBarManager } = NativeModules;

//Screen measurements
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const { height, width } = Dimensions.get('window');
 
//Relevant for grid like keypad
const col_count = 4;
const box_width = width / col_count;

function Button(props) {
  return(
    <TouchableOpacity onPress={() => { props.cb() }} style={styles.box}><Text style={styles.buttonText}>{props.text}</Text></TouchableOpacity>
  )
}

function StatusBarBackground(props) {
  return(
    <View style={[styles.statusBarBackground, props.style || {}]}></View>
  ) 
}

class Numpad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '234234'};
  } 

  addChar(input) {
    console.log('input: ', input)
    const text = "" + this.state.text + input;

    InteractionManager.runAfterInteractions(() => {
      this.setState({text});
    })
  }

  clearText() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({text: ''});
    })
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={styles.topRow}>
          <Text style={styles.input}>{this.state.text}</Text>        
        </View> 
        <View style={{flex: 1}}>
          <View style={styles.row}>
            <Button text='1' cb={() => { this.addChar('1') }}/>         
            <Button text='2' cb={() => { this.addChar('2') }}/>         
            <Button text='3' cb={() => { this.addChar('3') }}/>         
            <Button text='CLR' cb={() => { this.clearText() }}/>         
          </View> 
          <View style={styles.row}>
            <Button text='4' cb={() => { this.addChar('4') }}/>         
            <Button text='5' cb={() => { this.addChar('5') }}/>         
            <Button text='6' cb={() => { this.addChar('6') }}/>         
            <Button text='blaudnfk' cb={() => {}}/>         
          </View> 
          <View style={styles.row}>
            <Button text='7' cb={() => { this.addChar('7') }}/>         
            <Button text='8' cb={() => { this.addChar('8') }}/>         
            <Button text='9' cb={() => { this.addChar('9') }}/>         
            <Button text='BLEH' cb={() => {}}/>         
          </View> 
          <View style={styles.row}>
            <Button text='0' cb={() => { this.addChar('0') }}/>         
            <Button text='' cb={() => {}}/>         
            <Button text='' cb={() => {}}/>         
            <Button text='' cb={() => {}}/>      
          </View> 
        </View>
      </View>
    )
  }
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

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
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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
