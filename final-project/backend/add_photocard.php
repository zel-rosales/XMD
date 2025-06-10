<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Connect to the SQLite database
$db = new PDO('sqlite:photocards.db');

// Get values from the GET request
$label = $_GET['label'] ?? '';
$artist = $_GET['artist'] ?? '';
$member = $_GET['member'] ?? '';
$album = $_GET['album'] ?? '';
$favorite = $_GET['favorite'] ?? '0';
$owned = $_GET['owned'] ?? '0';

// Check if required fields are filled
if (!$label || !$artist || !$member || !$album) {
    echo "Missing required fields.";
    exit;
}

// Insert the data into the binder table
$sql = "INSERT INTO binder (label, artist, member, album, favorite, owned) 
        VALUES ('$label', '$artist', '$member', '$album', '$favorite', '$owned')";

$count = $db->exec($sql);
// if ($count === false) {
//     $errorInfo = $db->errorInfo();
//     echo "Insert failed: " . $errorInfo[2];  // More detailed error
// } else {
//     echo "$count record inserted.";
// }

// Return how many rows were inserted
header('Content-type: text/plain');
echo "$count";
?>
