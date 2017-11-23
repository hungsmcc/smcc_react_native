import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform
} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },
  logo: {
    width: 50,
    height: 50
  },
  inputBar: {
        flex : 0,
        borderWidth: 0,
        alignItems: 'flex-start',
        padding: 0,
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
});
