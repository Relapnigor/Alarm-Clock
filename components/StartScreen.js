import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";
import Database from './Database';

// Displays the welcome screen and loads the custom font and database.
export default class StartScreen extends Component {
    // Initializes the welcome screen state.
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    // Creates the database table and loads the welcome screen font.
    componentDidMount = async () => {
        Database.createTable()
        await Font.loadAsync({
            'myfont': require('../assets/blackopsone-regular.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
    }

    // Opens the main alarm list.
    goMain = () => {
        this.props.navigation.navigate("main")
    }

    // Renders the welcome screen after the font is ready.
    render() {
        return (

            <View style={styles.container}>
                <StatusBar></StatusBar>
                {
                    this.state.fontloaded
                        ?
                        <View style={styles.main}>
                            <TouchableOpacity onPress={this.goMain}>
                                <Text style={{
                                    fontFamily: 'myfont',
                                    fontSize: 80,
                                    color: "white",
                                    textAlign: "center"
                                }}>
                                    Sqlite App
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ color: "white", fontSize: 30, textAlign: "center" }}>
                                manage sqlite{"\n"}
                                use animation{"\n"}
                                use ring{"\n"}
                            </Text>
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        backgroundColor: "#673AB7",
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});