<?php


class PorcentajeDeVariable
{
    public $id;
    public $idVariable;
    public $porcentaje;
    public $fecha;

    public function constructor($id, $idVariable, $porcentaje, $fecha)
    {
        $this->id = $id;
        $this->idVariable = $idVariable;
        $this->porcentaje = $porcentaje;
        $this->fecha = $fecha;
    }
}