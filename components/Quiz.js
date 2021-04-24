import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardFlip from 'react-native-card-flip';
import { getQuestion } from '../utils/helpers';
import Button from './Button';

export default class Quiz extends React.Component {
  state = {
    problem: {},
  };

  componentDidMount() {
    const { title, quizNo } = this.props.route.params;

    getQuestion(title, quizNo).then((problem) => this.setState({ problem }));
  }

  goToNext = (correct) => {
    const { navigation } = this.props;
    let { title, quizNo, count, correctCount } = this.props.route.params;

    quizNo = quizNo + 1;
    correctCount = correct ? correctCount + 1 : correctCount;

    if (quizNo !== count)
      navigation.push('Quiz', {
        title,
        count,
        quizNo,
        correctCount,
      });
    else  
      navigation.navigate('Result', {
        count,
        correctCount,
      });
  };

  render() {
    const { question, answer } = this.state.problem;
    const { quizNo, count } = this.props.route.params;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.quizNo}>{`${quizNo + 1} / ${count}`}</Text>
        </View>
        <CardFlip style={{ flex: 1 }} ref={(card) => (this.card = card)}>
          <View style={styles.cardSides}>
            <View style={styles.quizWrapper}>
              <Text style={styles.quiz}>{question}</Text>
              <TouchableOpacity onPress={() => this.card.flip()}>
                <Text style={styles.flipBtn}>Answer</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Button
                style={{ backgroundColor: 'green', borderColor: 'green' }}
                onPress={() => this.goToNext(true)}>
                <Text style={{ color: '#fff', fontSize: 17 }}>Correct</Text>
              </Button>
              <Button
                style={{ backgroundColor: 'red', borderColor: 'red' }}
                onPress={() => this.goToNext(false)}>
                <Text style={{ color: '#fff', fontSize: 17 }}>Incorrect</Text>
              </Button>
            </View>
          </View>
          <View style={styles.cardSides}>
            <View style={styles.quizWrapper}>
              <Text style={styles.quiz}>{answer}</Text>
              <TouchableOpacity onPress={() => this.card.flip()}>
                <Text style={styles.flipBtn}>Question</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Button
                style={{ backgroundColor: 'green', borderColor: 'green' }}
                onPress={() => this.goToNext(true)}>
                <Text style={{ color: '#fff', fontSize: 17 }}>Correct</Text>
              </Button>
              <Button
                style={{ backgroundColor: 'red', borderColor: 'red' }}
                onPress={() => this.goToNext(false)}>
                <Text style={{ color: '#fff', fontSize: 17 }}>Incorrect</Text>
              </Button>
            </View>
          </View>
        </CardFlip>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardSides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  quizNo: {
    paddingTop: 10,
    paddingLeft: 20,
    fontSize: 25,
  },
});
