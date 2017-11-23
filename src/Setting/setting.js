/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// http://orm.vn:2930/ProjectListApi.aspx?userId=108&username=admin@orm.vn&pass=1b4727a96eb05921e68228341642b529
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  Image,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native';

var disabledColor = '#1A1D1C'
var pressed = '#0066ff'
var unpressed = '#1A1D1C'

var states = [
  {
    leftState: pressed,
    rightState: unpressed,
    disable: false,
  },
  {
    leftState: unpressed,
    rightState: pressed,
    disable: true,
  }
]

class BasicSwitch extends React.Component {
  state = {
    notiState: states[0],
    soundState: states[0],
    vibarState: states[0],
  }

  switchColor(value, key) {
    st = this.state
    switch (key) {
      case 0:
        st.notiState = states[value]
        break;
      case 1:
        st.vibarState = states[value]
        break;
      case 2:
        st.soundState = states[value]
        break;
    }
    this.setState(st)
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.lables}>Thông báo</Text>
        <View style = {styles.buttonBorder}>
          <Text
          style = {[{flex: 1/2, backgroundColor: this.state.notiState.leftState}, styles.buttonStyle]}
          onPress = {() => this.switchColor(0, 0)}>
            Bật
          </Text>
          <Text
          style = {[{flex: 1/2, backgroundColor: this.state.notiState.rightState}, styles.buttonStyle]}
          onPress = {() => this.switchColor(1, 0)}>
            Tắt
          </Text>
        </View>
        <Text style = {styles.lables}>Rung</Text>
        <View style = {styles.buttonBorder}>
          <Text
          style = {[{flex: 1/2, backgroundColor: this.state.notiState.disable ? disabledColor : this.state.vibarState.leftState}, styles.buttonStyle]}
          onPress = {this.state.notiState.disable ? null : () => this.switchColor(0, 1)}>
            Bật
          </Text>
          <Text
          style = {[{flex: 1/2, backgroundColor: this.state.notiState.disable ? disabledColor : this.state.vibarState.rightState}, styles.buttonStyle]}
          onPress = {this.state.notiState.disable ? null : () => this.switchColor(1, 1)}>
            Tắt
          </Text>
        </View>

        <Text style = {styles.lables}>Âm thanh</Text>
        <View style = {styles.buttonBorder}>
          <Text
          style = {[{flex: 1/2, backgroundColor: this.state.notiState.disable ? disabledColor : this.state.soundState.leftState}, styles.buttonStyle]}
          onPress = {this.state.notiState.disable ? null : () => this.switchColor(0, 2)}>
            Bật
          </Text>
          <Text
          style = {[{flex: 1/2, backgroundColor: this.state.notiState.disable ? disabledColor : this.state.soundState.rightState}, styles.buttonStyle]}
          onPress = {this.state.notiState.disable ? null : () => this.switchColor(1, 2)}>
            Tắt
          </Text>
        </View>

      </View>
    );
  }
}

export default class Setting extends Component {
  render() {
    return (
      <BasicSwitch />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1A1D1C',
  },
  buttonStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFF',
    borderRadius: 18,
    fontSize: 18,
  },
  buttonBorder: {
    flexDirection: 'row',
    height: 40,
    width: 300,
    margin: 30,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#0066ff',
  },
  lables: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
  }
});
