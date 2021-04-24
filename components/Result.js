import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

export default class Result extends Component {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    const { count, correctCount } = this.props.route.params;

    const mark = ((correctCount / count) * 100).toFixed();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Results</Text>
        <Text style={styles.marks}>{`${mark}%`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
  marks: {
    fontSize: 100,
    color: '#fe5a37',
  },
});
