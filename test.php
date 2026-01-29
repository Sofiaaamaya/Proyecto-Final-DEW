<?php
require "conexion.php";

echo "Conexión OK<br>";

$result = $conn->query("SELECT COUNT(*) AS total FROM productos");

if ($result) {
    $row = $result->fetch_assoc();
    echo "Productos en la BBDD: " . $row["total"];
} else {
    echo "Error en la consulta";
}
?>