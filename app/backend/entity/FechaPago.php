<?php

class FechaPago
{
    public $idFechaPago;
    public $fecha;

    public function constructor($idFechaPago, $fecha)
    {
        $this->idFechaPago = $idFechaPago;
        $this->fecha = $fecha;
    }

}