<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Enable CORS for local development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$thankful = $_GET['thankful'];

// Connect to SQLite3 database (creates if not exists)
$db = new SQLite3("./database/gratitudes.db");

// Create table if not exists
$db->exec("CREATE TABLE IF NOT EXISTS gratitude_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thankful TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

// Insert the new gratitude entry
$result = $db->exec("INSERT INTO gratitude_entries (thankful) VALUES ('$thankful')");

echo $result;
?>
