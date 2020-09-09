<?php

class Localidad
{
    public $idLocalidad;
    public $localidad;
    public $cp;
    public $idProvincia;


    public function constructor($idLocalidad,$localidad, $cp, $idProvincia)
    {
        $this->idLocalidad = $idLocalidad;
        $this->localidad = $localidad;
        $this->cp = $cp;
        $this->idProvincia = $idProvincia;

    }

}
