<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Recibo - Venda #<?php echo $sale->id; ?></title>
    <style>
        body { font-family: 'Courier New', Courier, monospace; font-size: 12px; margin: 0; padding: 10px; width: 300px; color: #000; }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .separator { border-top: 1px dashed #000; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 2px 0; text-align: left; }
        .right { text-align: right; }
        @media print {
            body { width: 100%; padding: 0; margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body onload="window.print()">
    <div class="no-print center" style="margin-bottom: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; font-weight: bold; cursor: pointer;">Imprimir Novamente</button>
    </div>

    <div class="center bold" style="font-size: 16px; margin-bottom: 5px;">MaFê Kids ERP</div>
    <div class="center">CNPJ: 00.000.000/0000-00</div>
    <div class="center">Rua Ficticia, 123 - Centro</div>
    
    <div class="separator"></div>
    
    <div>Data: <?php echo date('d/m/Y H:i', strtotime($sale->created_at)); ?></div>
    <div>Venda Nº: <?php echo str_pad((string)$sale->id, 6, '0', STR_PAD_LEFT); ?></div>
    <div>Cliente: <?php echo htmlspecialchars($clientName); ?></div>
    
    <div class="separator"></div>
    <div class="center bold">CUPOM NÃO FISCAL</div>
    <div class="separator"></div>

    <table>
        <thead>
            <tr class="bold">
                <th>Qtd</th>
                <th>Item</th>
                <th class="right">Total</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($sale->items as $item): ?>
            <tr>
                <td><?php echo $item->quantity; ?>x</td>
                <td><?php echo substr(htmlspecialchars($item->product_name), 0, 15); ?></td>
                <td class="right">R$ <?php echo number_format($item->subtotal, 2, ',', '.'); ?></td>
            </tr>
            <?php end       foreach; ?>
        </tbody>
    </table>

    <div class="separator"></div>

    <table>
        <tr>
            <td>Subtotal:</td>
            <td class="right">R$ <?php echo number_format($sale->total_amount, 2, ',', '.'); ?></td>
        </tr>
        <tr>
            <td>Desconto:</td>
            <td class="right">R$ <?php echo number_format($sale->discount, 2, ',', '.'); ?></td>
        </tr>
        <tr class="bold" style="font-size: 14px;">
            <td>TOTAL:</td>
            <td class="right">R$ <?php echo number_format($sale->final_amount, 2, ',', '.'); ?></td>
        </tr>
    </table>

    <div class="separator"></div>
    
    <div class="center">Pagamento: <?php echo strtoupper(str_replace('_', ' ', $sale->payment_method)); ?></div>
    
    <div class="separator"></div>
    
    <div class="center">Obrigado pela preferência!</div>
    <div class="center">Trocas somente com este cupom (Até 30 dias).</div>
    
</body>
</html>
