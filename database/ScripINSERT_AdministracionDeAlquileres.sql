
INSERT INTO `roles` (`rol`) VALUES ('Administrador');
INSERT INTO `roles` (`rol`) VALUES ('Usuario');

INSERT INTO `usuarios` (`nombres`,`apellidos`,`dni`,`id_rol`,`password`, `fecha_registro`, `estado`,`fecha_modif_estado`) 
VALUES ('Nombre Prueba','Apellido Prueba','11111', 1,'123', NOW(), 'Activo','0000-00-00');

INSERT INTO `clientes` (`dni`,`nombres`,`apellidos`,`celular`,`email`, `fecha_registro`,`fecha_nacimiento`,`datos_garante`,`domicilio_legal`,`estado`) 
VALUES ('22222','Sharpe','Code', '15-1111-2222','sharpecode@gmail.com','2020-09-02', '1986-07-01', 'Daniela Acosta Tel 1548755412', 'Peron 2546, San Miguel','1');

INSERT INTO `provincias` (`nombre`) VALUES ('Buenos Aires');
INSERT INTO `provincias` (`nombre`) VALUES ('Catamarca');
INSERT INTO `provincias` (`nombre`) VALUES ('Chaco');
INSERT INTO `provincias` (`nombre`) VALUES ('Chubut');
INSERT INTO `provincias` (`nombre`) VALUES ('Córdoba');
INSERT INTO `provincias` (`nombre`) VALUES ('Corrientes');
INSERT INTO `provincias` (`nombre`) VALUES ('Entre Ríos');
INSERT INTO `provincias` (`nombre`) VALUES ('Formosa');
INSERT INTO `provincias` (`nombre`) VALUES ('Jujuy');
INSERT INTO `provincias` (`nombre`) VALUES ('La Pampa');
INSERT INTO `provincias` (`nombre`) VALUES ('La Rioja');
INSERT INTO `provincias` (`nombre`) VALUES ('Mendoza');
INSERT INTO `provincias` (`nombre`) VALUES ('Misiones');
INSERT INTO `provincias` (`nombre`) VALUES ('Neuquén');
INSERT INTO `provincias` (`nombre`) VALUES ('Rio Negro');
INSERT INTO `provincias` (`nombre`) VALUES ('Salta');
INSERT INTO `provincias` (`nombre`) VALUES ('San Juan');
INSERT INTO `provincias` (`nombre`) VALUES ('San Luis');
INSERT INTO `provincias` (`nombre`) VALUES ('Santa Cruz');
INSERT INTO `provincias` (`nombre`) VALUES ('Santiago del Estero');
INSERT INTO `provincias` (`nombre`) VALUES ('Tierra del Fuego');
INSERT INTO `provincias` (`nombre`) VALUES ('Tucumán');

INSERT INTO `localidades` (`localidad`,`cp`,`id_provincia`) VALUES ('San Miguel','1663','1');
INSERT INTO `localidades` (`localidad`,`cp`,`id_provincia`) VALUES ('Bella Vista','1661','1');
INSERT INTO `localidades` (`localidad`,`cp`,`id_provincia`) VALUES ('Muñiz','1662','1');
INSERT INTO `localidades` (`localidad`,`cp`,`id_provincia`) VALUES ('Moreno','1744','1');
INSERT INTO `localidades` (`localidad`,`cp`,`id_provincia`) VALUES ('Lujan','6700','1');

INSERT INTO `inmuebles` (`tipo`,`torre`,`piso`,`departamento`,`domicilio`,`id_localidad`) VALUES ('Particular','UNO','1','B','Sarmiento 2021',1);


INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Enero','Ene');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Febrero','Feb');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Marzo','Mar');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Abril','Abr');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Mayo','May');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Junio','Jun');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Julio','Jul');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Agosto','Ago');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Septiembre','Sep');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Octubre','Oct');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Noviembre','Nov');
INSERT INTO `meses` (`mes_largo`,`mes_corto`) VALUES ('Diciembre','Dic');


