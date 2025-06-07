<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db = new SQLite3("./database/photocards.db");
// echo "test";

// Run the SELECT query
$results = $db->query("SELECT * FROM photocards");

// 2. Output the records in JSON
header("Content-Type: application/json"); 
$data = array();
while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    array_push($data, $row);
}
echo json_encode($data);
// echo json_encode($results->fetchAll(PDO::FETCH_ASSOC)); 

// header("Content-Type: application/json"); 
// echo json_encode($products->fetchAll(PDO::FETCH_ASSOC)); 

// Output in a simple format (like CSV)
// while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
//   echo implode("|", [
//     $row['id'],
//     $row['image_url'],
//     $row['label'],
//     $row['artist'],
//     $row['member'],
//     $row['album'],
//     $row['favorite'],
//     $row['status'],
//     $row['sell'],
//     $row['trade'],
//     $row['buy']
//   ]);
//   echo "\n"; // New line for each record
// }
?>
