<head>
    <title>Contratos</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="contrato.css">
    <script src="contrato.js"></script>
<!--    <script type="text/javascript" src="jsPDF-master/dist/html2canvas.js"></script>-->
<!--    <script type="text/javascript" src="jsPDF-master/dist/jspdf.min.js"></script>-->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.js"></script>

</head>

<?php
require_once 'contratoList.html';
require_once 'contratoAdd.html';
require_once 'contratoDatosCompletos.html';
require_once 'registroDePagoList.html';
require_once 'ComprobanteDePagoOficial.html';
require_once 'ComprobanteDePagoNoOficial.html';
require_once 'ComprobanteDePagoSaldoOficial.html';
require_once 'ComprobanteDePagoSaldoNoOficial.html';
require_once 'visualizarReciboOficial.html';
require_once 'visualizarReciboOficialCantidadDos.html';
require_once 'visualizarReciboOficialSoloSaldo.html';
require_once 'visualizarReciboNoOficial.html';
require_once 'visualizarReciboNoOficialSoloSaldo.html';


?>