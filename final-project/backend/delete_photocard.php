<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Connect to SQLite database
$db = new PDO('sqlite:photocards.db');

// Get photocard ID from URL parameters
$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Missing photocard ID']);
    exit;
}

// Delete photocard from the binder table
$sql = "DELETE FROM binder WHERE id = :id";
$stmt = $db->prepare($sql);
$success = $stmt->execute([':id' => $id]);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Photocard deleted']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete photocard']);
}
?>
