<?php

class VariablePorcentajeImpoNoOficial
{
    public $idPorcentaje;
    public $porcDivisionImporte;
    public $fechaIngresoVariable;

    public function constructor($idPorcentaje, $porcDivisionImporte, $fechaIngresoVariable)
    {
        $this->idPorcentaje = $idPorcentaje;
        $this->porcDivisionImporte = $porcDivisionImporte;
        $this->fechaIngresoVariable = $fechaIngresoVariable;
    }

}