<?php

class Mes
{
    public $idMes;
    public $mesLargo;
    public $mesCorto;

    public function constructor($idMes,$mesLargo, $mesCorto)
    {
        $this->idMes = $idMes;
        $this->mesLargo = $mesLargo;
        $this->mesCorto = $mesCorto;

    }

}
