import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { store, getDecks, setLocalNotification } from './utils/helpers';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import Result from './components/Result';
import AddCard from './components/AddCard';

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator();

function Tabs(props) {
  const { data, fetchData } = props;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        style: {
          height: 56,
          backgroundColor: '#fe5a37',
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
        tabStyle: {
          justifyContent: 'center'
        },
        labelStyle: {
          fontSize: 17,
        }
      }}>
      <Tab.Screen
        name="Decks"
        options={{ headerShown: false }}>
        {props => <DeckList {...props} data={data} />}
      </Tab.Screen>
      <Tab.Screen
        name="New Deck"
        options={{ headerShown: false }}>
          {props => <NewDeck {...props} fetchData={fetchData} />}
        </Tab.Screen>
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    flashCards: {}
  }

  componentDidMount() {
    setLocalNotification();
    store()
      .then(() => this.fetchData());
  }

  fetchData = () => {
    return getDecks()
      .then((flashCards) => {
        this.setState(() => ({
        flashCards
      }))});
  }

  render() {
    const { flashCards } = this.state;
    return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor='#fe5a37' barStyle='light-content' />
          <Stack.Navigator>
            <Stack.Screen
              name="Decks">
                {props => <Tabs {...props} data={flashCards} fetchData={this.fetchData} />}
            </Stack.Screen>
            <Stack.Screen
              name="Deck"
              component={Deck}
              options={({ route }) => ({
                title: route.params.title,
              })} />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              initialParams={{ correctCount: 0 }} />
            <Stack.Screen
              name="Result"
              component={Result} />
            <Stack.Screen
              name="AddCard">
              {props => <AddCard {...props} fetchData={this.fetchData} />}
            </Stack.Screen>
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    )
  }
}
