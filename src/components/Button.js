import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

//Screen measurements
const { height, width } = Dimensions.get('window');
 
//Relevant for grid like keypad
const col_count = 4;
const box_width = width / col_count;

export default class Button extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			text: props.text,
			cb: props.cb,
		}
	}

	render() {
		return(
			<TouchableOpacity onPress={() => { this.state.cb() }} style={styles.box}><Text style={styles.buttonText}>{this.state.text}</Text></TouchableOpacity>
		)
	}
  
}
const styles = StyleSheet.create({
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
