<?php
// Set the content type to HTML.
header('Content-Type: text/html');

// Define the path to your PHP scripts directory.
$phpScriptDirectory = __DIR__ . '/public/php/';

// Extract the requested path from the URL.
$requestedPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Build the full path to the PHP script.
$phpScriptPath = $phpScriptDirectory . ltrim($requestedPath, '/');

// Check if the requested PHP file exists.
if (file_exists($phpScriptPath) && is_file($phpScriptPath)) {
    // Execute the PHP script.
    include($phpScriptPath);
} else {
    // Handle 404 error if the file does not exist.
    http_response_code(404);
    echo '404 Not Found';
}
?>
