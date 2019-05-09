/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Provider, connect } from 'react-redux';
import {default as AButton} from '@ant-design/react-native/lib/button';
import { Icon } from '@ant-design/react-native';
import configureStore from './store';

const initialState = {};

const store = configureStore(initialState);

class Main extends Component {
  state = {
    num: 1
  };

  add = () => {
    this.setState({ num: this.state.num + 1 });
    this.props.testAction();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.state.num}</Text>
        <AButton type="primary" onPress={this.add}>Add</AButton>
      </View>
    )
  }
}


import { testAction } from './main/action'
const mapStateToProps = (state, ownProps) => {
  return {...state};
};

const mapActionCreators = {testAction};

class HomeScreenView extends Component {
  state = {
    num: 1
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // title: "Home"
      headerTitle: () => <Text>Home custom title</Text>,
      headerRight: (
        <AButton onPress={navigation.getParam('increaseCount')}>+1</AButton>
      ),
    };
  };

  componentDidMount = () => {
    this.props.navigation.setParams({increaseCount: this.increaseCount})
  }


  increaseCount = () => {
    this.setState({num: this.state.num + 1});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home screen{this.props.main.num}</Text>
        <Text>state:{JSON.stringify(this.state)}</Text>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate("Profile", { name: "Jane" })}
        />
        <Main testAction={this.props.testAction} />
      </View>
    );
  }
}

const HomeScreen = connect(
  mapStateToProps,
  mapActionCreators
)(HomeScreenView);

class ProfileScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: `Profile${navigation.getParam('name')}`,
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#f4511e',
      headerRight: (<Button title="More" onPress={() => alert('Alert More!')} />),
      headerLeft: (<Button title="Menu" onPress={() => alert('Menu sideBar!')} />)
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile screen {this.props.navigation.getParam('name', 'default name')}</Text>
        <Button
          title="Go to Home"
          onPress={() => navigate("Home", { name: "Home" })}
        />

        <AButton type="primary" onPress={() => {
          this.props.navigation.push('Profile', { name: `Name ${Math.floor(Math.random()*100)}` })
        }}>Go to Profile... again</AButton>

        <AButton type="primary" onPress={() => {
          this.props.navigation.setParams({ name: `Name ${Math.floor(Math.random()*100)}` })
        }}>Update title</AButton>
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  navigationOptions: {
    tabBarIcon: () => (
      <View style={{ width: 32, height: 32, margin: 5 }}>
        <Icon size="lg" color="#fff" name="home" />
          <View style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: '#fff',
            borderRadius: 9,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: '#000', padding: 3, fontSize: 10, fontWeight: 'bold' }}>3</Text>
          </View>
      </View>
    )
  }
});

class MoreScreen extends Component {
  static navigationOptions = {
    title: 'More Screen'
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>More Screen</Text>
      </View>
    );
  }
}

const MoreNavigator = createStackNavigator({
  More: MoreScreen,
}, {
  navigationOptions: {
    tabBarIcon: () => (
      <View style={{ width: 32, height: 32, margin: 5 }}>
        <Icon size="lg" color="#fff" name="team" />
          <View style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: '#fff',
            borderRadius: 9,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: '#000', padding: 3, fontSize: 10, fontWeight: 'bold' }}>12</Text>
          </View>
      </View>
    )
  }
});

const Tabs = createBottomTabNavigator({
    Main: MainNavigator,
    MoreTab: MoreNavigator
  },
  {
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#000',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: '#f4511e',
        },
      },
    }
  }
);

const App = createAppContainer(Tabs);

const ReduxProvider = () => <Provider store={store}><App /></Provider>

export default ReduxProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
