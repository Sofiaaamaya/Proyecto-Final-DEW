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



==================================================
-- CATEGORÍAS SUGERIDAS (opcional para futuras mejoras)
-- =========================================================
INSERT INTO productos (nombre, descripcion, precio, disponibilidad, imagen) VALUES
-- 1. Mascarilla de Arcilla Rosa
('Mascarilla Facial de Arcilla Rosa', 'Purifica y suaviza la piel sensible. Ideal para pieles delicadas y propensas a rojeces.', 12.80, 30, 'img/arcilla_rosa-removebg-preview.png'),

-- 2. Bálsamo Labial de Karité
('Bálsamo Labial Nutritivo de Karité', 'Nutrición intensa con manteca de karité pura. Protege y repara labios secos.', 4.50, 50, 'img/balsamo_karite-removebg-preview.png'),

-- 3. Crema de Caléndula
('Crema Regeneradora de Caléndula', 'Calma irritaciones y acelera la regeneración celular con extracto puro de caléndula orgánica.', 16.75, 22, 'img/calendula_cream-removebg-preview.png'),

-- 4. Crema Facial Anti-edad
('Crema Facial Rejuvenecedora Premium', 'Fórmula avanzada anti-edad con péptidos y ácido hialurónico para reducir líneas de expresión.', 28.90, 15, 'img/crema_facial-removebg-preview.png'),

-- 5. Crema Hidratante
('Crema Hidratante Intensiva 24h', 'Hidratación profunda y duradera para todo tipo de pieles. Con ceramidas y glicerina natural.', 19.50, 35, 'img/crema_hidratante-removebg-preview.png'),

-- 6. Elizabeth Arden Cream
('Crema Elizabeth Arden Eight Hour', 'Crema multiusos icónica que hidrata, protege y repara intensamente la piel. Fórmula original.', 32.00, 12, 'img/eli_arden_cream-removebg-preview.png'),

-- 7. Crema de Lavanda
('Crema Relajante de Lavanda Nocturna', 'Hidratación nocturna con aceite esencial de lavanda para calmar, nutrir y mejorar el descanso.', 15.25, 28, 'img/lavanda_cream-removebg-preview.png'),

-- 8. Moisturizing Cream
('Moisturizing Cream Supreme Hydration', 'Crema ultra hidratante con vitamina E y aceite de jojoba para piel seca y sensible.', 24.80, 20, 'img/moisturizing-removebg-preview.png'),

-- 9. Serum Verde Detox
('Serum Detox Verde Purificante', 'Serum con extractos de té verde, pepino y algas marinas para desintoxicar y refrescar la piel.', 26.50, 16, 'img/serum_verde-removebg-preview.png'),

-- 10. Serum Vitamina C
('Serum Iluminador de Vitamina C Pura', 'Ilumina la piel y reduce manchas con vitamina C estabilizada. Resultados visibles en 2 semanas.', 22.50, 18, 'img/serum_vitc-removebg-preview.png'),

-- 11. Tónico Facial
('Tónico Facial Equilibrante pH Neutro', 'Equilibra el pH de la piel y minimiza poros. Con agua de rosas, hamamelis y extracto de pepino.', 11.90, 45, 'img/tonico-removebg-preview.png');


-- =========================================================
-- VERIFICACIÓN DE DATOS
-- =========================================================

-- Ver todos los productos insertados:
SELECT id, nombre, precio, disponibilidad, imagen FROM productos ORDER BY id;

-- Ver estadísticas:
SELECT 
    COUNT(*) as total_productos,
    SUM(disponibilidad) as stock_total,
    MIN(precio) as precio_minimo,
    MAX(precio) as precio_maximo,
    ROUND(AVG(precio), 2) as precio_promedio
FROM productos;

-- =========================================================
-- RESUMEN
-- =========================================================
-- Total de productos: 11
-- Stock total: 291 unidades
-- Precio mínimo: 4.50€ (Bálsamo Karité)
-- Precio máximo: 32.00€ (Elizabeth Arden)
-- Precio promedio: 19.58€
-- =========================================================

-- =========================================================
-- TABLA PARA IMÁGENES DEL CARRUSEL (OPCIONAL)
-- =========================================================

-- Crear tabla para el carrusel
CREATE TABLE IF NOT EXISTS carrusel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen VARCHAR(255) NOT NULL,
    titulo VARCHAR(150),
    descripcion TEXT,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE
);

-- Limpiar tabla si existe
TRUNCATE TABLE carrusel;

-- Insertar imágenes del carrusel
INSERT INTO carrusel (imagen, titulo, descripcion, orden, activo) VALUES
('img/carrusel/ft_carrusel_1.png', 'Natural Radiance', 'Descubre nuestra línea exclusiva de cuidado de la piel', 1, TRUE),
('img/carrusel/foto_carrusel_2.webp', 'Calma Interior', 'Experimenta la serenidad con nuestra colección de aromaterapia', 2, TRUE),
('img/carrusel/ft_carrousel_3.png', 'Oro Regenerador', 'Rejuvenece tu piel con la tecnología anti-edad más avanzada', 3, TRUE),
('img/carrusel/foto_carrusel_4.png', 'Belleza Natural', 'Productos orgánicos certificados para tu bienestar', 4, TRUE),
('img/carrusel/foto_carrusel_5.jpeg', 'Esencia Pura', 'Ingredientes naturales de la más alta calidad', 5, TRUE);

-- Ver imágenes del carrusel
SELECT * FROM carrusel ORDER BY orden;