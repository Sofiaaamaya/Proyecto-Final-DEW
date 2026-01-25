<?php
header("Content-Type: application/json");
require "conexion.php";

// Recibir datos JSON
$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"];
$email = $data["email"];
$telefono = $data["telefono"];
$cuenta = $data["cuenta_bancaria"];

// Validación mínima
if (!$nombre || !$email || !$telefono || !$cuenta) {
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$sql = "INSERT INTO usuarios (nombre, email, telefono, cuenta_bancaria)
        VALUES ('$nombre', '$email', '$telefono', '$cuenta')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Usuario registrado"]);
} else {
    echo json_encode(["error" => "Error al registrar usuario"]);
}
?>