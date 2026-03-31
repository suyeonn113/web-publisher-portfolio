<?php

if ($_SERVER['SERVER_NAME'] === 'localhost') {
    define('BASE_URL', '');
} else {
    define('BASE_URL', '/fragfarm-mobile');
}