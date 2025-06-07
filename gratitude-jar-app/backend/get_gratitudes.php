<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Connect to SQLite
$db = new SQLite3("./database/gratitudes.db");

// Query entries
$results = $db->query("SELECT thankful FROM entries");

$entries = [];
while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    $entries[] = $row['thankful'];
}

echo json_encode($entries);
?>
