
INSERT INTO `roles` (`id_rol`,`rol`) VALUES (1,'Administrador');
INSERT INTO `roles` (`id_rol`,`rol`) VALUES (2,'Usuario');

INSERT INTO `clientes` (`dni`,`nombres`,`apellidos`,`celular`,`email`, `fecha_registro`,`fecha_nacimiento`,`datos_garante`,`domicilio_legal`,`estado`) 
VALUES ('22222','Sharpe','Code', '15-1111-2222','sharpecode@gmail.com','2020-09-02', '1986-07-01', 'Daniela Acosta Tel 1548755412', 'Peron 2546, San Miguel','1');

INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (1,'Buenos Aires');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (2,'Catamarca');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (3,'Chaco');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (4,'Chubut');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (5,'Córdoba');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (6,'Corrientes');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (7,'Entre Ríos');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (8,'Formosa');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (9,'Jujuy');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (10,'La Pampa');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (11,'La Rioja');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (12,'Mendoza');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (13,'Misiones');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (14,'Neuquén');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (15,'Rio Negro');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (16,'Salta');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (17,'San Juan');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (18,'San Luis');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (19,'Santa Cruz');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (20,'Santiago del Estero');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (21,'Tierra del Fuego');
INSERT INTO `provincias` (`id_provincia`,`nombre`) VALUES (22,'Tucumán');

INSERT INTO `localidades` (`id_localidad`,`localidad`,`cp`,`id_provincia`) VALUES (1,'San Miguel','1663','1');

INSERT INTO `inmuebles` (`tipo`,`torre`,`piso`,`departamento`,`domicilio`,`id_localidad`) VALUES ('Particular','UNO','1','B','Sarmiento 2021',1);

INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (1,'Enero','Ene');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (2,'Febrero','Feb');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (3,'Marzo','Mar');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (4,'Abril','Abr');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (5,'Mayo','May');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (6,'Junio','Jun');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (7,'Julio','Jul');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (8,'Agosto','Ago');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (9,'Septiembre','Sep');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (10,'Octubre','Oct');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (11,'Noviembre','Nov');
INSERT INTO `meses` (`id_mes`,`mes_largo`,`mes_corto`) VALUES (12,'Diciembre','Dic');


INSERT INTO `anios` (`id_anio`,`anio`) VALUES (1,2019);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (2,2020);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (3,2021);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (4,2022);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (5,2023);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (6,2024);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (7,2025);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (8,2026);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (9,2027);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (10,2028);
INSERT INTO `anios` (`id_anio`,`anio`) VALUES (11,2029);


INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (1,1);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (2,2);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (3,3);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (4,4);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (5,5);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (6,6);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (7,7);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (8,8);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (9,9);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (10,10);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (11,11);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (12,12);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (13,13);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (14,14);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (15,15);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (16,16);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (17,17);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (18,18);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (19,19);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (20,20);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (21,21);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (22,22);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (23,23);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (24,24);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (25,25);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (26,26);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (27,27);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (28,28);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (29,29);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (30,30);
INSERT INTO `fecha_pago` (`id_fecha_pago`,`fecha`) VALUES (31,31);


INSERT INTO `variables` (`id_variable`,`variable`) VALUES (1,'Interés x vencimiento');

INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (1,10,'2020-08-05');
INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (1,15,'2020-08-08');

INSERT INTO `comprobantes_de_pagos` (`id_comprobante_de_pago`,`numero_comprobante`,`fecha_comprobante`,`tipo_comprobante_de_pago`,`saldo_pendiente`,`estado`) 
				     VALUES (1,'00000','0000-00-00','Oficial',0,'Inactivo');
INSERT INTO `comprobantes_de_pagos` (`id_comprobante_de_pago`,`numero_comprobante`,`fecha_comprobante`,`tipo_comprobante_de_pago`,`saldo_pendiente`,`estado`) 
				     VALUES (2,'00000','0000-00-00','No Oficial',0,'Inactivo');
