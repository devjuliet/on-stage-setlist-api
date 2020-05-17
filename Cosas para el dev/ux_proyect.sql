-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-05-2020 a las 01:29:16
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ux_proyect`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bands`
--

CREATE TABLE `bands` (
  `id_band` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `url_logo` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `id_user_manager` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `band_genres`
--

CREATE TABLE `band_genres` (
  `id_band_genre` int(11) NOT NULL,
  `id_band` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `band_members`
--

CREATE TABLE `band_members` (
  `id_member` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_band` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `id_genre` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `genres`
--

INSERT INTO `genres` (`id_genre`, `name`) VALUES
(1, 'Rock'),
(2, 'Clásico'),
(3, 'Pop'),
(4, 'Bachata'),
(5, 'Vals'),
(6, 'Balada'),
(7, 'Ballenato'),
(8, 'Arabe '),
(9, 'Blues'),
(11, 'Versátil'),
(12, 'DJ'),
(13, 'Boleros'),
(14, 'Mariachi'),
(15, 'Contemporáneo'),
(16, 'Instrumental'),
(17, 'Dance‎'),
(18, 'Disco‎'),
(19, 'Música electrónica'),
(20, 'Hip hop‎'),
(21, 'Jazz'),
(22, 'Música folclórica‎'),
(23, 'Funk‎'),
(24, 'Música latina'),
(25, 'Punk‎'),
(26, 'Reggae‎'),
(27, 'Religiosa'),
(28, 'Gospel'),
(29, 'Cristiana'),
(30, 'Reguetón‎'),
(31, 'Rumba'),
(32, 'Salsa'),
(33, 'Tex Mex'),
(34, 'Texano'),
(35, 'Norteño'),
(36, 'Cumbia'),
(37, 'Tango'),
(38, 'Ranchera'),
(39, 'Corridos'),
(40, 'Huapango'),
(41, 'Polca'),
(42, 'Sinaloense'),
(43, 'Africano'),
(44, 'Equipo de Sonido'),
(45, 'Tropical'),
(46, 'Funky'),
(47, 'Trova'),
(48, 'Metal'),
(49, 'Country'),
(50, 'Chachachá'),
(51, 'Son'),
(52, 'Polka'),
(53, 'Ranchero'),
(54, 'Rock 60´s'),
(55, 'Regional popular'),
(56, 'Italiano'),
(57, 'R & B'),
(58, 'House'),
(59, 'Deep house'),
(60, 'Eurobeat'),
(61, 'Folk'),
(62, 'Free – jazz'),
(63, 'Garage'),
(64, 'Gabber'),
(65, 'Grunge'),
(66, 'Hip-Hop'),
(67, 'Minimalista'),
(68, 'New Age'),
(69, 'Rap'),
(70, 'Rock alternativo'),
(71, 'Rock and Roll'),
(72, 'Rock progresivo'),
(73, 'Rock sinfónico'),
(74, 'Ska'),
(75, 'Sicodélica'),
(76, 'Soul'),
(77, 'Swing'),
(78, 'Electro Swing'),
(79, 'Tecno'),
(80, 'Trance'),
(81, 'Trancecore'),
(82, 'Trash metal'),
(83, 'Trip-hop'),
(84, 'Underground'),
(85, 'Reggaeton'),
(86, 'Clásica'),
(87, 'Banda'),
(88, 'Rhythm and Blues (R&B)'),
(89, 'Ópera'),
(90, 'Vallenato'),
(91, 'Acid rock'),
(92, 'Samba'),
(93, 'Mambo'),
(94, 'Dancehall'),
(95, 'Psicodélica'),
(96, 'Flamenco'),
(97, 'Bolero'),
(98, 'Bossa nova'),
(99, 'Cool-Jazz'),
(100, 'Bebop'),
(101, 'Woogie'),
(102, 'Zarzuela'),
(103, 'Calypso'),
(104, 'Candombia'),
(105, 'Banda Sinaloense'),
(106, 'Norteña'),
(107, 'Cumbia Norteña'),
(108, 'Cumbia Sonidera'),
(109, 'Pasito Duranguense'),
(110, 'Quebradita'),
(111, 'Rock en español'),
(112, 'Danzon'),
(113, 'Chicanas'),
(114, 'Death Metal'),
(115, 'Andina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `live_designers`
--

CREATE TABLE `live_designers` (
  `id_live_designer` int(11) NOT NULL,
  `id_user_designer` int(11) NOT NULL,
  `id_band` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `live_events`
--

CREATE TABLE `live_events` (
  `id_live_event` int(11) NOT NULL,
  `location` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `tour` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `place` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `id_band` int(11) NOT NULL,
  `tag` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `live_event_tags`
--

CREATE TABLE `live_event_tags` (
  `id_live_event_tags` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL,
  `id_live_event` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `setlists`
--

CREATE TABLE `setlists` (
  `id_setlist` int(11) NOT NULL,
  `id_live_event` int(11) NOT NULL,
  `id_band` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `setlist_sets`
--

CREATE TABLE `setlist_sets` (
  `is_setlist_set` int(11) NOT NULL,
  `id_setlist` int(11) NOT NULL,
  `id_set` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `setlist_tags`
--

CREATE TABLE `setlist_tags` (
  `id_setlist_tag` int(11) NOT NULL,
  `id_setlist` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sets`
--

CREATE TABLE `sets` (
  `id_set` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `set_songs`
--

CREATE TABLE `set_songs` (
  `id_set_songs` int(11) NOT NULL,
  `id_set` int(11) NOT NULL,
  `id_song` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `songs`
--

CREATE TABLE `songs` (
  `id_song` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `artist` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lyric` varchar(20000) COLLATE utf8_unicode_ci NOT NULL,
  `chords_guitar` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tab_guitar` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chords_bass` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tab_bass` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chords_piano` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tab_piano` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tempo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_tags`
--

CREATE TABLE `song_tags` (
  `id_song_tag` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL,
  `id_song` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `id_tag` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`id_tag`, `name`) VALUES
(1, 'Rock'),
(2, 'Clásico'),
(3, 'Pop'),
(4, 'Bachata'),
(5, 'Vals'),
(6, 'Balada'),
(7, 'Ballenato'),
(8, 'Arabe '),
(9, 'Blues'),
(11, 'Versátil'),
(12, 'DJ'),
(13, 'Boleros'),
(14, 'Mariachi'),
(15, 'Contemporáneo'),
(16, 'Instrumental'),
(17, 'Dance‎'),
(18, 'Disco‎'),
(19, 'Música electrónica'),
(20, 'Hip hop‎'),
(21, 'Jazz'),
(22, 'Música folclórica‎'),
(23, 'Funk‎'),
(24, 'Música latina'),
(25, 'Punk‎'),
(26, 'Reggae‎'),
(27, 'Religiosa'),
(28, 'Gospel'),
(29, 'Cristiana'),
(30, 'Reguetón‎'),
(31, 'Rumba'),
(32, 'Salsa'),
(33, 'Tex Mex'),
(34, 'Texano'),
(35, 'Norteño'),
(36, 'Cumbia'),
(37, 'Tango'),
(38, 'Ranchera'),
(39, 'Corridos'),
(40, 'Huapango'),
(41, 'Polca'),
(42, 'Sinaloense'),
(43, 'Africano'),
(44, 'Equipo de Sonido'),
(45, 'Tropical'),
(46, 'Funky'),
(47, 'Trova'),
(48, 'Metal'),
(49, 'Country'),
(50, 'Chachachá'),
(51, 'Son'),
(52, 'Polka'),
(53, 'Ranchero'),
(54, 'Rock 60´s'),
(55, 'Regional popular'),
(56, 'Italiano'),
(57, 'R & B'),
(58, 'House'),
(59, 'Deep house'),
(60, 'Eurobeat'),
(61, 'Folk'),
(62, 'Free – jazz'),
(63, 'Garage'),
(64, 'Gabber'),
(65, 'Grunge'),
(66, 'Hip-Hop'),
(67, 'Minimalista'),
(68, 'New Age'),
(69, 'Rap'),
(70, 'Rock alternativo'),
(71, 'Rock and Roll'),
(72, 'Rock progresivo'),
(73, 'Rock sinfónico'),
(74, 'Ska'),
(75, 'Sicodélica'),
(76, 'Soul'),
(77, 'Swing'),
(78, 'Electro Swing'),
(79, 'Tecno'),
(80, 'Trance'),
(81, 'Trancecore'),
(82, 'Trash metal'),
(83, 'Trip-hop'),
(84, 'Underground'),
(85, 'Reggaeton'),
(86, 'Clásica'),
(87, 'Banda'),
(88, 'Rhythm and Blues (R&B)'),
(89, 'Ópera'),
(90, 'Vallenato'),
(91, 'Acid rock'),
(92, 'Samba'),
(93, 'Mambo'),
(94, 'Dancehall'),
(95, 'Psicodélica'),
(96, 'Flamenco'),
(97, 'Bolero'),
(98, 'Bossa nova'),
(99, 'Cool-Jazz'),
(100, 'Bebop'),
(101, 'Woogie'),
(102, 'Zarzuela'),
(103, 'Calypso'),
(104, 'Candombia'),
(105, 'Banda Sinaloense'),
(106, 'Norteña'),
(107, 'Cumbia Norteña'),
(108, 'Cumbia Sonidera'),
(109, 'Pasito Duranguense'),
(110, 'Quebradita'),
(111, 'Rock en español'),
(112, 'Danzon'),
(113, 'Chicanas'),
(114, 'Death Metal'),
(115, 'Andina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(11) NOT NULL DEFAULT 0 COMMENT 'Si el usuario es de tipo 0 es que no es manager ni live designer',
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_history`
--

CREATE TABLE `user_history` (
  `id_user_history` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `id_user` int(11) NOT NULL,
  `band_name` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int(10) NOT NULL,
  `usuario` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `entidad` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `extension` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `rolusuario` int(10) NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bands`
--
ALTER TABLE `bands`
  ADD PRIMARY KEY (`id_band`),
  ADD KEY `bands_FK` (`id_user_manager`);

--
-- Indices de la tabla `band_genres`
--
ALTER TABLE `band_genres`
  ADD PRIMARY KEY (`id_band_genre`),
  ADD KEY `band_genres_FK` (`id_band`),
  ADD KEY `band_genres_FK_1` (`id_genre`);

--
-- Indices de la tabla `band_members`
--
ALTER TABLE `band_members`
  ADD PRIMARY KEY (`id_member`),
  ADD UNIQUE KEY `band_member_UN` (`id_user`),
  ADD KEY `band_member_FK_1` (`id_band`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id_genre`);

--
-- Indices de la tabla `live_designers`
--
ALTER TABLE `live_designers`
  ADD PRIMARY KEY (`id_live_designer`),
  ADD KEY `live_designer_FK` (`id_user_designer`),
  ADD KEY `live_designer_FK_1` (`id_band`);

--
-- Indices de la tabla `live_events`
--
ALTER TABLE `live_events`
  ADD PRIMARY KEY (`id_live_event`),
  ADD KEY `live_shows_FK` (`id_band`);

--
-- Indices de la tabla `live_event_tags`
--
ALTER TABLE `live_event_tags`
  ADD PRIMARY KEY (`id_live_event_tags`),
  ADD KEY `live_event_tags_FK` (`id_tag`),
  ADD KEY `live_event_tags_FK_1` (`id_live_event`);

--
-- Indices de la tabla `setlists`
--
ALTER TABLE `setlists`
  ADD PRIMARY KEY (`id_setlist`),
  ADD KEY `setlists_FK` (`id_live_event`),
  ADD KEY `setlists_FK_1` (`id_band`);

--
-- Indices de la tabla `setlist_sets`
--
ALTER TABLE `setlist_sets`
  ADD PRIMARY KEY (`is_setlist_set`),
  ADD KEY `setlist_sets_FK` (`id_setlist`),
  ADD KEY `setlist_sets_FK_1` (`id_set`);

--
-- Indices de la tabla `setlist_tags`
--
ALTER TABLE `setlist_tags`
  ADD PRIMARY KEY (`id_setlist_tag`),
  ADD KEY `setlist_tags_FK` (`id_setlist`),
  ADD KEY `setlist_tags_FK_1` (`id_tag`);

--
-- Indices de la tabla `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`id_set`);

--
-- Indices de la tabla `set_songs`
--
ALTER TABLE `set_songs`
  ADD PRIMARY KEY (`id_set_songs`),
  ADD KEY `set_songs_FK` (`id_set`),
  ADD KEY `set_songs_FK_1` (`id_song`);

--
-- Indices de la tabla `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id_song`);

--
-- Indices de la tabla `song_tags`
--
ALTER TABLE `song_tags`
  ADD PRIMARY KEY (`id_song_tag`),
  ADD KEY `song_tags_FK` (`id_song`),
  ADD KEY `song_tags_FK_1` (`id_tag`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id_tag`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `users_UN` (`email`,`username`),
  ADD UNIQUE KEY `users_id_user_IDX` (`id_user`) USING BTREE;

--
-- Indices de la tabla `user_history`
--
ALTER TABLE `user_history`
  ADD PRIMARY KEY (`id_user_history`),
  ADD KEY `user_history_FK` (`id_user`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bands`
--
ALTER TABLE `bands`
  MODIFY `id_band` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `band_genres`
--
ALTER TABLE `band_genres`
  MODIFY `id_band_genre` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `band_members`
--
ALTER TABLE `band_members`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `id_genre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT de la tabla `live_designers`
--
ALTER TABLE `live_designers`
  MODIFY `id_live_designer` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `live_events`
--
ALTER TABLE `live_events`
  MODIFY `id_live_event` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `live_event_tags`
--
ALTER TABLE `live_event_tags`
  MODIFY `id_live_event_tags` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `setlists`
--
ALTER TABLE `setlists`
  MODIFY `id_setlist` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sets`
--
ALTER TABLE `sets`
  MODIFY `id_set` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `set_songs`
--
ALTER TABLE `set_songs`
  MODIFY `id_set_songs` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `songs`
--
ALTER TABLE `songs`
  MODIFY `id_song` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `song_tags`
--
ALTER TABLE `song_tags`
  MODIFY `id_song_tag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_history`
--
ALTER TABLE `user_history`
  MODIFY `id_user_history` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bands`
--
ALTER TABLE `bands`
  ADD CONSTRAINT `bands_FK` FOREIGN KEY (`id_user_manager`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `band_genres`
--
ALTER TABLE `band_genres`
  ADD CONSTRAINT `band_genres_FK` FOREIGN KEY (`id_band`) REFERENCES `bands` (`id_band`),
  ADD CONSTRAINT `band_genres_FK_1` FOREIGN KEY (`id_genre`) REFERENCES `genres` (`id_genre`);

--
-- Filtros para la tabla `band_members`
--
ALTER TABLE `band_members`
  ADD CONSTRAINT `band_member_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `band_member_FK_1` FOREIGN KEY (`id_band`) REFERENCES `bands` (`id_band`);

--
-- Filtros para la tabla `live_designers`
--
ALTER TABLE `live_designers`
  ADD CONSTRAINT `live_designer_FK` FOREIGN KEY (`id_user_designer`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `live_designer_FK_1` FOREIGN KEY (`id_band`) REFERENCES `bands` (`id_band`);

--
-- Filtros para la tabla `live_events`
--
ALTER TABLE `live_events`
  ADD CONSTRAINT `live_shows_FK` FOREIGN KEY (`id_band`) REFERENCES `bands` (`id_band`);

--
-- Filtros para la tabla `live_event_tags`
--
ALTER TABLE `live_event_tags`
  ADD CONSTRAINT `live_event_tags_FK` FOREIGN KEY (`id_tag`) REFERENCES `tags` (`id_tag`),
  ADD CONSTRAINT `live_event_tags_FK_1` FOREIGN KEY (`id_live_event`) REFERENCES `live_events` (`id_live_event`);

--
-- Filtros para la tabla `setlists`
--
ALTER TABLE `setlists`
  ADD CONSTRAINT `setlists_FK` FOREIGN KEY (`id_live_event`) REFERENCES `live_events` (`id_live_event`),
  ADD CONSTRAINT `setlists_FK_1` FOREIGN KEY (`id_band`) REFERENCES `bands` (`id_band`);

--
-- Filtros para la tabla `setlist_sets`
--
ALTER TABLE `setlist_sets`
  ADD CONSTRAINT `setlist_sets_FK` FOREIGN KEY (`id_setlist`) REFERENCES `setlists` (`id_setlist`),
  ADD CONSTRAINT `setlist_sets_FK_1` FOREIGN KEY (`id_set`) REFERENCES `sets` (`id_set`);

--
-- Filtros para la tabla `setlist_tags`
--
ALTER TABLE `setlist_tags`
  ADD CONSTRAINT `setlist_tags_FK` FOREIGN KEY (`id_setlist`) REFERENCES `setlists` (`id_setlist`),
  ADD CONSTRAINT `setlist_tags_FK_1` FOREIGN KEY (`id_tag`) REFERENCES `tags` (`id_tag`);

--
-- Filtros para la tabla `set_songs`
--
ALTER TABLE `set_songs`
  ADD CONSTRAINT `set_songs_FK` FOREIGN KEY (`id_set`) REFERENCES `sets` (`id_set`),
  ADD CONSTRAINT `set_songs_FK_1` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`);

--
-- Filtros para la tabla `song_tags`
--
ALTER TABLE `song_tags`
  ADD CONSTRAINT `song_tags_FK` FOREIGN KEY (`id_song`) REFERENCES `songs` (`id_song`),
  ADD CONSTRAINT `song_tags_FK_1` FOREIGN KEY (`id_tag`) REFERENCES `tags` (`id_tag`);

--
-- Filtros para la tabla `user_history`
--
ALTER TABLE `user_history`
  ADD CONSTRAINT `user_history_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
