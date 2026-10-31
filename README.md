# Budzik

*[🇵🇱 Polska wersja README](README.pl.md)*

An Expo alarm clock app for creating, editing, storing, and activating recurring alarms on Android and iOS.

## Features

- Welcome screen with a custom bundled font
- Create alarms by selecting an hour, minute, and weekdays
- Edit and delete saved alarms
- SQLite persistence through `expo-sqlite`
- Enable and disable individual alarms
- Schedule the next matching alarm day and time
- Optional alarm music with the bundled `alarm.mp3` file
- Optional vibration feedback
- Expandable alarm rows showing selected weekdays
- Safe-area support for phones with a status bar or display cutout

## Tech stack

- JavaScript
- [Expo](https://expo.dev/) SDK 58
- React Native
- [React Navigation](https://reactnavigation.org/) native stack navigation
- `expo-sqlite` for local alarm storage
- `expo-audio` for alarm playback
- `expo-font` for the custom font
- `react-native-safe-area-context` for screen insets

## Project structure

```
.
├── App.js                         # configures the safe area and navigation stack
├── app.json                       # Expo application and plugin configuration
├── babel.config.js                # Expo Babel configuration
├── metro.config.js                # Metro configuration with SQLite WASM support
├── components/
│   ├── StartScreen.js             # welcome screen and startup initialization
│   ├── MainScreen.js              # alarm list screen and add button
│   ├── AddScreen.js               # new alarm editor
│   ├── EditScreen.js              # existing alarm editor
│   ├── ListItems.js               # loads and renders saved alarms
│   ├── ListItem.js                # alarm controls and scheduling
│   ├── CircleButton.js            # reusable circular action button
│   └── Database.js                # SQLite table and alarm operations
└── assets/
    ├── alarm.mp3                  # alarm sound
    ├── blackopsone-regular.ttf    # welcome screen font
    └── icons and splash images
```

## Running locally

```bash
npm install
npx expo start
```

To run on a connected Android device or emulator:

```bash
npx expo start --android
```

To use a tunnel connection:

```bash
npx expo start --tunnel
```

## Building and validation

Expo configuration and dependency checks:

```bash
npx expo-doctor
```

Create a native JavaScript bundle:

```bash
npx expo export --platform android
```

## How to use

1. Start the app and open the alarm list from the welcome screen.
2. Press `+` to create an alarm.
3. Tap the hour or minute and choose a value on the clock.
4. Select one or more weekdays and save the alarm.
5. Use the power button to schedule or disable the alarm.
6. Use the vibration and music controls to configure the alarm.
7. Expand an alarm row to view its selected weekdays.
8. Use the edit or delete buttons to manage an existing alarm.

## Notes

- Alarm records are stored locally in SQLite on the device.
- Alarm scheduling is active while the corresponding alarm component remains mounted.
- Code comments and documentation are in English.
