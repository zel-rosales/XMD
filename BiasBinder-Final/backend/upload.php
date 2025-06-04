<?php
// Allow all origins (for development; restrict in production)
header("Access-Control-Allow-Origin: *");

// Set database filename
$dbFile = 'photocards.db';

// Delete existing DB if it exists (optional: only for clean resets)
// unlink($dbFile);

// Create or open the SQLite3 database
$db = new SQLite3($dbFile);

// SQL to create the photocards table
$sql = "CREATE TABLE IF NOT EXISTS photocards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imageUrl TEXT,
    label TEXT NOT NULL,
    artist TEXT NOT NULL,
    member TEXT NOT NULL,
    album TEXT NOT NULL,
    favorite INTEGER DEFAULT 0,
    status TEXT NOT NULL,
    sell INTEGER DEFAULT 0,
    trade INTEGER DEFAULT 0,
    buy INTEGER DEFAULT 0
)";

// Attempt to create table
if ($db->exec($sql)) {
    echo "Database and table created successfully!";
} else {
    echo "Error creating database: " . $db->lastErrorMsg();
}

// Close database
$db->close();
?>
