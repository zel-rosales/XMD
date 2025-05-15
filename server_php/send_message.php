<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

$recipient = $_GET['recipient'];
$content = $_GET['content'];

echo "<p>To: $recipient</p>";
echo "<p>Message: $content</p>";

$file = fopen("./messages/$recipient.txt", "w");
fwrite($file, $content);
fclose($file);

echo "<h1>Message has been sent.</h1>"
?>
