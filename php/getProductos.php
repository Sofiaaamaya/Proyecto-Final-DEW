<?php
header("Content-Type: application/json");
require "conexion.php";

$sql = "SELECT * FROM productos";
$result = $conn->query($sql);

$productos = [];

while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

echo json_encode($productos);
?>