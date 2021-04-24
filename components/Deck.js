import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import DeckInfo from './DeckInfo';

export default function Deck(props) {
    const { route: { params: { title, count } }, navigation } = props;

    const goToQuiz = () => {
        navigation.navigate('Quiz', {
            title,
            count,
            quizNo: 0
        });
    }

    const addCard = () => {
      navigation.navigate('AddCard', {
        title
      });
    }

    return (
        <View style={styles.container}>
            <DeckInfo
                title={title}
                count={count}
                style={{ alignItems: 'center', marginBottom: 45 }} />
            <View>
                <Button
                  onPress={addCard}>
                    <Text>Add Card</Text>
                </Button>
                {count ? <Button
                    style={{ backgroundColor: '#000' }}
                    onPress={goToQuiz}>
                    <Text style={{ color: "#fff" }}>Start Quiz</Text>
                </Button> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
