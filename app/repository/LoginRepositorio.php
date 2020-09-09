<?php
require_once '../entity/Login.php';
require_once 'BaseRepository.php';

class LoginRepositorio
{

    public static function findById($userId)
    {
        $user = null;
        try {
            $sql = "SELECT nombre_completo nombreCompleto , dni, fecha_nacimiento, sexo, estatura, domicilio, localidad, cp, 
                    provincia, celular, email, id_rol idRol, fecha_ingreso fechaIngreso, 
                    password, fecha_registro, estado 
                        FROM usuarios 
                        WHERE id_usuario = $userId ";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $user = $sentencia->fetchObject("Usuario");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $user;
    }

}
