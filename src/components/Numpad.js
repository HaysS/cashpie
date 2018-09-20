import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Button from './Button'

//Screen measurements
const { height, width } = Dimensions.get('window');
 
//Relevant for grid like keypad
const col_count = 4;
const box_width = width / col_count;

export default class Numpad extends React.Component {
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
const styles = StyleSheet.create({
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
});
