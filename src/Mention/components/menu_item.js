const React = require('react');
const {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  Image,
    ListView,
  Text,
} = require('react-native');
const { Component } = React;
import Button from 'apsl-react-native-button'
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as API from '../libs/backend'
import {Actions} from 'react-native-router-flux'

var DATA = [];
const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'First',
    content: BACON_IPSUM,
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
    value: false,
  },
];

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#222822',
    position: 'absolute',
    opacity: 1,
  },
  avatarContainer: {
    height: window.height/15,
    flexDirection: 'row',
  },
  name: {
    backgroundColor: '#1A1D1C',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    width: window.width,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#222822',
  },
});
class MenuItem extends Component {
  constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          dataSource: ds.cloneWithRows([]),
          activeSection: false,
          collapsed: true,
      };
  }


  render() {
    //console.log(this.props)
      //console.log(this.props.rowData)
    return (
      <View style={styles.content}>
        <Text
        style = {{color: 'white'}}
        onPress={() => this.props.onItemMentionSelected(this.props.rowData.project_name, this.props.rowData.project_keyword_value)}>{this.props.rowData.project_name}</Text>
      </View>
    );
  }
}

module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            activeSection: false,
            collapsed: true,
        };
    }


    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.DATA)
        })
    }

    shouldComponentUpdate(nextProps) {
      if (this.props.DATA != nextProps.DATA) {
        return true
      } else {
        return false
      }
    }

    logout() {
      AsyncStorage.removeItem("user_data");
      Actions.LoginMain();
    }
  render() {
      console.log("render again")
    return (
      <View style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Text style={[styles.name, {flex: 2/3}]}>Dự án</Text>
          <View style={[styles.name, {flex: 1/3}]} />
        </View>

        <ListView
            style = {{flex: 12/15}}
            renderRow={(rowData) => <MenuItem onItemMentionSelected={this.props.onItemMentionSelected} rowData={rowData} /> }
            enableEmptySections={true}
            dataSource={this.state.dataSource}
        />
        <View style={{paddingBottom: 20}}>
          <View style={styles.avatarContainer}>
            <Text
                onPress={this.props.onSettingSelected}
                style={[styles.name, {flex: 2/3}]}>Cài đặt</Text>
            <View style={[styles.name, {flex: 1/3}]} />
          </View>
          <View style={styles.avatarContainer}>
            <Text style={[styles.name, {flex: 2/3}]}  onPress={()=>this.logout()} >Đăng xuất</Text>
            <View style={[styles.name, {flex: 1/3}]} />
          </View>
        </View>
      </View>
    );
  }
};
