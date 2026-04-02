<?php

$isLocal = in_array($_SERVER['SERVER_NAME'], [
    'localhost',
    '127.0.0.1',
    '::1'
]);

define('ENV', $isLocal ? 'local' : 'production');

if (ENV === 'local') {
    define('BASE_URL', '');
} else {
    define('BASE_URL', '/seoul-youth-center');
}