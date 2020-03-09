import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import Container from './navigation/Navigation';
import Home from './view/Home';


export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                    <Home />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#2C5077',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});


