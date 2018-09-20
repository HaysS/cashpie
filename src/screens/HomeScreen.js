import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar, 
  Dimensions,
  TouchableOpacity,
  InteractionManager,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


// # Save code below in case encountering status bar issues later #
// const { StatusBarManager } = NativeModules;
// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

//Screen measurements
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
    // console.log('input: ', input)
    // const text = "" + this.state.text + input;

    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({text});
    // })
  }

  clearText() {
    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({text: ''});
    // })
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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Numpad />
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
///Lines for component styling is here, remove this latere
  topRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  input: {
    fontSize: 55,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    borderWidth: 2,
    flexDirection: 'column',
    borderColor: 'black',
    height: height,
    width: box_width,
    backgroundColor: '#CECCCF',
    alignItems: "center",
  },
  buttonText: {
    flex: 1,
  },
});
