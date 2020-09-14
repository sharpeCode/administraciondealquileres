<?php
require_once '../entity/Cliente.php';
require_once 'BaseRepository.php';

class ClienteRepository
{
    public static function listarClientes()
    {
        $locatarios = null;
        try {
            $sql = "SELECT nombres, apellidos, dni, celular, email, fecha_nacimiento fechaNacimiento, fecha_registro as fechaRegistro,
                        datos_garante datosGarante, domicilio_legal domicilioLegal
                        FROM clientes WHERE estado = '1'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $locatarios = $sentencia->fetchAll(PDO::FETCH_CLASS, "Cliente");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $locatarios;
    }

    public static function guardarClienteNuevo($clienteObject)
    {
        $cliente = null;
        $estado = "1";
        try {

            $sql = "INSERT INTO clientes (dni, nombres, apellidos, celular, email, fecha_registro, fecha_nacimiento, datos_garante, domicilio_legal, estado)
                    VALUES(:dni, :nombres, :apellidos, :celular, :email, NOW(), :fecha_nacimiento, :datos_garante, :domicilio_legal,:estado)";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->bindParam(':dni', $clienteObject->dni, PDO::PARAM_STR);
            $sentencia->bindParam(':nombres', $clienteObject->nombres, PDO::PARAM_INT);
            $sentencia->bindParam(':apellidos', $clienteObject->apellidos, PDO::PARAM_INT);
            $sentencia->bindParam(':celular', $clienteObject->celular, PDO::PARAM_INT);
            $sentencia->bindParam(':email', $clienteObject->email, PDO::PARAM_INT);
            $sentencia->bindParam(':fecha_nacimiento', $clienteObject->fechaNacimiento, PDO::PARAM_INT);
            $sentencia->bindParam(':datos_garante', $clienteObject->datosGarante, PDO::PARAM_STR);
            $sentencia->bindParam(':domicilio_legal', $clienteObject->domicilioLegal, PDO::PARAM_STR);
            $sentencia->bindParam(':estado', $estado, PDO::PARAM_STR);

            $sentencia->execute();
            $cliente = $sentencia->fetchObject("Cliente");

        } catch (PDOException $ex) {
            $cliente = null;
        }
        return $cliente;

    }

    public static function traerClientesFiltradoPorDni($dni)
    {
        $clientes = null;

        try
        {
            if ($dni <> "") {

                $sql = "SELECT nombres, apellidos, dni, celular, email, fecha_nacimiento fechaNacimiento, fecha_registro as fechaRegistro,
                        datos_garante datosGarante, domicilio_legal domicilioLegal
                        FROM clientes
                        WHERE dni = $dni";

                $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
                $sentencia->execute();
                $clientes = $sentencia-> fetchAll(PDO::FETCH_CLASS, "Cliente");

            } else {
                $sql = "SELECT nombres, apellidos, dni, celular, email, fecha_nacimiento fechaNacimiento, fecha_registro as fechaRegistro,
                        datos_garante datosGarante, domicilio_legal domicilioLegal
                        FROM clientes";

                $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
                $sentencia->execute();
                $clientes = $sentencia-> fetchAll(PDO::FETCH_CLASS, "Cliente");
            }


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $clientes;
    }

    public static function traerClienteParaEditar($dni)
    {
        $clientes = null;

        try
        {
            if ($dni <> "") {

                $sql = "SELECT nombres, apellidos, dni, celular, email, fecha_nacimiento fechaNacimiento, fecha_registro as fechaRegistro,
                        datos_garante datosGarante, domicilio_legal domicilioLegal
                        FROM clientes
                        WHERE dni = $dni";

                $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
                $sentencia->execute();
                $clientes = $sentencia-> fetchObject("Cliente");

            } else {
                $sql = "SELECT nombres, apellidos, dni, celular, email, fecha_nacimiento fechaNacimiento, fecha_registro as fechaRegistro, datos_garante datosGarante
                        FROM clientes";

                $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
                $sentencia->execute();
                $clientes = $sentencia-> fetchObject("Cliente");
            }


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $clientes;
    }

    public static function traerClientesFiltradoPorNombre($nombre)
    {
        $clientes = null;
        try {
            if ($nombre <> "") {

                $sql = "SELECT nombres, apellidos, dni, celular, email, fecha_nacimiento fechaNacimiento, fecha_registro as fechaRegistro,
                        datos_garante datosGarante, domicilio_legal domicilioLegal
                        FROM clientes
                        WHERE nombres like '%$nombre%'";

                $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
                $sentencia->execute();
                $clientes = $sentencia->fetchAll(PDO::FETCH_CLASS, "Cliente");

            } else {
                $sql = "SELECT nombres, apellidos, dni, celular, email, fecha_nacimiento fechaNacimiento, fecha_registro as fechaRegistro,
                        datos_garante datosGarante, domicilio_legal domicilioLegal
                        FROM clientes";

                $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
                $sentencia->execute();
                $clientes = $sentencia->fetchAll(PDO::FETCH_CLASS, "Cliente");
            }


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $clientes;
    }

    public static function cargarSelectConClientes()
    {
        $clientes = null;
        try {
            $sql = "SELECT dni, nombres, apellidos 
                        FROM clientes";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $clientes = $sentencia->fetchAll(PDO::FETCH_CLASS, "Cliente");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $clientes;

    }

    public static function guardarClienteEditado($clienteObject)
    {
        $cliente = null;
        $estado = "1";
        try {
            $sql = "UPDATE clientes 
                    SET nombres=:nombres, apellidos=:apellidos, celular=:celular, email=:email, 
                    fecha_nacimiento=:fecha_nacimiento, datos_garante=:datos_garante, estado=:estado, domicilio_legal=:domicilio_legal
                    WHERE dni = '$clienteObject->editDni'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->bindParam(':nombres', $clienteObject->editNombres, PDO::PARAM_STR);
            $sentencia->bindParam(':apellidos', $clienteObject->editApellidos, PDO::PARAM_STR);
            $sentencia->bindParam(':celular', $clienteObject->editCelular, PDO::PARAM_STR);
            $sentencia->bindParam(':email', $clienteObject->editEmail, PDO::PARAM_STR);
            $sentencia->bindParam(':fecha_nacimiento', $clienteObject->editFechaNacimiento, PDO::PARAM_STR);
            $sentencia->bindParam(':datos_garante', $clienteObject->editDatosGarante, PDO::PARAM_STR);
            $sentencia->bindParam(':domicilio_legal', $clienteObject->editDomicilioLegal, PDO::PARAM_STR);
            $sentencia->bindParam(':estado',$estado , PDO::PARAM_STR);

            $sentencia->execute();
            $cliente = $sentencia->fetchObject("Cliente");

        } catch (PDOException $ex) {
            $cliente = null;
        }
        return $cliente;

    }

    public static function eliminarCliente($dni)
    {
        $cliente = null;
        $estado = "0";
        try {

            $sql = "UPDATE clientes SET estado=:estado
                    WHERE dni = '$dni'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->bindParam(':estado',$estado , PDO::PARAM_STR);

            $sentencia->execute();
            $cliente = $sentencia->fetchObject("Cliente");

        } catch (PDOException $ex) {
            $cliente = null;
        }
        return $cliente;

    }

}