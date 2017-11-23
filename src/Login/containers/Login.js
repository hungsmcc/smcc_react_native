import React, { Component } from 'react';
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Platform,
    AsyncStorage,
    Dimensions
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Hoshi } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button'
import styles from '../styles/style';
import * as API from '../libs/backend'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import md5 from "react-native-md5"
import * as LoginActions from '../actions/login';
const window = Dimensions.get('window');
import Modal from "react-native-modalbox";

function mapStateToProps(state) {
    return {
        global: state.global
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...LoginActions}, dispatch)
    };
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoadDisabled: false,
            isLoading: false,
        }
    }

    onChangeUsername (text) {
        this.setState({
            username: text
        })
    }

    onChangePassword (text) {
        //console.log(text)
        this.setState({
            password: text
        })
    }

    login() {
      console.log(this.state.username)
      this.props.actions.login(this.state.username, md5.hex_md5(this.state.password))
    }

    componentWillMount() {
      AsyncStorage.getItem("user_data").then((value) => {
            // this.setState({"myKey": value});
            console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
            console.log(JSON.parse(value)['user_id']);
            this.props.actions.login(JSON.parse(value)['user_name'], JSON.parse(value)['password'])
        })
          .catch((error) => {
            console.log(error)
          });
      //this.props.actions.login('admin@orm.vn', 'InfoRe28111')
    }
    render() {
        return (
          <View style={styles.container}>
            <View style={{marginTop: 50, justifyContent: 'center'
              ,flexDirection: 'row',alignItems:'flex-start', flex: 1/9}}>
              <View style={{flex: 1/10}}/>
              <View style={{flexDirection: 'row', flex: 8/10}}>
                <View style={{flex: 1/5, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <Image source={require('./../images/logo.png')} style={styles.logo}/>
                </View>

                <View style={{flex: 4/5, flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 12}}>SMCC Việt Nam</Text>
                  <Text style={{fontSize: 12}}>Công cụ thu thập, phân tích dữ liệu Mạng xã hội</Text>
                </View>
              </View>
              <View style={{flex: 1/10}}/>
            </View>

            <View style={{flex: 1/9}}></View>

            <View style={{
              flexDirection: 'column',alignItems:'flex-start',flex: 7/9, padding: 20, paddingTop: 0}}>
              <View style={{alignSelf: 'stretch',marginBottom: 10,}}>
                <Hoshi
                  label='Email'
                  onChangeText={(text) => this.onChangeUsername(text)}
                  borderColor={'#1791D6'}
                  labelStyle={{ color: '#1791D6', fontSize: 15}}
                  inputStyle={{ color: '#808080', fontSize: 14}}
                  activeColor={'#da7071'}
                  style={{height: 20, width: window.width,
                    marginLeft: 30,marginRight: 30, color: '#808080'}}
                />
              </View>

              <View style={{alignSelf: 'stretch',}}>
                <Hoshi
                  label='Password'
                  onChangeText={(text) => this.onChangePassword(text)}
                  borderColor={'#1791D6'}
                  secureTextEntry={true}
                  labelStyle={{ color: '#1791D6', fontSize: 15 }}
                  inputStyle={{ color: '#808080', fontSize: 14 }}
                  style={{height: 20, width: window.width,
                    marginLeft: 30,marginRight: 30}}
                />
              </View>

              <View style={{flexDirection: 'row',marginTop: 50,marginLeft: 30,marginRight: 30,}}>
                <View style={{flex: 1/4}}/>
                <Button
                    onPress={() => {
                      this.setState({isLoading: true});
                      this.login()
                    }}
                    style={{borderColor: '#1791D6', flex: 2/4, backgroundColor: 'white', height: 40, borderRadius: 22, borderWidth: 2}} textStyle={{textAlign: 'center', textAlignVerticale: 'center', fontSize: 16}}>
                  ĐĂNG NHẬP
                </Button>
                <View style={{flex: 1/4}}/>
              </View>

            </View>
            <Modal
              style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 100, width: 200, borderRadius: 10}}
              position={"center"}
              isDisabled = {this.state.isLoadDisabled}
              onOpened={() => {
                this.setState({isLoadDisabled: true})
                setInterval(() => {
                  this.setState({isLoadDisabled: false, isLoading: false})
                }, 3000);
              }}
              isClose={!this.state.isLoading}
              isOpen={this.state.isLoading}>
                <ActivityIndicator
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  size = "large"
                  color = "blue"
                />
                <Text textAlign='center'> Đang xử lý đăng nhập </Text>
            </Modal>
          </View>

        )
    }


}

//module.exports = Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
