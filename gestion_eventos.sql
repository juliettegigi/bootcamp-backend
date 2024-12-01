-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-12-2024 a las 19:29:15
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_eventos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `ubicacion` varchar(50) DEFAULT NULL,
  `descripcion` text,
  `isEliminado` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `fecha`, `ubicacion`, `descripcion`, `isEliminado`) VALUES
(1, 'evento1', '2024-12-01', 'ubicacion1', 'descripcion1', b'0'),
(2, 'evento2', '2024-11-30', 'ubicación2', 'descripción2', b'0'),
(3, 'evento3', '2024-09-26', 'ubicación3', 'descripción3', b'0'),
(4, 'evento4', '2024-09-30', 'ubicación4', 'descripción4', b'0'),
(5, 'evento5', '2024-09-28', 'ubicación2', 'descripción5', b'0'),
(6, 'evento6', '2024-09-27', 'ubicación3', 'descripción6', b'0'),
(7, 'evento9', '2024-09-08', 'ubicacion9', 'descripcion9', b'0'),
(8, 'evento7', '2024-09-08', 'ubicacion7', 'descripcion7', b'0'),
(9, 'evento8', '2024-09-08', 'ubicacion8', 'descripcion8', b'0'),
(10, 'evento10', '2024-09-10', 'ubicacion10', 'descripcion10', b'0'),
(11, 'evento11', '2024-09-11', 'ubicacion11', 'descripcion11', b'0'),
(12, 'evento12', '2024-09-12', 'ubicacion12', 'descripcion12', b'0'),
(13, 'evento13', '2024-09-13', 'ubicacion13', 'descripcion13', b'0'),
(14, 'evento14', '2024-09-14', 'ubicacion14', 'descripcion14', b'0'),
(15, 'evento15', '2024-09-15', 'ubicacion15', 'descripcion15', b'0'),
(16, 'evento16', '2024-09-16', 'ubicacion16', 'descripcion16', b'0'),
(17, 'evento17', '2024-09-17', 'ubicacion17', 'descripcion17', b'0'),
(18, 'evento18', '2024-09-18', 'ubicacion18', 'descripcion18', b'0'),
(19, 'evento19', '2024-11-19', 'ubicacion19', 'descripcion19', b'0'),
(20, 'evento20', '2024-11-20', 'ubicacion20', 'descripcion20', b'0'),
(36, 'evento21', '2024-11-05', 'ubi21', 'des21', b'0'),
(37, 'evento22', '2024-12-03', 'ubicación22', 'descrip22', b'0'),
(39, 'evento21', '2024-12-20', 'ubicacion21', 'descripcion21', b'1'),
(40, 'evento22', '2024-12-20', 'ubicacion22', 'descripcion22', b'0'),
(41, 'evento23', '2024-12-20', 'ubicacion23', 'descripcion23', b'0'),
(42, 'evento24', '2024-12-20', 'ubicacion24', 'descripcion24', b'0'),
(43, 'evento25', '2024-11-24', 'ubicación 25', 'descripcion 25 alfgo\nmas', b'0'),
(44, 'eve1', '2024-12-02', 'ubi3', 'des3', b'0'),
(45, 'evebbb', '2024-12-02', 'ub2', 'des3', b'0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participaciones`
--

CREATE TABLE `participaciones` (
  `id` int NOT NULL,
  `usuarioId` int NOT NULL,
  `eventoId` int NOT NULL,
  `isConfirmado` bit(1) DEFAULT b'0',
  `isPresente` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `participaciones`
--

INSERT INTO `participaciones` (`id`, `usuarioId`, `eventoId`, `isConfirmado`, `isPresente`) VALUES
(12, 11, 19, b'1', b'1'),
(13, 11, 20, b'1', b'0'),
(20, 11, 36, b'0', b'0'),
(28, 11, 1, b'1', b'0'),
(48, 47, 1, b'0', b'1'),
(58, 47, 36, b'0', b'0'),
(59, 47, 42, b'0', b'0'),
(61, 48, 36, b'0', b'1'),
(66, 48, 37, b'0', b'0'),
(74, 48, 41, b'1', b'0'),
(85, 48, 44, b'0', b'0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `rol` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'ORGANIZADOR'),
(2, 'USUARIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioroles`
--

CREATE TABLE `usuarioroles` (
  `id` int NOT NULL,
  `usuarioId` int NOT NULL,
  `rolId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarioroles`
--

INSERT INTO `usuarioroles` (`id`, `usuarioId`, `rolId`) VALUES
(11, 11, 2),
(12, 15, 1),
(13, 16, 1),
(14, 18, 2),
(15, 19, 2),
(16, 20, 2),
(17, 21, 2),
(18, 22, 2),
(19, 23, 2),
(20, 34, 2),
(21, 47, 2),
(23, 48, 1),
(22, 48, 2),
(26, 53, 2),
(27, 54, 2),
(28, 55, 2),
(29, 56, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `pass` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `pass`) VALUES
(11, 'user1', 'user1@gmail.com', '$2a$10$sAx6G4c7R5ElEkq1iGoyAOfkCVO9Sg624yVXoZmNkliMxtmKfR.oS'),
(15, 'user2', 'user2@gmail.com', '$2a$10$QWdEhL38cjuYXXVTxafE8OCEY2H.YQLlrbdzGKdEIx24Agrk3R1du'),
(16, 'user3', 'user3@gmail.com', '$2a$10$ycWjYaF4xz3eqr8IcFxS6uVUut0UoQMJbQgnzktwh2TXklqnGr3F2'),
(18, 'nombre', 'user4@gmail.com', '$2a$10$14X2se/l0xvpHjYgLQpZoOd4VsVZHG5OGYo7oO59jh1blMPOD0W4m'),
(19, 'nombre', 'user11@gmail.com', '$2a$10$OTosVDPsOpRqBpxdGOnfI.k/QH4FupB875z.o9OxdmqEia1ut8mvS'),
(20, 'nombre', 'user12@gmail.com', '$2a$10$6xQLO5gJ0tTfV3xWmnSdBeqUiAkcu9Er9fiCzV4g6GJ/hF6mNihS.'),
(21, 'nombre13', 'user13@gmail.com', '$2a$10$XA1HTYTid3DK5gHlo8sOoO6DbNl0EXAyqwwZfYAlJNtEIYiyCB1hq'),
(22, 'nombre14', 'user14@gmail.com', '$2a$10$gZy3BoUB/GHZAIjXC931Wuakfxe6X9DjNe7psTkl0UsG8ctQ5q3ZS'),
(23, 'nombre15', 'user15@gmail.com', '$2a$10$7oWPEjVa9gYjJae0qvR/6.RtWBFyeQVVLwG1mld644EYtle5s7nUa'),
(34, 'julia', 'user16@gmail.com', '$2a$10$1gU1NDiHFc1QoHX2o78Gl.3/JQqMiPrXdQ4ZBAivC.tE.rHPWX9/S'),
(47, 'julia', 'user18@gmail.com', '$2a$10$DK8s54Z56YfVYYNY3xTHkO682CAvBGzP/ef0fLKDxJSbXLyHqGiNW'),
(48, 'julia', 'user20@gmail.com', '$2a$10$/2McBkKvK0V0hum0r0.SBO5qEMDrlRTjwbXV5WEbIc2v1kw9BOqMO'),
(53, 'marcela', 'marce@gmail.com', '$2a$10$NC.ObKTTjXUWCD5a129jye.STaqpUbWS/L.T5G1yfE2AuHohqu0Si'),
(54, 'karina', 'kari@gmail.com', '$2a$10$DcWEgntxtv1n6zf1K7LLKuq0aH/83mwW1llYa2gGW7Te74oXgvkv6'),
(55, 'kamila', 'kamila@gmail.com', '$2a$10$KuqFX.d//riGMsWiiz2JPO07y9gGe4527q743zSTtV0OfrJRx6w7e'),
(56, 'martin', 'martin@gmail.com', '$2a$10$Wp96YEzc7MNB/Wqs.zZXvOdHcRHRNOpwmEzktuANVnvPuFEEIDzf6');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `participaciones`
--
ALTER TABLE `participaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioId` (`usuarioId`,`eventoId`),
  ADD KEY `eventoId` (`eventoId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarioroles`
--
ALTER TABLE `usuarioroles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioId` (`usuarioId`,`rolId`),
  ADD KEY `rolId` (`rolId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `participaciones`
--
ALTER TABLE `participaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarioroles`
--
ALTER TABLE `usuarioroles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `participaciones`
--
ALTER TABLE `participaciones`
  ADD CONSTRAINT `participaciones_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `participaciones_ibfk_2` FOREIGN KEY (`eventoId`) REFERENCES `eventos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarioroles`
--
ALTER TABLE `usuarioroles`
  ADD CONSTRAINT `usuarioroles_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuarioroles_ibfk_2` FOREIGN KEY (`rolId`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
