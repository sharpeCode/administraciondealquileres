<?php

class VariablesIntAnualComercio
{
    public $idInt;
    public $intComercioAnual;
    public $fechaIngresoVariable;

    public function constructor($idInt, $intComercioAnual, $fechaIngresoVariable)
    {
        $this->idInt = $idInt;
        $this->intComercioAnual = $intComercioAnual;
        $this->fechaIngresoVariable = $fechaIngresoVariable;
    }

}