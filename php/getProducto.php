<?php
header("Content-Type: application/json");
require "conexion.php";

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "ID no proporcionado"]);
    exit;
}

$id = intval($_GET['id']);

$sql = "SELECT * FROM productos WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "Producto no encontrado"]);
}
?>