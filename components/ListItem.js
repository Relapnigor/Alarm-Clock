import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Database from './Database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Animated, Vibration } from 'react-native';
import { createAudioPlayer } from 'expo-audio';

// Displays one alarm and controls its activation, vibration, music, and details.
export default class ListItem extends Component {
    // Initializes the alarm display and its control state.
    constructor(props) {
        super(props);
        this.state = {
            height: new Animated.Value(150),
            music: "none",
            musicColor: "#FF4081",
            vibrations: "vibrate-off",
            vibrationsColor: "white",
            toggle: "down",
            powerColor: "white",
            expanded: false,
        };

        this.toValue = 0
        this.timeout = null
        this.interval = null
        this.player = null
    }

    days = ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"]

    // Stops scheduled callbacks and releases the alarm audio player.
    clearAlarm = async () => {
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
        }
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
        if (this.player) {
            this.player.pause()
            await this.player.seekTo(0)
            this.player.remove()
            this.player = null
        }
    }

    // Expands or collapses the selected alarm's weekday details.
    toggle() {

        if (!this.state.expanded) this.toValue = 200
        else this.toValue = 150

        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();


        if (!this.state.expanded) {
            this.setState({ expanded: true, toggle: "up" })
        }
        else {
            this.setState({ expanded: false, toggle: "down" })
        }

    }

    // Toggles whether the alarm plays music when it rings.
    music = async () => {
        if (this.state.musicColor == "white") {
            this.setState({ musicColor: "#FF4081" })
        }
        else {
            this.setState({ musicColor: "white" })
        }
    }

    // Enables or disables the alarm and schedules its next occurrence.
    power = async () => {
        if (this.state.powerColor != "white") {
            await this.clearAlarm()
            this.setState({ powerColor: "white", music: "none" })
            return
        }

        await this.clearAlarm()
        this.player = createAudioPlayer(require('../assets/alarm.mp3'));
        this.setState({ powerColor: "#FF4081", music: "" })

        const now = new Date()
        const todayIndex = (now.getDay() + 6) % 7
        let daysAhead = -1
        let delay = 0

        for (let offset = 0; offset < 7; offset++) {
            const dayIndex = (todayIndex + offset) % 7
            const candidate = new Date(now)
            candidate.setDate(now.getDate() + offset)
            candidate.setHours(this.props.hour, this.props.minute, 0, 0)

            if (this.props.days[dayIndex] == "1" && (offset > 0 || candidate > now)) {
                daysAhead = offset
                delay = candidate - now
                break
            }
        }

        if (daysAhead != -1) {
            this.timeout = setTimeout(() => {
                let time = 0
                this.interval = setInterval(async () => {
                    if (this.state.powerColor != "white") {
                        if (this.state.vibrations == "vibrate") {
                            Vibration.vibrate()
                        }

                        if (this.state.musicColor != "white") {
                            this.player.play();
                        }
                        else {
                            this.player.pause();
                            await this.player.seekTo(0);
                        }

                        time++;
                        if (time == 60) {
                            await this.clearAlarm()
                        }
                    }
                    else {
                        await this.clearAlarm()
                    }
                }, 1000)
            }, delay);
        }

    }

    // Releases alarm resources when this list item is removed.
    componentWillUnmount() {
        this.clearAlarm()
    }

    // Toggles vibration feedback for the alarm.
    vibrate = () => {
        if (this.state.vibrationsColor == "white") {
            this.setState({ vibrationsColor: "#FF4081", vibrations: "vibrate" })
        }
        else {
            this.setState({ vibrationsColor: "white", vibrations: "vibrate-off" })
        }
    }


    // Renders the alarm time, controls, and optional weekday details.
    render() {
        return (
            <Animated.View style={{ height: this.state.height }}>
                {
                    <View>
                        <View style={styles.container}>
                            <View style={styles.left}>
                                <View>
                                    <Text style={{ fontSize: 60, color: this.state.powerColor, padding: 10 }}>{this.props.hour}:{this.props.minute}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.delete(this.props.id)}>
                                        <Ionicons name="trash-outline" size={32} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.edit(this.props.id, this.props.hour, this.props.minute, this.props.days)}>
                                        <AntDesign name="edit" size={32} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginLeft: 100, display: this.state.music }} onPress={() => this.music()}>
                                        <Ionicons name="musical-notes" size={40} color={this.state.musicColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <TouchableOpacity style={styles.control} onPress={() => this.power()}>
                                    <Ionicons name="power" size={40} color={this.state.powerColor} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.control} onPress={() => this.vibrate()}>
                                    <MaterialCommunityIcons name={this.state.vibrations} size={40} color={this.state.vibrationsColor} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.control} onPress={() => this.toggle()}>
                                    <AntDesign name={this.state.toggle} size={40} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.expanded && <View style={{
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            {this.props.days.map((element, i) => {
                                let color = ""
                                if (element == "1") {
                                    color = "#FF4081"
                                }

                                return <View key={`${this.props.id}-${i}`} style={{
                                    backgroundColor: color,
                                    width: 30,
                                    height: 30,
                                    display: 'flex',
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    borderRadius: 50,
                                    margin: 5
                                }}><Text style={{ color: "white", textAlign: 'center' }}>{this.days[i]}</Text></View>
                            })}
                        </View>}
                    </View>


                }
            </Animated.View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#673AB7"
    },
    left: {
        flex: 3,
        height: 150,
        flexDirection: 'column'

    },
    right: {
        flex: 1,
        height: 150,
        flexDirection: 'column'
    },
    control: {
        flex: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center'
    }
})