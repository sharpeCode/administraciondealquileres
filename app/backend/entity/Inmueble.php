<?php

class Inmueble
{
    public $idInmueble;
    public $tipo;
    public $torre;
    public $piso;
    public $departamento;
    public $domicilio;
    public $idLocalidad;


    public function constructor($idInmueble,$tipo, $torre, $piso,$departamento,$domicilio,$idLocalidad)
    {
        $this->idInmueble = $idInmueble;
        $this->tipo = $tipo;
        $this->torre = $torre;
        $this->piso = $piso;
        $this->departamento = $departamento;
        $this->domicilio = $domicilio;
        $this->idLocalidad = $idLocalidad;

    }

}
