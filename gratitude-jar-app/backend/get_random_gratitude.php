<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to the database
$db = new SQLite3("./database/gratitudes.db");

// Get a random entry
$result = $db->query("SELECT thankful FROM entries ORDER BY RANDOM() LIMIT 1");

if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    echo json_encode(["thankful" => $row["thankful"]]);
} else {
    echo json_encode(["error" => "No entries found"]);
}
?>
