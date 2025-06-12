<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set to JSON
header('Content-type: application/json');

// Connect to the SQLite database
$db = new PDO('sqlite:photocards.db');

// Get values from the GET request
$label = $_GET['label'] ?? '';
$artist = $_GET['artist'] ?? '';
$member = $_GET['member'] ?? '';
$album = $_GET['album'] ?? '';
$favorite = $_GET['favorite'] ?? '0';
$owned = $_GET['owned'] ?? '0';
$wts = $_GET['wts'] ?? '0';
$wtt = $_GET['wtt'] ?? '0';
$wtb = $_GET['wtb'] ?? '0';

// Check if required fields are filled
if (!$label || !$artist || !$member || !$album) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields.'
    ]);
    exit;
}

// Insert the data into the binder table
$sql = "INSERT INTO binder (label, artist, member, album, favorite, owned, wts, wtt, wtb) 
        VALUES ('$label', '$artist', '$member', '$album', '$favorite', '$owned', '$wts', '$wtt', '$wtb')";
        
$count = $db->exec($sql);

if ($count === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Insert failed.'
    ]);
} else {
    echo json_encode([
        'success' => true,
        'message' => 'Photocard added!'
    ]);
}
?>
