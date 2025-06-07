<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Enable CORS for local development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Connect to SQLite3 database (creates if not exists)
$db = new SQLite3("./database/gratitudes.db");

// API GET Method
$thankful = $_GET['thankful'];

// Create table if not exists
// $db->exec("CREATE TABLE IF NOT EXISTS entries (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     thankful TEXT NOT NULL,
// )");

// Insert the new gratitude entry
$result = $db->exec("INSERT INTO entries (thankful) VALUES ('$thankful')");

header('Content-type: text/plain');
echo $thankful;
?>
