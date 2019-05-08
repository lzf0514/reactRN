/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider, connect } from 'react-redux';
import {default as AButton} from '@ant-design/react-native/lib/button';
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
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    };
  }
  static navigationOptions = {
    title: "Home"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home screen{this.props.main.num}</Text>
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
  static navigationOptions = {
    title: "Profile"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile screen</Text>
        <Button
          title="Go to Home"
          onPress={() => navigate("Home", { name: "Home" })}
        />
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
});

const App = createAppContainer(MainNavigator);

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
