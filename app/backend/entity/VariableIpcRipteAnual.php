<?php

class VariableIpcRipteAnual
{
    public $idIpc;
    public $porcIntIpcRipteAnual;
    public $fechaIngresoVariable;

    public function constructor($idIpc, $porcIntIpcRipteAnual, $fechaIngresoVariable)
    {
        $this->idIpc = $idIpc;
        $this->porcIntIpcRipteAnual = $porcIntIpcRipteAnual;
        $this->fechaIngresoVariable = $fechaIngresoVariable;
    }

}