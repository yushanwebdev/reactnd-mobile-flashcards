import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDeck } from '../utils/helpers';

export default class DeckInfo extends Component {
    render() {
        const { style, title, count } = this.props;

        return (
            <View style={style}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cardCount}>{count} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
    },
    cardCount: {
        fontSize: 25,
        color: 'grey',
    },
})