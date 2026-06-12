<?php

mysqli_report(MYSQLI_REPORT_OFF);

$mysqli = mysqli_connect('localhost', 'suyeonn', 'Hh0468139@', 'suyeonn');

if (!$mysqli) {
    error_log('Seoul Youth Center DB connection failed: ' . mysqli_connect_error());
    header('Location: ' . BASE_URL . '/error.php');
    exit;
}

mysqli_select_db($mysqli, 'suyeonn');
mysqli_set_charset($mysqli, 'utf8mb4');
