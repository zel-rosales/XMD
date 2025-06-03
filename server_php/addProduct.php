<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

# To allow different origin (domain) access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

# Start a new SQLite connection
$db = new PDO('sqlite:database/store.db');

# API via GET method
# product: id, cat_id, name, price
$id = $_GET['id'];
$cat_id = $_GET['cat_id'];
$name = $_GET['name'];
$price = $_GET['price'];

$sql = "insert into products(id, cat_id, name, price) values($id, $cat_id, '$name', $price)";
$count = $db->exec($sql);

# Server response
header('Content-type: text/plain');
echo "$count";