INSERT INTO `anios` (`anio`) VALUES (2019);
INSERT INTO `anios` (`anio`) VALUES (2020);
INSERT INTO `anios` (`anio`) VALUES (2021);
INSERT INTO `anios` (`anio`) VALUES (2022);
INSERT INTO `anios` (`anio`) VALUES (2023);
INSERT INTO `anios` (`anio`) VALUES (2024);
INSERT INTO `anios` (`anio`) VALUES (2025);
INSERT INTO `anios` (`anio`) VALUES (2026);
INSERT INTO `anios` (`anio`) VALUES (2027);
INSERT INTO `anios` (`anio`) VALUES (2028);
INSERT INTO `anios` (`anio`) VALUES (2029);


INSERT INTO `fecha_pago` (`fecha`) VALUES (1);
INSERT INTO `fecha_pago` (`fecha`) VALUES (2);
INSERT INTO `fecha_pago` (`fecha`) VALUES (3);
INSERT INTO `fecha_pago` (`fecha`) VALUES (4);
INSERT INTO `fecha_pago` (`fecha`) VALUES (5);
INSERT INTO `fecha_pago` (`fecha`) VALUES (6);
INSERT INTO `fecha_pago` (`fecha`) VALUES (7);
INSERT INTO `fecha_pago` (`fecha`) VALUES (8);
INSERT INTO `fecha_pago` (`fecha`) VALUES (9);
INSERT INTO `fecha_pago` (`fecha`) VALUES (10);
INSERT INTO `fecha_pago` (`fecha`) VALUES (11);
INSERT INTO `fecha_pago` (`fecha`) VALUES (12);
INSERT INTO `fecha_pago` (`fecha`) VALUES (13);
INSERT INTO `fecha_pago` (`fecha`) VALUES (14);
INSERT INTO `fecha_pago` (`fecha`) VALUES (15);
INSERT INTO `fecha_pago` (`fecha`) VALUES (16);
INSERT INTO `fecha_pago` (`fecha`) VALUES (17);
INSERT INTO `fecha_pago` (`fecha`) VALUES (18);
INSERT INTO `fecha_pago` (`fecha`) VALUES (19);
INSERT INTO `fecha_pago` (`fecha`) VALUES (20);
INSERT INTO `fecha_pago` (`fecha`) VALUES (21);
INSERT INTO `fecha_pago` (`fecha`) VALUES (22);
INSERT INTO `fecha_pago` (`fecha`) VALUES (23);
INSERT INTO `fecha_pago` (`fecha`) VALUES (24);
INSERT INTO `fecha_pago` (`fecha`) VALUES (25);
INSERT INTO `fecha_pago` (`fecha`) VALUES (26);
INSERT INTO `fecha_pago` (`fecha`) VALUES (27);
INSERT INTO `fecha_pago` (`fecha`) VALUES (28);
INSERT INTO `fecha_pago` (`fecha`) VALUES (29);
INSERT INTO `fecha_pago` (`fecha`) VALUES (30);
INSERT INTO `fecha_pago` (`fecha`) VALUES (31);


INSERT INTO `variables` (`variable`) VALUES ('IPS/RIPTE');
INSERT INTO `variables` (`variable`) VALUES ('Interés anual-Comercio');
INSERT INTO `variables` (`variable`) VALUES ('Interés x vencimiento');
INSERT INTO `variables` (`variable`) VALUES ('Porcentaje de importe No oficial');

INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (1,10,'2020-08-05');
INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (1,15,'2020-08-08');

INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (2,10,'2020-08-05');
INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (2,15,'2020-08-08');

INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (3,10,'2020-08-05');
INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (3,15,'2020-08-08');

INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (4,10,'2020-08-05');
INSERT INTO `porcentaje_de_variables` (`id_variable`,`porcentaje`,`fecha_ingreso`) VALUES (4,15,'2020-08-08');

INSERT INTO `comprobantes_de_pagos` (`numero_comprobante`,`fecha_comprobante`,`tipo_comprobante_de_pago`,`saldo_pendiente`) 
				     VALUES ('00000','0000-00-00','Oficial',0);
INSERT INTO `comprobantes_de_pagos` (`numero_comprobante`,`fecha_comprobante`,`tipo_comprobante_de_pago`,`saldo_pendiente`) 
				     VALUES ('00000','0000-00-00','No Oficial',0);

