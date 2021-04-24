import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DeckItem from './DeckItem';

export default function DeckList(props) {
    const { data, navigation } = props;

    const renderItem = ({ item }) => {
        return (
            <DeckItem
                id={item}
                style={styles.deck}
                navigation={navigation}
                item={data[item]} />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={Object.keys(data)}
                renderItem={renderItem}
                keyExtractor={item => item}
                extraData={navigation, data} />
        </View>
    )
}

const styles = StyleSheet.create({
    deck: {
        alignItems: 'center',
        marginBottom: 45,
    }
});