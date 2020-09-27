DROP TABLE IF EXISTS anios;

CREATE TABLE `anios` (
  `id_anio` int(11) NOT NULL,
  `anio` int(11) NOT NULL,
  PRIMARY KEY (`id_anio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO anios VALUES("1","2019"),
("2","2020"),
("3","2021"),
("4","2022"),
("5","2023"),
("6","2024"),
("7","2025"),
("8","2026"),
("9","2027"),
("10","2028"),
("11","2029");



DROP TABLE IF EXISTS clientes;

CREATE TABLE `clientes` (
  `dni` varchar(15) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `datos_garante` varchar(255) DEFAULT NULL,
  `domicilio_legal` varchar(100) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO clientes VALUES("22222","Sharpe","Code","15-1111-2222","sharpecode@gmail.com","2020-09-02","1986-07-01","Daniela Acosta Tel 1548755412","Peron 2546, San Miguel","1"),
("31635357","Alejandra","Garcia","1515","ale@gmail.com","2020-09-19","2020-09-19","fdsfds","Sarmiento","1");



DROP TABLE IF EXISTS comprobantes_de_pagos;

CREATE TABLE `comprobantes_de_pagos` (
  `id_comprobante_de_pago` int(11) NOT NULL,
  `numero_comprobante` varchar(5) NOT NULL,
  `fecha_comprobante` date NOT NULL,
  `tipo_comprobante_de_pago` varchar(10) NOT NULL,
  `tipo_recibo` varchar(10) DEFAULT NULL,
  `id_contrato` int(11) NOT NULL,
  `id_registro_de_pago` int(11) NOT NULL,
  `correspondiente_mes` int(11) NOT NULL,
  `correspondiente_anio` int(11) NOT NULL,
  `valor_alquiler` int(11) DEFAULT NULL,
  `valor_expensas` int(11) DEFAULT NULL,
  `valor_gastos_adm` int(11) DEFAULT NULL,
  `valor_deposito` int(11) DEFAULT NULL,
  `cant_cuotas_deposito` int(11) DEFAULT NULL,
  `num_cuota_a_pagar` int(11) DEFAULT NULL,
  `interes_por_mora` int(11) DEFAULT NULL,
  `otros_conceptos` int(11) DEFAULT NULL,
  `saldo_anterior` int(11) DEFAULT NULL,
  `total_importe_a_pagar` int(11) DEFAULT NULL,
  `total_importe_recibido` int(11) DEFAULT NULL,
  `saldo_pendiente` int(11) DEFAULT NULL,
  `saldo_pendiente_sin_modificar` int(11) DEFAULT NULL,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id_comprobante_de_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO comprobantes_de_pagos VALUES("1","00000","0000-00-00","Oficial","","0","0","0","0","","","","","","","","","","","","0","","Inactivo"),
("2","00000","0000-00-00","No Oficial","","0","0","0","0","","","","","","","","","","","","0","","Inactivo"),
("3","00001","2020-09-23","Oficial","Recibo","0","1","9","2020","10000","2000","9000","5000","3","1","19500","0","0","45500","40000","0","5500","Activo"),
("4","00002","2020-09-23","Oficial","Saldo","0","1","9","2020","0","0","0","0","0","0","0","0","0","5500","5500","0","0","Activo"),
("5","00001","2020-09-23","No Oficial","Recibo","0","2","9","2020","3000","0","0","0","0","0","5850","0","0","8850","8850","0","0","Activo");



DROP TABLE IF EXISTS contratos;

CREATE TABLE `contratos` (
  `id_contrato` int(11) NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `dni` varchar(15) NOT NULL,
  `id_inmueble` int(11) DEFAULT NULL,
  `valor_alquiler_oficial` int(11) DEFAULT NULL,
  `valor_alquiler_no_oficial` int(11) DEFAULT NULL,
  `valor_deposito` int(11) DEFAULT NULL,
  `gastos_administrativos` int(11) DEFAULT NULL,
  `valor_expensas` int(11) DEFAULT NULL,
  `cant_cuotas_deposito` int(11) DEFAULT NULL,
  `fecha_pago_inicio` int(11) DEFAULT NULL,
  `fecha_pago_fin` int(11) DEFAULT NULL,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id_contrato`),
  KEY `id_inmueble` (`id_inmueble`),
  CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO contratos VALUES("0","2020-09-19 00:00:00","2022-09-19 00:00:00","31635357","2","10000","3000","15000","9000","2000","3","1","10","Activo");



DROP TABLE IF EXISTS fecha_pago;

CREATE TABLE `fecha_pago` (
  `id_fecha_pago` int(11) NOT NULL,
  `fecha` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_fecha_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO fecha_pago VALUES("1","1"),
("2","2"),
("3","3"),
("4","4"),
("5","5"),
("6","6"),
("7","7"),
("8","8"),
("9","9"),
("10","10"),
("11","11"),
("12","12"),
("13","13"),
("14","14"),
("15","15"),
("16","16"),
("17","17"),
("18","18"),
("19","19"),
("20","20"),
("21","21"),
("22","22"),
("23","23"),
("24","24"),
("25","25"),
("26","26"),
("27","27"),
("28","28"),
("29","29"),
("30","30"),
("31","31");



DROP TABLE IF EXISTS inmuebles;

CREATE TABLE `inmuebles` (
  `id_inmueble` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(10) NOT NULL,
  `torre` varchar(15) DEFAULT NULL,
  `piso` varchar(2) DEFAULT NULL,
  `departamento` varchar(1) DEFAULT NULL,
  `domicilio` varchar(50) NOT NULL,
  `id_localidad` int(11) NOT NULL,
  PRIMARY KEY (`id_inmueble`),
  KEY `id_localidad` (`id_localidad`),
  CONSTRAINT `inmuebles_ibfk_1` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

INSERT INTO inmuebles VALUES("1","Particular","UNO","1","B","Sarmiento 2021","1"),
("2","Comercial","1001","14","k","Peron 1220","1");



DROP TABLE IF EXISTS localidades;

CREATE TABLE `localidades` (
  `id_localidad` int(11) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `cp` varchar(10) DEFAULT NULL,
  `id_provincia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_localidad`),
  KEY `id_provincia` (`id_provincia`),
  CONSTRAINT `localidades_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincias` (`id_provincia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO localidades VALUES("1","San Miguel","1663","1");



DROP TABLE IF EXISTS meses;

CREATE TABLE `meses` (
  `id_mes` int(11) NOT NULL,
  `mes_largo` varchar(10) NOT NULL,
  `mes_corto` varchar(3) NOT NULL,
  PRIMARY KEY (`id_mes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO meses VALUES("1","Enero","Ene"),
("2","Febrero","Feb"),
("3","Marzo","Mar"),
("4","Abril","Abr"),
("5","Mayo","May"),
("6","Junio","Jun"),
("7","Julio","Jul"),
("8","Agosto","Ago"),
("9","Septiembre","Sep"),
("10","Octubre","Oct"),
("11","Noviembre","Nov"),
("12","Diciembre","Dic");



DROP TABLE IF EXISTS porcentaje_de_variables;

CREATE TABLE `porcentaje_de_variables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_variable` int(11) DEFAULT NULL,
  `porcentaje` int(11) NOT NULL,
  `fecha_ingreso` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_variable` (`id_variable`),
  CONSTRAINT `porcentaje_de_variables_ibfk_1` FOREIGN KEY (`id_variable`) REFERENCES `variables` (`id_variable`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

INSERT INTO porcentaje_de_variables VALUES("1","1","10","2020-08-05 00:00:00"),
("2","1","15","2020-08-08 00:00:00");



DROP TABLE IF EXISTS provincias;

CREATE TABLE `provincias` (
  `id_provincia` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id_provincia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO provincias VALUES("1","Buenos Aires"),
("2","Catamarca"),
("3","Chaco"),
("4","Chubut"),
("5","Córdoba"),
("6","Corrientes"),
("7","Entre Ríos"),
("8","Formosa"),
("9","Jujuy"),
("10","La Pampa"),
("11","La Rioja"),
("12","Mendoza"),
("13","Misiones"),
("14","Neuquén"),
("15","Rio Negro"),
("16","Salta"),
("17","San Juan"),
("18","San Luis"),
("19","Santa Cruz"),
("20","Santiago del Estero"),
("21","Tierra del Fuego"),
("22","Tucumán");



DROP TABLE IF EXISTS registros_de_pagos;

CREATE TABLE `registros_de_pagos` (
  `id_registro_de_pago` int(11) NOT NULL,
  `id_comp_por_contrato` int(11) NOT NULL,
  `id_contrato` int(11) NOT NULL,
  `tipo_registro_de_pago` varchar(10) NOT NULL,
  `correspondiente_mes` int(11) NOT NULL,
  `correspondiente_anio` int(11) NOT NULL,
  `valor_alquiler` int(11) DEFAULT NULL,
  `valor_expensas` int(11) DEFAULT NULL,
  `gastos_administrativos` int(11) DEFAULT NULL,
  `valor_deposito` int(11) DEFAULT NULL,
  `cant_cuotas_deposito` int(11) DEFAULT NULL,
  `num_cuota_a_pagar` int(11) DEFAULT NULL,
  `recibo` varchar(2) DEFAULT NULL,
  `saldo_pendiente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_registro_de_pago`),
  KEY `id_contrato` (`id_contrato`),
  CONSTRAINT `registros_de_pagos_ibfk_1` FOREIGN KEY (`id_contrato`) REFERENCES `contratos` (`id_contrato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO registros_de_pagos VALUES("1","1","0","Oficial","9","2020","10000","2000","9000","5000","3","1","Si","0"),
("2","1","0","No Oficial","9","2020","3000","0","0","0","0","0","Si","0"),
("3","2","0","Oficial","10","2020","10000","2000","0","5000","3","2","No","0"),
("4","2","0","No Oficial","10","2020","3000","0","0","0","0","0","No","0"),
("5","3","0","Oficial","11","2020","10000","2000","0","5000","3","3","No","0"),
("6","3","0","No Oficial","11","2020","3000","0","0","0","0","0","No","0"),
("7","4","0","Oficial","12","2020","10000","2000","0","0","0","0","No","0"),
("8","4","0","No Oficial","12","2020","3000","0","0","0","0","0","No","0"),
("9","5","0","Oficial","1","2021","10000","2000","0","0","0","0","No","0"),
("10","5","0","No Oficial","1","2021","3000","0","0","0","0","0","No","0"),
("11","6","0","Oficial","2","2021","10000","2000","0","0","0","0","No","0"),
("12","6","0","No Oficial","2","2021","3000","0","0","0","0","0","No","0"),
("13","7","0","Oficial","3","2021","10000","2000","0","0","0","0","No","0"),
("14","7","0","No Oficial","3","2021","3000","0","0","0","0","0","No","0"),
("15","8","0","Oficial","4","2021","10000","2000","0","0","0","0","No","0"),
("16","8","0","No Oficial","4","2021","3000","0","0","0","0","0","No","0"),
("17","9","0","Oficial","5","2021","10000","2000","0","0","0","0","No","0"),
("18","9","0","No Oficial","5","2021","3000","0","0","0","0","0","No","0"),
("19","10","0","Oficial","6","2021","10000","2000","0","0","0","0","No","0"),
("20","10","0","No Oficial","6","2021","3000","0","0","0","0","0","No","0"),
("21","11","0","Oficial","7","2021","10000","2000","0","0","0","0","No","0"),
("22","11","0","No Oficial","7","2021","3000","0","0","0","0","0","No","0"),
("23","12","0","Oficial","8","2021","10000","2000","0","0","0","0","No","0"),
("24","12","0","No Oficial","8","2021","3000","0","0","0","0","0","No","0"),
("25","13","0","Oficial","9","2021","10000","2000","0","0","0","0","No","0"),
("26","13","0","No Oficial","9","2021","3000","0","0","0","0","0","No","0"),
("27","14","0","Oficial","10","2021","10000","2000","0","0","0","0","No","0"),
("28","14","0","No Oficial","10","2021","3000","0","0","0","0","0","No","0"),
("29","15","0","Oficial","11","2021","10000","2000","0","0","0","0","No","0"),
("30","15","0","No Oficial","11","2021","3000","0","0","0","0","0","No","0"),
("31","16","0","Oficial","12","2021","10000","2000","0","0","0","0","No","0"),
("32","16","0","No Oficial","12","2021","3000","0","0","0","0","0","No","0"),
("33","17","0","Oficial","1","2022","10000","2000","0","0","0","0","No","0"),
("34","17","0","No Oficial","1","2022","3000","0","0","0","0","0","No","0"),
("35","18","0","Oficial","2","2022","10000","2000","0","0","0","0","No","0"),
("36","18","0","No Oficial","2","2022","3000","0","0","0","0","0","No","0"),
("37","19","0","Oficial","3","2022","10000","2000","0","0","0","0","No","0"),
("38","19","0","No Oficial","3","2022","3000","0","0","0","0","0","No","0"),
("39","20","0","Oficial","4","2022","10000","2000","0","0","0","0","No","0"),
("40","20","0","No Oficial","4","2022","3000","0","0","0","0","0","No","0"),
("41","21","0","Oficial","5","2022","10000","2000","0","0","0","0","No","0"),
("42","21","0","No Oficial","5","2022","3000","0","0","0","0","0","No","0"),
("43","22","0","Oficial","6","2022","10000","2000","0","0","0","0","No","0"),
("44","22","0","No Oficial","6","2022","3000","0","0","0","0","0","No","0"),
("45","23","0","Oficial","7","2022","10000","2000","0","0","0","0","No","0"),
("46","23","0","No Oficial","7","2022","3000","0","0","0","0","0","No","0"),
("47","24","0","Oficial","8","2022","10000","2000","0","0","0","0","No","0"),
("48","24","0","No Oficial","8","2022","3000","0","0","0","0","0","No","0");



DROP TABLE IF EXISTS roles;

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(15) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles VALUES("1","Administrador"),
("2","Usuario");



DROP TABLE IF EXISTS usuarios;

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `estado` varchar(8) NOT NULL,
  `fecha_modif_estado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




DROP TABLE IF EXISTS variables;

CREATE TABLE `variables` (
  `id_variable` int(11) NOT NULL,
  `variable` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_variable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO variables VALUES("1","Interés x vencimiento");



