'use strict'
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/main'
console.disableYellowBox = true;

class SMCC extends Component {
  render() {
    return (<App />);
  }
}
AppRegistry.registerComponent('PicuniReactNative', () => SMCC);
