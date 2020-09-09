<?php
require_once '../entity/Localidad.php';
require_once '../entity/Provincia.php';
require_once 'BaseRepository.php';

class LocalidadesRepositorio
{

    public static function listarLocalidades()
    {
        $localidad = null;
        try {
            $sql = "SELECT L.id_localidad AS idLocalidad, L.localidad, L.cp, P.id_provincia as idProvincia, P.nombre
                        FROM localidades L INNER JOIN provincias P 
                        ON L.id_provincia = P.id_provincia";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $localidad = $sentencia->fetchAll(PDO::FETCH_CLASS, "Localidad");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $localidad;
    }

    public static function cargarSelectConPcias()
    {
        $provincias = null;
        try {
            $sql = "SELECT id_provincia as idProvincia, nombre 
                        FROM provincias";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $provincias = $sentencia->fetchAll(PDO::FETCH_CLASS, "Provincia");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $provincias;

    }

    public static function guardarLocalidadNueva($localidad)
    {
        $loc = null;
        try {
            $sql = "INSERT INTO localidades (localidad, cp, id_provincia)
                    VALUES(:localidad, :cp, :id_provincia)";


            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->bindParam(':localidad', $localidad->localidad, PDO::PARAM_STR);
            $sentencia->bindParam(':cp', $localidad->cp, PDO::PARAM_STR);
            $sentencia->bindParam(':id_provincia', $localidad->idProvincia, PDO::PARAM_INT);

            $sentencia->execute();
            $loc = $sentencia->fetchObject("Localidad");

        } catch (PDOException $ex) {
            $loc = null;
        }
        return $loc;

    }

    public static function buscarLocalidadPorId($idLocalidad)
    {
        $loc = null;
        try {
            $sql = "SELECT L.id_localidad AS idLocalidad, L.localidad, L.cp, P.id_provincia AS idProvincia, P.nombre
                        FROM localidades L INNER JOIN provincias P 
                        ON L.id_provincia = P.id_provincia
                        WHERE L.id_localidad = $idLocalidad ";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $loc = $sentencia->fetchObject("Localidad");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $loc = null;
        }
        return $loc;

    }

    public static function guardarLocalidadEditada($localidad)
    {
        $loc = null;

        try {

            $sql = "UPDATE localidades 
                    SET localidad=:localidad, cp=:cp, id_provincia=:id_provincia
                    WHERE id_localidad= '$localidad->editIdLocalidad'";

            var_dump($sql);

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);

            $sentencia->bindParam(':localidad', $localidad->editLocalidad, PDO::PARAM_STR);
            $sentencia->bindParam(':cp', $localidad->editCp, PDO::PARAM_STR);
            $sentencia->bindParam(':id_provincia', $localidad->editIdProvincia, PDO::PARAM_INT);


            $sentencia->execute();
            $loc = $sentencia->fetchObject("Localidad");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $loc = null;
        }

        return $loc;
    }

    public static function buscarIdProvincia($provincia)
    {
        $prov = null;
        try {
            $sql = "SELECT id_provincia AS idProvincia, nombre FROM provincias
                        WHERE id_provincia = $provincia ";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $prov = $sentencia->fetchObject("Provincia");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $prov = null;
        }
        return $prov;

    }

    public static function eliminarLocalidad($idLocalidad)
    {
        $prov = false;
        try {
            $sql = "DELETE FROM localidades
                        WHERE id_localidad = $idLocalidad ";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $prov = $sentencia->fetchObject("Provincia");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $prov = false;
        }
        return $prov;

    }

    public static function buscarLocalidadPorNombreYcp($localidad)
    {

        try {
            $sql = "SELECT id_localidad AS idLocalidad, localidad, cp, id_provincia AS idProvincia
                        FROM localidades
                        WHERE localidad = '$localidad->localidad' AND cp = '$localidad->cp'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $local = $sentencia->fetchObject("Localidad");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            //$local = null;
        }
        return $local;

    }

}