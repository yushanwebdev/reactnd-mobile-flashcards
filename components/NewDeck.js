import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../utils/helpers';
import Button from './Button';

export default class NewDeck extends Component {
    state = {
      text: '',
    }

    onSubmit = () => {
      const { text } = this.state;
      const { fetchData, navigation } = this.props;
      saveDeckTitle(text)
        .then((data) => {
          fetchData();
        });

      navigation.navigate('Decks');
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput  
                    style={styles.input}  
                    placeholder="Deck Title"  
                    onChangeText={(text) => this.setState({ text })}  
                />  
                <Button 
                  style={{ backgroundColor: '#000' }}
                  onPress={this.onSubmit}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
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
        padding: 20,
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 30,
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
    },
})