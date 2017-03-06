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
  View
} from 'react-native';
import Home from './Containers/HomeScreen'
import Description from './Containers/DescriptionScreen'
import {Scene, Router} from 'react-native-router-flux';

export default class TestTask extends Component {
  render() {
    return <Router>
      <Scene key="root" navigationBarStyle={{backgroundColor: '#0E315C'}} titleStyle={{color: 'white', fontFamily: 'Courier', fontSize: 20}}>
        <Scene key="Home" component={Home} title="Home"/>
        <Scene key="Description" component={Description} title="Detail"/>
      </Scene>
    </Router>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

AppRegistry.registerComponent('TestTask', () => TestTask);
