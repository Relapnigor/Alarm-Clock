import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import Database from './Database';

import CircleButton from './CircleButton';

// Provides the time, weekday, and save controls for an existing alarm.
export default class Edit extends Component {
    // Initializes the editor from the selected alarm route parameters.
    constructor(props) {
        super(props);
        this.state = {
            hourColor: "white",
            minuteColor: "white",
            hour: this.props.route.params.hour,
            minute: this.props.route.params.minute,
            radious: 150,
            pos: [],
            edited: "",
            timerPos: { x: 150, y: 150 },
            sizes: [],
            cl: [],
            days: ["", "", "", "", "", ""],
        };
        this.chosenDays = [...this.props.route.params.days]
        this.state.days = this.state.days.map((day, i) =>
            this.chosenDays[i] == "1" ? "#FF4081" : day
        )
    }

    a = false

    dayNames = ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"]

    // Returns to the alarm list without saving.
    goMain = () => {
        this.props.navigation.navigate("main")
    }

    // Animates the clock control dots into or out of their circular layout.
    anim = (max, dist, add, end, inc) => {
        this.a = true

        let size;
        if (inc == 1) {
            size = 30
        }
        else {
            size = 60
        }



        let inter = setInterval(() => {
            let angle = 3 * Math.PI / 2
            let contr = []
            let sz = []
            let cl = []
            for (let i = 0; i < max; i += inc) {
                const x = dist * Math.cos(angle);
                const y = dist * Math.sin(angle);
                angle += 2 * Math.PI / max * inc

                contr.push(
                    { x: x, y: y, t: i, s: size }
                )
                sz.push(30)
                cl.push("#FF4081")
            }

            this.setState({ pos: contr, sizes: sz, cl: cl })

            dist += add * this.state.radious / 10

            if ((add > 0 && dist >= end * this.state.radious) || (add < 0 && dist <= end * this.state.radious)) {
                this.a = false
                clearInterval(inter)
            }

        }, 10);
    }

    // Displays the hour or minute choices requested by the user.
    showControls = (max, inc) => {
        let dist;
        if (this.state.pos.length != 0) {
            this.anim(this.state.pos.length, this.state.radious, -1, 0, 1)
            let wait = setInterval(() => {
                if (!this.a) {
                    this.anim(max, 0, 1, 1, inc)
                    clearInterval(wait)
                }

            }, 10);
        }
        else {
            this.anim(max, 0, 1, 1, inc)
        }

    }

    // Starts hour selection mode.
    editHour = () => {
        this.setState({ hourColor: "#FF4081", minuteColor: "white", edited: "h" })
        this.showControls(24, 1)
    }

    // Starts minute selection mode.
    editMinute = () => {
        this.setState({ minuteColor: "#FF4081", hourColor: "white", edited: "m" })
        this.showControls(60, 5)
    }

    // Converts a touch position on the clock into an hour or minute.
    changeTime = (e) => {

        let deltaY = e.nativeEvent.locationY - 150
        let deltaX = e.nativeEvent.locationX - 150
        let ang = Math.atan2(deltaY, deltaX) * 180 / Math.PI + 90

        if (ang < 0) {
            ang = 360 - (-1 * ang)
        }

        let time

        if (this.state.edited == "h") {
            time = Math.min(23, Math.round(ang / 15))

            let colors = [...this.state.cl]

            let index = colors.indexOf("#FFC107")
            if (index != -1) {
                colors[index] = "#FF4081"
            }

            colors[time] = "#FFC107"

            time = time.toString()

            if (time.length == 1) {
                time = "0" + time
            }

            if (time != this.state.hour) {
                Vibration.vibrate(1)
            }

            this.setState({ hour: time, cl: colors })


        }
        else if (this.state.edited == "m") {
            time = (Math.round(ang / 30) * 5) % 60

            let colors = [...this.state.cl]

            let index = colors.indexOf("#FFC107")
            if (index != -1) {
                colors[index] = "#FF4081"
            }

            colors[time / 5] = "#FFC107"

            time = time.toString()

            if (time.length == 1) {
                time = "0" + time
            }

            if (time != this.state.minute) {
                Vibration.vibrate(1)
            }
            this.setState({ minute: time, cl: colors })
        }
    }

    // Toggles one weekday for the edited alarm.
    addDay = (i) => {
        let day = [...this.state.days]
        if (day[i] == "rgba(0, 0, 0, 0)" || day[i] == "") {
            day[i] = "#FF4081"
            this.chosenDays[i] = 1
        }
        else {
            day[i] = "rgba(0, 0, 0, 0)"
            this.chosenDays[i] = 0
        }
        this.setState({ days: day })
    }

    // Saves the edited alarm and returns to the alarm list.
    add = () => {
        Database.update(this.props.route.params.id, this.state.hour, this.state.minute, this.chosenDays)
        setTimeout(() => {
            this.props.navigation.navigate("main", { edit: true })
        }, 500);
    }

    // Renders the existing-alarm editor.
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={this.goMain}>
                        <Text style={styles.topTxt}>&lt;</Text>
                    </TouchableOpacity>
                    <Text style={styles.topTxt}>Edytuj budzik</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.opt}>
                        <View style={styles.time}>
                            <Text style={{ fontSize: 90, color: this.state.hourColor }} onPress={() => this.editHour()}>{this.state.hour}</Text>
                            <Text style={{ fontSize: 90, color: "white" }}> : </Text>
                            <Text style={{ fontSize: 90, color: this.state.minuteColor }} onPress={() => this.editMinute()}>{this.state.minute}</Text>
                        </View>
                        <View style={styles.controls}>
                            <View style={{ width: 300, height: 300, marginTop: 100 }} onTouchMove={(e) => this.changeTime(e)}>
                                {this.state.pos.map((element, i) => {
                                    return <View key={element.t} style={{
                                        position: "absolute",
                                        width: this.state.sizes[i],
                                        height: this.state.sizes[i],
                                        borderRadius: 25,
                                        backgroundColor: this.state.cl[i],
                                        left: 135 + element.x,
                                        top: 135 + element.y,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ color: 'white' }}>{element.t}</Text>
                                    </View>
                                })}
                            </View>
                        </View>
                        <View style={styles.days}>
                            {this.dayNames.map((element, i) => {
                                return <TouchableOpacity key={element} style={{
                                    marginTop: 80,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    backgroundColor: this.state.days[i]
                                }}
                                    onPress={() => this.addDay(i)}>
                                    <Text style={{
                                        padding: 10,
                                        fontSize: 20,
                                        color: "white"
                                    }}>{element}</Text>
                                </TouchableOpacity>
                            })}
                        </View>
                    </View>
                    <View style={styles.addBtn}>
                        <CircleButton w={100} h={100} fs={100} pressFunction={this.add}></CircleButton>
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
    opt: {
        flex: 10
    },
    addBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    time: {
        flexDirection: "row",
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    days: {
        flex: 1,
        flexDirection: "row",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
