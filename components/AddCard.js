import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { addCardToDeck } from '../utils/helpers';
import Button from './Button';

export default class AddCard extends Component {
    state = {
      question: '',
      answer: '',
    }

    onSubmit = () => {
      const { title } = this.props.route.params;
      const { fetchData, navigation } = this.props;

      addCardToDeck(title, this.state)
        .then(() => {
          fetchData();
        });

      navigation.navigate('Decks');
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput   
                    style={styles.input}
                    placeholder="Question"  
                    onChangeText={(question) => this.setState({question})}  
                />
                <TextInput   
                    style={styles.input}
                    placeholder="Answer"  
                    onChangeText={(answer) => this.setState({answer})}  
                />
                <Button 
                  style={{ backgroundColor: '#000' }}
                  onPress={this.onSubmit}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>Submit</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        width: '100%',
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 45,
    }
})