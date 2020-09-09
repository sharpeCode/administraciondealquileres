<?php
require_once '../entity/Inmueble.php';
require_once '../entity/Localidad.php';
require_once 'BaseRepository.php';

class InmuebleRepository
{
    public static function getAllInmuebles()
    {
        $inmuebles = null;
        try {
            $sql = "SELECT I.id_inmueble as idInmueble, I.tipo, I.torre, I.piso, I.departamento, I.domicilio, 
                I.id_localidad as idLocalidad, L.localidad 
                    FROM inmuebles as I
                    INNER JOIN localidades as L 
                    ON I.id_localidad = L.id_localidad";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $inmuebles = $sentencia->fetchAll(PDO::FETCH_CLASS, "Inmueble");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $inmuebles;
    }

    public static function getInmueblesById($idInmueble)
    {
        $inmuebles = null;
        try {
            $sql = "SELECT I.id_inmueble as idInmueble, I.tipo, I.torre, I.piso, I.departamento, I.domicilio, 
                I.id_localidad as idLocalidad, L.localidad 
                    FROM inmuebles as I
                    INNER JOIN localidades as L 
                    ON I.id_localidad = L.id_localidad
                    WHERE I.id_inmueble = $idInmueble ";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $inmuebles = $sentencia->fetchObject("Inmueble");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $inmuebles;
    }

    public static function getLocalidades()
    {
        $localidades = null;
        try {
            $sql = "SELECT id_localidad AS idLocalidad, localidad, cp, id_provincia as idProvincia
                    FROM localidades";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $localidades = $sentencia->fetchAll(PDO::FETCH_CLASS, "Localidad");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $localidades;
    }


    public static function addInmueble($inmueble)
    {
        $inm = null;

        try {
            $sql = "INSERT INTO inmuebles (tipo, torre, piso, departamento, domicilio, id_localidad)
                    VALUES( :tipo, :torre, :piso, :departamento, :domicilio, :id_localidad)";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);

            $sentencia->bindParam(':tipo', $inmueble->tipo, PDO::PARAM_STR);
            $sentencia->bindParam(':torre', $inmueble->torre, PDO::PARAM_STR);
            $sentencia->bindParam(':piso', $inmueble->piso, PDO::PARAM_STR);
            $sentencia->bindParam(':departamento', $inmueble->departamento, PDO::PARAM_STR);
            $sentencia->bindParam(':domicilio', $inmueble->domicilio, PDO::PARAM_STR);
            $sentencia->bindParam(':id_localidad', $inmueble->idLocalidad, PDO::PARAM_INT);

            $sentencia->execute();
            $inm = $sentencia->fetchObject("Inmueble");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $inm = null;
        }
        return $inm;
    }



    public static function editInmueble($inmueble)
    {
        $inm = null;

        try {

            $sql = "UPDATE inmuebles 
                    SET tipo=:tipo, torre=:torre, piso=:piso, departamento=:departamento, 
                    domicilio=:domicilio, id_localidad =:idLocalidad
                    WHERE id_inmueble= '$inmueble->editIdInmueble'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);

            $sentencia->bindParam(':tipo', $inmueble->editTipo, PDO::PARAM_STR);
            $sentencia->bindParam(':torre', $inmueble->editTorre, PDO::PARAM_STR);
            $sentencia->bindParam(':piso', $inmueble->editPiso, PDO::PARAM_INT);
            $sentencia->bindParam(':departamento', $inmueble->editDepartamento, PDO::PARAM_INT);
            $sentencia->bindParam(':domicilio', $inmueble->editDomicilio, PDO::PARAM_INT);
            $sentencia->bindParam(':idLocalidad', $inmueble->editIdlocalidad, PDO::PARAM_INT);

            $sentencia->execute();
            $inm = $sentencia->fetchObject("Inmueble");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $inm = null;
        }
        return $inm;
    }

}
