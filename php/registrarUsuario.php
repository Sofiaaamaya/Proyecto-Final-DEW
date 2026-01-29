<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);



header("Content-Type: application/json");
require "conexion.php";

// Recibir datos JSON
$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"];
$email = $data["email"];
$telefono = $data["telefono"];
$cuenta = $data["cuenta"];
$direccion = $data["direccion"];
$ciudad = $data["ciudad"];

// Validación mínima
if (!$nombre || !$email || !$telefono || !$cuenta || !$direccion || !$ciudad) {
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

// Insertar en la tabla usuarios
$sql = "INSERT INTO usuarios (nombre, email, telefono, cuenta_bancaria, direccion, ciudad)
        VALUES ('$nombre', '$email', '$telefono', '$cuenta', '$direccion', '$ciudad')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Usuario registrado"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>