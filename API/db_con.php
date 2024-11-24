<?php
$host = "localhost"; // Database host
$dbname = "tabbe3ni_bd"; // Your database name


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
