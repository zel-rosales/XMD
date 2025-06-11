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

// Get params
$id = $_GET['id'] ?? '';
$label = $_GET['label'] ?? '';
$artist = $_GET['artist'] ?? '';
$member = $_GET['member'] ?? '';
$album = $_GET['album'] ?? '';
$favorite = $_GET['favorite'] ?? '0';
$owned = $_GET['owned'] ?? '0';

// Basic check
if (!$id) {
    echo json_encode(["success" => false, "message" => "Missing ID"]);
    exit;
}

// Build update query
$sql = "UPDATE binder SET 
            label = '$label',
            artist = '$artist',
            member = '$member',
            album = '$album',
            favorite = '$favorite',
            owned = '$owned'
        WHERE id = $id";

// Run update
$result = $db->exec($sql);

if ($result) {
    echo json_encode(["success" => true, "message" => "Photocard updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}
?>
