<?php
require_once '../entity/Login.php';
require_once 'BaseRepository.php';

class LoginRepositorio
{

    public static function findById($userId)
    {
        $user = null;
        try {
            $sql = "SELECT dni, password 
                        FROM usuarios 
                        WHERE dni = $userId ";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $user = $sentencia->fetchObject("Login");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $user;
    }

}
