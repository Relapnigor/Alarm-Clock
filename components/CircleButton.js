import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { TouchableNativeFeedback } from 'react-native';

// Renders the circular add button used to create an alarm.
export default class CircleButton extends Component {
    // Initializes the button component.
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // Renders the button and invokes the supplied press callback.
    render() {
        return (

            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                onPress={() => this.props.pressFunction()}
                style={{
                    width: this.props.w,
                    height: this.props.h,
                }}
            >

                <View style={{
                    width: this.props.w,
                    height: this.props.h,
                    backgroundColor: "#FF4081",
                    borderRadius: this.props.w,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{
                        fontSize: this.props.fs,
                        color: "white",
                        marginTop: -20
                    }}>+</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
