/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';

class Description extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: 'N/A',
        email: 'N/A',
        phoneNumber: 'N/A',
        gender: 'N/A',
        date: 'N/A',
        avatarSource: ''
     }
  }

  componentWillMount () {
    console.log('==========', this.props.avatarSource);
    if (this.props.avatarSource === undefined) {
      this.setState({
        avatarSource: require('../Images/blue_user.png')
      })
    } else {
      this.setState({
        avatarSource: this.props.avatarSource
      })
    }
    this.setState({
      name: this.props.name,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      gender: this.props.gender,
      date: this.props.date
   })
 }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'blue', justifyContent: 'flex-start'}}>
          <Image style={{flex: 1, backgroundColor: 'transparent', height: null, width: null }} source={require('../Images/bg.png')}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'transparent'}}>
              <View style={{flex: 1, left: 5, justifyContent: 'center', backgroundColor: 'transparent'}}>
                <Image style={{alignSelf: 'flex-start', bottom: -30}} source={this.state.avatarSource} />
              </View>
              <View style={{flex: 2, backgroundColor: 'transparent', bottom: -60, alignSelf: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontFamily: 'Courier'}}> {this.state.name} </Text>
              </View>
            </View>
          </Image>
        </View>
        <View style={{flex: 3, backgroundColor: 'transparent', top: 50}}>
          <Text style={styles.detailHeaderStyle}> My Details </Text>
          <Text style={styles.headerTextStyle}> Email: </Text>
          <Text style={styles.ValueTextStyle}> {this.state.email} </Text>
          <Text style={styles.headerTextStyle}> Phone Number: </Text>
          <Text style={styles.ValueTextStyle}> {this.state.phoneNumber} </Text>
          <Text style={styles.headerTextStyle}> Date Of Birth: </Text>
          <Text style={styles.ValueTextStyle}> {this.state.date} </Text>
          <Text style={styles.headerTextStyle}> Gender: </Text>
          <Text style={styles.ValueTextStyle}> {this.state.gender} </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 64,
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  detailHeaderStyle: {
    color: '#0E315C',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Courier'
  },
  headerTextStyle: {
    color: '#0E315C',
    alignSelf: 'flex-start',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Courier',
    top: 10,
    margin: 10
  },
  ValueTextStyle: {
   color: 'black',
   alignSelf: 'flex-start',
   textAlign: 'center',
   fontSize: 15,
   fontFamily: 'Courier',
   margin: 10
  }
});

export default (Description)
