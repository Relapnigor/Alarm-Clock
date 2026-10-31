import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import CircleButton from './CircleButton';
import ListItems from './ListItems';

// Displays the saved alarms and navigation controls.
export default class MainScreen extends Component {
    // Initializes the main screen component.
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // Returns to the start screen.
    goStart = () => {
        this.props.navigation.navigate("start")
    }

    // Opens the screen for creating an alarm.
    goAdd = () => {
        this.props.navigation.navigate("add")
    }

    // Renders the alarm list and add button.
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={this.goStart}>
                        <Text style={styles.topTxt}>&lt;</Text>
                    </TouchableOpacity>
                    <Text style={styles.topTxt}>Lista budzików</Text>
                </View>
                <View style={styles.content}>
                    <ScrollView style={styles.clocks}>
                        <ListItems navigation={this.props.navigation}></ListItems>
                    </ScrollView>
                    <View style={styles.addBtn}>
                        <CircleButton w={100} h={100} fs={100} pressFunction={this.goAdd}></CircleButton>
                    </View>
                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flex: 1,
        backgroundColor: "#512DA8",
        flexDirection: 'row',
    },
    topTxt: {
        color: 'white',
        fontSize: 30,
        margin: 10
    },
    content: {
        flex: 10,
        backgroundColor: '#673AB7'
    },
    clocks: {
    },
    addBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    }
});