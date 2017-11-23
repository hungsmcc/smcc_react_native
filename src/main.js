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
   Platform
} from 'react-native';
import {
   Router,
   Scene
} from 'react-native-router-flux';
import configureStore from './store/store'
import Login from './Login/login';
import Mention from './Mention/mention';
import AnalysisPage from './Analysis/analysis';
import { Provider } from 'react-redux';
import {ScrollableTabView} from 'react-native-scrollable-tab-view'
const store = configureStore()

 class TabIcon extends Component {
     render () {
         var color = this.props.selected ? '#00b0e6' : '#d9d9d9';
         return (
             <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                 <Icon style={{color: color}} name={this.props.iconName} size={30} />
             </View>
         )
     }
 }

 class Main extends Component {
     render() {

         return(
           <Provider store={store}>
             <Router navigationBarStyle={{backgroundColor: 'white', height: 0, opacity: 0}}
                     sceneStyle={{ backgroundColor: 'white', }}>
                 <Scene key='root' hideNavbar>
                     <Scene key='LoginMain'
                            component={Login}
                            initial
                            type='replace'/>
                     <Scene key='Mention'
                            component={Mention}
                            //initial
                            type='replace'/>
                      <Scene key='Analysis'
                            component={AnalysisPage}/>
                 </Scene>
             </Router>
           </Provider>
         )
     }
 }

module.exports = Main;

// AppRegistry.registerComponent('Hello', () => Hello);
