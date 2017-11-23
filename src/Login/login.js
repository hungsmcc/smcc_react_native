import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import Login from './containers/Login';

class LoginMain extends Component {
    render() {
        return (
            <Login />
        )
    }
}

module.exports = LoginMain;