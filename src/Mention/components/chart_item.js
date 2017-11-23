const React = require('react');
const {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    TouchableHighlight,
    Image,
    ListView,
    Text,
    WebView
} = require('react-native');
const { Component } = React;
import Button from 'apsl-react-native-button'
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as API from '../libs/backend'
import WebViewBridge from 'react-native-vk-webview-bridge';

var DATA = [];

/*const injectScript = `
  (function () {
                    if (WebViewBridge) {
                      WebViewBridge.onMessage = function (message) {
                        objectInfo = JSON.parse(message);
                        alert(message);
                        alert(objectInfo["user_name"]);
                        var callChartApi = 'http://orm.vn:2930' + "/ChartApi.aspx?key="+ objectInfo["keyword"] +"&username="+ objectInfo["user_name"] +"&pass="+ objectInfo["password"] +"";
                        var getChartDataExport = document.createElement('script');
                        getChartDataExport.setAttribute('id', 'jsonScript');
                        getChartDataExport.setAttribute('type', 'text/javascript');
                        getChartDataExport.setAttribute('src', callChartApi);
                        document.getElementById('ScriptHolder').appendChild(getChartDataExport);
                        WebViewBridge.send("got the message inside webview");
                      };
                      WebViewBridge.send("hello from webview");
                    }
                  }());
`;*/

const injectScript = `
  (function () {
                    if (WebViewBridge) {

                      WebViewBridge.onMessage = function (message) {
                        var array = message.split("|");
                        var callChartApi = "http://orm.vn:2930/ChartApi.aspx?key=" + encodeURIComponent(array[1]) + "&username=" + array[2] + "&pass=" + array[3];
                        var getChartDataExport = document.createElement('script');
                        getChartDataExport.setAttribute('id', 'jsonScript');
                        getChartDataExport.setAttribute('type', 'text/javascript');
                        getChartDataExport.setAttribute('src', callChartApi);
                        document.getElementById('ScriptHolder').appendChild(getChartDataExport);
                        if (message === "hello from react-native") {
                          WebViewBridge.send("got the message inside webview");
                        }
                      };

                      WebViewBridge.send("hello from webview");
                    }
                  }());
`;



module.exports = class ChartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.object.keyword != nextProps.keyword) {
        return true
      } else {
        return false
      }
    }

    componentWillUpdate(nextProps, nextState) {
      //console.log(nextProps);
      this.setState({
          object: {
              keyword: nextProps.keyword,
              user_name: nextProps.user_name,
              password: nextProps.password
          }
      }, () => {
        //console.log(this.state.object);
        const { webviewbridge } = this.refs;
        let temp = 'a|' + this.state.object.keyword + '|' + this.state.object.user_name + '|' + this.state.object.password + '|b'
        console.log(temp)
        webviewbridge.sendToBridge(JSON.stringify(temp));
      })
    }

    componentWillMount() {
        this.setState({
            object: {
                keyword: this.props.keyword,
                user_name: this.props.user_name,
                password: this.props.password
            }
        }, () => {
            console.log(this.state.object)

        })

    }


    onBridgeMessage(message) {
        const { webviewbridge } = this.refs;
        let temp = 'a|' + this.state.object.keyword + '|' + this.state.object.user_name + '|' + this.state.object.password + '|b'
        console.log(temp)

        switch (message) {
            case "hello from webview":
                webviewbridge.sendToBridge(JSON.stringify(temp));
                break;
            case "got the message inside webview":
                console.log("we have got a message from webview! yeah");
                break;
        }
    }
    render() {
      console.log("render again");
        return (
            <View style={{height: 1300}}>
                <WebViewBridge
                    //domStorageEnabled={true}
                    //scalesPageToFit={true}
                    javaScriptEnabled={true}
                    //automaticallyAdjustContentInsets={false}
                    scrollEnabled={false}
                    onMessage={this.onBridgeMessage.bind(this)}
                    ref="webviewbridge"
                    injectedJavaScript={injectScript}
                    source={require('./chart/chart.html')}
                    //source={{uri: 'https://google.com/'}}
                    style={{height: window.height}}
                />
            </View>
        )
    }
};/**
 * Created by vjtc0n on 1/11/17.
 */
/**
 * Created by vjtc0n on 1/11/17.
 */
