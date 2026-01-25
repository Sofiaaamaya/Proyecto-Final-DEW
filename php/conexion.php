<?php
// Datos de conexión
$host = "localhost";
$user = "lanzarote";
$pass = "Lanza.pass";
$dbname = "tienda_belleza";

// Crear conexión
$conn = new mysqli($host, $user, $pass, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Forzar UTF-8
$conn->set_charset("utf8");
?>