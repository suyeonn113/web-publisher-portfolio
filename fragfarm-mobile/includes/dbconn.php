<?php
include_once __DIR__ . '/config.php';

$mysqli = mysqli_connect("localhost", "suyeonn", "Hh0468139@", "suyeonn");

if (!$mysqli) {
    error_log('Fragfarm DB connection failed: ' . mysqli_connect_error());
    header('Location: ' . BASE_URL . '/error.php');
    exit;
}

mysqli_select_db($mysqli, "suyeonn");
?>
