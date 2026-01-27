<?php
header("Content-Type: application/json");
require "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];

if (!$email) {
    echo json_encode(["error" => "Email no proporcionado"]);
    exit;
}

$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => true,
        "usuario" => $result->fetch_assoc()
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
}
?>


