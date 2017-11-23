import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import MentionPage from './containers/mention';

class Mention extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                 <MentionPage />
            </View>
        )
    }
}

module.exports = Mention;