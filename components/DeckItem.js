import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { getDeck } from '../utils/helpers';

export default class DeckItem extends Component {
    goToDetail = () => {
        const { navigation, item:{ title, questions } } = this.props;

        navigation.navigate('Deck', {
            title,
            count: questions.length
        });
    }

    render() {
        const { style, item:{ title, questions } } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={this.goToDetail}>
                <View style={style}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.cardCount}>{questions.length} cards</Text>
                </View>
            </TouchableWithoutFeedback>
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