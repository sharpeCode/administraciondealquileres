CREATE DATABASE db_administracion_de_alquileres;

USE db_administracion_de_alquileres;

CREATE TABLE roles(
	id_rol INT NOT NULL,
	rol VARCHAR(15) NOT NULL,
	PRIMARY KEY(id_rol)
);


CREATE TABLE usuarios(
	id_usuario INT NOT NULL,	
	nombres VARCHAR(30) NOT NULL,
	apellidos VARCHAR(30) NOT NULL,
	dni VARCHAR(15) NOT NULL,
	id_rol INT NOT NULL,
	password VARCHAR(200),
	fecha_registro DATETIME,
	estado VARCHAR(8) NOT NULL,    #Activo - Inactivo - Baja
	fecha_modif_estado DATETIME,
	PRIMARY KEY (id_usuario),
	FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
);

CREATE TABLE clientes(
	dni VARCHAR(15) NOT NULL,
	nombres VARCHAR(30) NOT NULL,
	apellidos VARCHAR(30) NOT NULL,
	celular VARCHAR(15),
	email VARCHAR(30),
	fecha_registro DATE,
	fecha_nacimiento DATE,
	datos_garante VARCHAR (255),
	domicilio_legal VARCHAR (100),
	estado CHAR,
	PRIMARY KEY (dni)
);

CREATE TABLE provincias(
	id_provincia INT NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	PRIMARY KEY (id_provincia)
);

CREATE TABLE localidades(
	id_localidad INT NOT NULL,	
	localidad VARCHAR(50) NOT NULL,
	cp VARCHAR(10),
	id_provincia INT,
	PRIMARY KEY(id_localidad),
	FOREIGN KEY (id_provincia) REFERENCES provincias (id_provincia)
);


CREATE TABLE inmuebles(
	id_inmueble INT NOT NULL AUTO_INCREMENT,
	tipo VARCHAR(10) NOT NULL, # Particular - Comercial
	torre VARCHAR(15),
	piso VARCHAR(2),
	departamento VARCHAR(1),
	domicilio VARCHAR(50) NOT NULL,
	id_localidad INT NOT NULL,
	PRIMARY KEY(id_inmueble),
	FOREIGN KEY (id_localidad) REFERENCES localidades (id_localidad)
);

CREATE TABLE variables(
	id_variable INT NOT NULL,
	variable VARCHAR(30),
	PRIMARY KEY (id_variable)
);

CREATE TABLE porcentaje_de_variables(
	id INT NOT NULL AUTO_INCREMENT,
	id_variable INT,
	porcentaje INT NOT NULL,
	fecha_ingreso DATETIME,
	PRIMARY KEY (id),
	FOREIGN KEY (id_variable) REFERENCES variables (id_variable)	
);

CREATE TABLE meses(
	id_mes INT NOT NULL,
	mes_largo VARCHAR(10) NOT NULL,
	mes_corto VARCHAR(3) NOT NULL,
	PRIMARY KEY(id_mes)
);

CREATE TABLE anios(
	id_anio INT NOT NULL,
	anio INT NOT NULL,
	PRIMARY KEY(id_anio)
);

CREATE TABLE contratos(
	id_contrato INT NOT NULL,
	fecha_inicio DATETIME,
	fecha_fin DATETIME,
	dni VARCHAR(15) NOT NULL,
	id_inmueble INT,
	valor_alquiler_oficial INT,
	valor_alquiler_no_oficial INT,
	valor_deposito INT,
	gastos_administrativos INT,
	valor_expensas INT,
	cant_cuotas_deposito INT,
	fecha_pago_inicio INT, #solo se agrega la fecha ejemplo 1
	fecha_pago_fin INT, #solo se agrega la fecha ejemplo 10
	PRIMARY KEY(id_contrato),
	FOREIGN KEY (id_inmueble) REFERENCES inmuebles (id_inmueble)
);

CREATE TABLE registros_de_pagos(
	id_registro_de_pago INT NOT NULL,
	id_comp_por_contrato INT NOT NULL,
	id_contrato INT NOT NULL,
	tipo_registro_de_pago VARCHAR(10) NOT NULL,                            # Oficial - No Oficial
	correspondiente_mes INT NOT NULL,
	correspondiente_anio INT NOT NULL,
	valor_alquiler INT,
	valor_expensas INT,
	gastos_administrativos INT,
	valor_deposito INT,
	cant_cuotas_deposito INT,
	num_cuota_a_pagar INT,
	recibo VARCHAR(2),
	saldo_pendiente INT,
	PRIMARY KEY(id_registro_de_pago),
	FOREIGN KEY(id_contrato) REFERENCES contratos (id_contrato)
);


# RECIBOS
CREATE TABLE comprobantes_de_pagos(
	id_comprobantes_de_pago INT NOT NULL,
	numero_comprobante VARCHAR(5) NOT NULL,
	fecha_comprobante DATE NOT NULL,
	tipo_comprobante_de_pago VARCHAR(10) NOT NULL,                            # Oficial - No Oficial
	tipo_recibo VARCHAR(10),                                                 # Recibo - Saldo
	id_contrato INT NOT NULL,
	id_registro_de_pago INT NOT NULL,
	correspondiente_mes INT NOT NULL,
	correspondiente_anio INT NOT NULL,
	valor_alquiler INT,
	valor_expensas INT,
	valor_gastos_adm INT,
	valor_deposito INT,
	cant_cuotas_deposito INT,
	num_cuota_a_pagar INT,
	interes_por_mora INT,
	otros_conceptos INT,
	saldo_anterior INT,
	total_importe_a_pagar INT,
	total_importe_recibido INT,
	saldo_pendiente INT,                         #este campo se pondria en cero cuando sea abonado
	saldo_pendiente_sin_modificar INT,           #este campo queda guardo para que se refleje en el recibo de solo lectura
	PRIMARY KEY(id_comprobantes_de_pago) 
);

CREATE TABLE fecha_pago(
	id_fecha_pago INT NOT NULL,
	fecha INT,
	PRIMARY KEY(id_fecha_pago)
);




