import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({ children, onPress, style = {} }) {
    return(
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 35,
        paddingRight: 35,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center'
    }
})