-- 1) Crear la base de datos
CREATE DATABASE tienda_belleza
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- 2) Seleccionar la base de datos
USE tienda_belleza;

---------------------------------------------------------
-- 3) TABLA DE PRODUCTOS
---------------------------------------------------------
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    disponibilidad INT NOT NULL,
    imagen VARCHAR(255) NOT NULL
);

---------------------------------------------------------
-- 4) TABLA DE USUARIOS
---------------------------------------------------------
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    cuenta_bancaria VARCHAR(34) NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


----------------------------------------------------------
-- 5) INSERTAR LOS PRODUCTOS
----------------------------------------------------------
INSERT INTO productos (nombre, descripcion, precio, disponibilidad, imagen) VALUES
('Crema Hidratante Aloe Vera', 'Hidratación profunda con extracto natural de aloe vera.', 14.99, 25, 'img/aloe_crema.webp'),
('Serum Vitamina C', 'Ilumina la piel y reduce manchas con vitamina C pura.', 22.50, 18, 'img/serum_vitc.webp'),
('Aceite Esencial de Lavanda', 'Relajante natural para piel y aromaterapia.', 9.95, 40, 'img/lavanda.webp'),
('Mascarilla Facial de Arcilla Rosa', 'Purifica y suaviza la piel sensible.', 12.80, 30, 'img/arcilla_rosa.webp'),
('Bálsamo Labial Karité', 'Nutrición intensa con manteca de karité.', 4.50, 50, 'img/balsamo_karite.webp');