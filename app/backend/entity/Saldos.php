<?php

class Saldos
{

    public $subTotal;
    public $interesPorMora;
    public $otrosConceptos;
    public $saldoAnterior;
    public $totalImporteAPagar;
    public $totalImporteRecibido;
    public $saldoPendiente;
    public $saldoAnteriorSinModificar;

    public function constructor($subTotal, $interesPorMora, $otrosConceptos, $saldoAnterior, $totalImporteAPagar, $totalImporteRecibido, $saldoPendiente, $saldoAnteriorSinModificar)
    {
        $this->subTotal = $subTotal;
        $this->interesPorMora = $interesPorMora;
        $this->otrosConceptos = $otrosConceptos;
        $this->saldoAnterior = $saldoAnterior;
        $this->totalImporteAPagar = $totalImporteAPagar;
        $this->totalImporteRecibido = $totalImporteRecibido;
        $this->saldoPendiente = $saldoPendiente;
        $this->saldoAnteriorSinModificar = $saldoAnteriorSinModificar;
    }

}
