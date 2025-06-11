<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set to JSON
header("Content-Type: application/json");

// Connect to SQLite
$db = new SQLite3('photocards.db');

// Query entries
$results = $db->query("SELECT * FROM binder ORDER BY id DESC");

$photocards = [];

while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    $photocards[] = $row;
}

echo json_encode($photocards);
?>
