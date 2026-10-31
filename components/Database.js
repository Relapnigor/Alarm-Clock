
import * as SQLite from 'expo-sqlite';

// Provides the SQLite operations used by the alarm screens.
export default class Database {
    static db = SQLite.openDatabaseSync("filas_robert_5s1.db");

    // Creates the alarms table when the application starts.
    static createTable() {
        this.db.execSync(
            "CREATE TABLE IF NOT EXISTS budziki (id integer primary key not null, hour text, minute text, days text);"
        );
    }

    // Inserts a new alarm with its selected time and weekdays.
    static add(hour, minute, days) {
        this.db.runSync(
            "INSERT INTO budziki (hour, minute, days) VALUES (?, ?, ?)",
            hour,
            minute,
            days.toString()
        );
    }

    // Updates an existing alarm with its current time and weekdays.
    static update(id, hour, minute, days) {
        this.db.runSync(
            "UPDATE budziki SET hour = ?, minute = ?, days = ? WHERE id = ?",
            hour,
            minute,
            days.toString(),
            id
        );
    }

    // Returns all saved alarms as a promise for the screen data flow.
    static getAll() {
        return Promise.resolve(this.db.getAllSync("SELECT * FROM budziki"));
    }

    // Deletes the alarm identified by the given database id.
    static remove(id) {
        this.db.runSync("DELETE FROM budziki WHERE id = ?", id);
    }
}
