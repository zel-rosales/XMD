<?php
try {
    $db = new SQLite3(__DIR__ . '/photocards.db');

    $db->exec("CREATE TABLE IF NOT EXISTS photocards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        artist TEXT NOT NULL,
        member TEXT NOT NULL,
        album TEXT NOT NULL,
        status TEXT CHECK(status IN ('owned', 'iso')) NOT NULL,
        favorite INTEGER DEFAULT 0,
        sell INTEGER DEFAULT 0,
        trade INTEGER DEFAULT 0,
        buy INTEGER DEFAULT 0,
        image_url TEXT
    )");

    echo "Database and table created successfully.";
} catch (Exception $e) {
    echo "Error creating database: " . $e->getMessage();
}
?>
