<?php

class Count
{
    public $cantidadDeRecibos;
    public $idRegistroDePago;
    public $tipoComprobanteDePago;

    public function constructor($cantidadDeRecibos,$idRegistroDePago,$tipoComprobanteDePago)
    {
        $this->cantidadDeRecibos = $cantidadDeRecibos;
        $this->idRegistroDePago = $idRegistroDePago;
        $this->tipoComprobanteDePago = $tipoComprobanteDePago;

    }

}
