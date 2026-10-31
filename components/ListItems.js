import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Database from './Database';
import ListItem from './ListItem';

// Loads and renders all alarms stored in the database.
export default class ListItems extends Component {
    // Initializes the list with no loaded alarms.
    constructor(props) {
        super(props);
        this.state = {
            timers: [],
        };
    }

    // Loads alarms and refreshes them whenever this screen gains focus.
    componentDidMount() {
        this.loadTimers();
        this.unsubscribe = this.props.navigation.addListener('focus', this.loadTimers);
    }

    // Removes the navigation focus listener when the list is unmounted.
    componentWillUnmount() {
        this.unsubscribe?.();
    }

    // Reads the current alarms from SQLite into component state.
    loadTimers = () => {
        Database.getAll().then((timers) => {
            this.setState({ timers });
        });
    };

    // Deletes an alarm and removes it from the visible list.
    delete = (id) => {
        Database.remove(id)
        this.setState(({ timers }) => ({
            timers: timers.filter((timer) => timer.id !== id)
        }));
    }

    // Opens the edit screen for the selected alarm.
    edit = (id, hour, minute, days) => {
        this.props.navigation.navigate("edit", { id: id, hour: hour, minute: minute, days: days })
    }

    // Renders one ListItem component for every saved alarm.
    render() {
        return (
            <View>
                {this.state.timers.map((element) => {
                    return <ListItem key={element.id} id={element.id} hour={element.hour} minute={element.minute} days={element.days.split(",")} delete={this.delete} edit={this.edit} />
                })}
            </View>
        );
    }
}
