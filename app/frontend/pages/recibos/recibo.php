<head>
    <title>Recibos</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="recibos.css">
    <script src="recibo.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.js"></script>

</head>

<?php
require_once 'listarRecibos.html';
require_once 'visualizarReciboOficial.html';
require_once 'visualizarReciboNoOficial.html';
require_once 'visualizarReciboSaldoOficial.html';
require_once 'visualizarReciboSaldoNoOficial.html';

?>