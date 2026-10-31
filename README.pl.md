# Budzik

*[🇬🇧 English version of README](README.md)*

Aplikacja alarmowa Expo umożliwiająca tworzenie, edytowanie, zapisywanie i uruchamianie cyklicznych alarmów na Androidzie oraz iOS.

## Funkcje

- Ekran powitalny z dołączoną niestandardową czcionką
- Tworzenie alarmów przez wybór godziny, minut i dni tygodnia
- Edytowanie i usuwanie zapisanych alarmów
- Zapisywanie danych w SQLite przez `expo-sqlite`
- Włączanie i wyłączanie poszczególnych alarmów
- Planowanie następnego wystąpienia alarmu
- Opcjonalna muzyka alarmu z dołączonego pliku `alarm.mp3`
- Opcjonalne wibracje
- Rozwijane wiersze alarmów pokazujące wybrane dni tygodnia
- Obsługa bezpiecznych obszarów ekranu telefonu

## Stack technologiczny

- JavaScript
- [Expo](https://expo.dev/) SDK 58
- React Native
- [React Navigation](https://reactnavigation.org/) z nawigacją native stack
- `expo-sqlite` do lokalnego przechowywania alarmów
- `expo-audio` do odtwarzania dźwięku alarmu
- `expo-font` do obsługi niestandardowej czcionki
- `react-native-safe-area-context` do obsługi wcięć i paska statusu

## Struktura projektu

```
.
├── App.js                         # konfiguruje bezpieczny obszar i stos nawigacji
├── app.json                       # konfiguracja aplikacji Expo i pluginów
├── babel.config.js                # konfiguracja Babel dla Expo
├── metro.config.js               # konfiguracja Metro z obsługą WASM SQLite
├── components/
│   ├── StartScreen.js             # ekran powitalny i inicjalizacja aplikacji
│   ├── MainScreen.js              # lista alarmów i przycisk dodawania
│   ├── AddScreen.js               # edytor nowego alarmu
│   ├── EditScreen.js              # edytor istniejącego alarmu
│   ├── ListItems.js               # ładowanie i wyświetlanie alarmów
│   ├── ListItem.js                # kontrolki i planowanie alarmu
│   ├── CircleButton.js            # wielokrotnie używany okrągły przycisk
│   └── Database.js                # operacje na tabeli SQLite i alarmach
└── assets/
    ├── alarm.mp3                  # dźwięk alarmu
    ├── blackopsone-regular.ttf    # czcionka ekranu powitalnego
    └── ikony i obrazy ekranu startowego
```

## Uruchomienie lokalne

```bash
npm install
npx expo start
```

Aby uruchomić aplikację na podłączonym urządzeniu lub emulatorze Androida:

```bash
npx expo start --android
```

Aby użyć połączenia przez tunel:

```bash
npx expo start --tunnel
```

## Budowanie i sprawdzanie

Sprawdzenie konfiguracji Expo i zależności:

```bash
npx expo-doctor
```

Utworzenie natywnego bundla JavaScript:

```bash
npx expo export --platform android
```

## Sposób użycia

1. Uruchom aplikację i przejdź z ekranu powitalnego do listy alarmów.
2. Naciśnij `+`, aby utworzyć alarm.
3. Dotknij godziny lub minut i wybierz wartość na zegarze.
4. Wybierz jeden lub więcej dni tygodnia i zapisz alarm.
5. Użyj przycisku zasilania, aby włączyć lub wyłączyć alarm.
6. Użyj kontrolek wibracji i muzyki, aby skonfigurować alarm.
7. Rozwiń wiersz alarmu, aby zobaczyć wybrane dni tygodnia.
8. Użyj przycisków edycji lub usuwania, aby zarządzać alarmem.

## Uwagi

- Alarmy są przechowywane lokalnie w bazie SQLite na urządzeniu.
- Planowanie alarmu działa, dopóki odpowiadający mu komponent alarmu jest zamontowany.
- Komentarze w kodzie i dokumentacja są po angielsku.
