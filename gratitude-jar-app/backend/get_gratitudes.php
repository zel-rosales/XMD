<?php
// Enable CORS for local development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Connect to database
$db = new SQLite3("./database/gratitudes.db");

// Fetch entries
$results = $db->query("SELECT id, thankful FROM gratitude_entries ORDER BY created_at DESC");

// Output plain text, each entry on a new line: "id||thankful"
while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    echo $row['id'] . '||' . $row['thankful'] . "\n";
}
?>
