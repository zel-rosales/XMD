<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$db = new SQLite3("./database/gratitudes.db");

/* Delete every row */
$db->exec("DELETE FROM entries");

/* Optional: reset AUTOINCREMENT counter */
$db->exec("DELETE FROM sqlite_sequence WHERE name = 'entries'");

echo json_encode(["success" => true, "message" => "All gratitude entries deleted."]);
?>
