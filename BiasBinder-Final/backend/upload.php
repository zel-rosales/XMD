<?php
// Allow all origins (for development; limit in production)
header("Access-Control-Allow-Origin: *");

// Helper function to check if a required field is missing
function isMissing($value) {
  return !isset($value) || trim($value) === '';
}

// Collect and sanitize GET inputs
$imageUrl = isset($_GET['imageUrl']) ? htmlspecialchars($_GET['imageUrl']) : '';
$label = isset($_GET['label']) ? htmlspecialchars($_GET['label']) : '';
$artist = isset($_GET['artist']) ? htmlspecialchars($_GET['artist']) : '';
$member = isset($_GET['member']) ? htmlspecialchars($_GET['member']) : '';
$album = isset($_GET['album']) ? htmlspecialchars($_GET['album']) : '';
$favorite = isset($_GET['favorite']) ? intval($_GET['favorite']) : 0;
$status = isset($_GET['status']) ? htmlspecialchars($_GET['status']) : '';
$sell = isset($_GET['sell']) ? intval($_GET['sell']) : 0;
$trade = isset($_GET['trade']) ? intval($_GET['trade']) : 0;
$buy = isset($_GET['buy']) ? intval($_GET['buy']) : 0;

// Validate required fields
if (
  isMissing($label) ||
  isMissing($artist) ||
  isMissing($member) ||
  isMissing($album) ||
  isMissing($status)
) {
  http_response_code(400);
  echo "Error: Missing required field(s).";
  exit;
}

// Simulate successful response (no file/database saving)
echo "Photocard uploaded successfully with label: $label";
?>
