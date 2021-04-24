import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from './Button';

export default function QuizCard(props) {
    const { content, flip, flipBtn, goToNext } = props;
    return (
        <View style={styles.cardSides}>
            <View style={styles.quizWrapper}>
                <Text style={styles.quiz}>{content}</Text>
                <TouchableOpacity onPress={() => flip()}>
                    <Text style={styles.flipBtn}>{flipBtn}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Button
                    style={{ backgroundColor: 'green', borderColor: 'green' }}
                    onPress={() => goToNext(true)}>
                    <Text style={{ color: "#fff", fontSize: 17 }}>Correct</Text>
                </Button>
                <Button
                    style={{ backgroundColor: 'red', borderColor: 'red' }}
                    onPress={() => goToNext(false)}>
                    <Text style={{ color: "#fff", fontSize: 17 }}>Incorrect</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardSides: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    quizWrapper: {
        alignItems: 'center',
        marginBottom: 70,
    },
    quiz: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 25,
    },
    flipBtn: {
        fontSize: 25,
        color: 'red',
    },
})