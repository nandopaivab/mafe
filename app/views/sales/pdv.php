<?php
global $currentUser;
$userName = $currentUser->name ?? 'Administrador';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDV - MaFê Kids</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --bg: #f3f4f6;
            --sidebar: #1e1e2d;
        }
        body { background: var(--bg); font-family: 'Inter', sans-serif; overflow: hidden; height: 100vh; }
        
        /* Layout Full Screen */
        .pdv-wrapper { display: flex; height: 100vh; }
        
        /* Side Navigation Minimalista */
        .pdv-nav { width: 80px; background: var(--sidebar); display: flex; flex-direction: column; align-items: center; padding: 20px 0; }
        .pdv-nav a { color: #9ca3af; text-decoration: none; font-size: 1.5rem; margin-bottom: 30px; transition: 0.2s; }
        .pdv-nav a:hover, .pdv-nav a.active { color: white; }
        
        /* Área Principal */
        .pdv-main { flex-grow: 1; display: flex; flex-direction: column; padding: 20px; }
        
        /* Header Topo */
        .pdv-header { background: white; border-radius: 12px; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px; }
        
        /* Colunas de Venda */
        .pdv-content { display: flex; gap: 20px; flex-grow: 1; overflow: hidden; }
        
        /* Lista de Produtos (Esquerda) */
        .cart-section { flex: 2; background: white; border-radius: 12px; display: flex; flex-direction: column; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .cart-search { padding: 20px; border-bottom: 1px solid #e5e7eb; }
        .cart-search input { font-size: 1.2rem; padding: 12px 20px; border-radius: 10px; border: 2px solid #e5e7eb; background: #f9fafb; }
        .cart-search input:focus { border-color: var(--primary); outline: none; box-shadow: none; background: white; }
        
        .cart-items { flex-grow: 1; overflow-y: auto; padding: 0; margin: 0; list-style: none; }
        .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; border-bottom: 1px solid #f3f4f6; transition: 0.2s; }
        .cart-item:hover { background: #f8fafc; }
        .cart-item-title { font-weight: 600; color: #1f2937; font-size: 1.1rem; }
        .cart-item-sku { font-size: 0.8rem; color: #9ca3af; }
        .cart-item-price { font-weight: 700; color: #10b981; }
        .qty-btn { background: #e5e7eb; border: none; width: 30px; height: 30px; border-radius: 5px; font-weight: bold; cursor: pointer; }
        
        /* Checkout Resumo (Direita) */
        .checkout-section { flex: 1; background: white; border-radius: 12px; display: flex; flex-direction: column; box-shadow: 0 2px 4px rgba(0,0,0,0.02); overflow: hidden; }
        .checkout-header { padding: 20px; border-bottom: 1px solid #e5e7eb; background: #fafafa; }
        
        .checkout-body { padding: 20px; flex-grow: 1; overflow-y: auto; }
        .payment-method { border: 2px solid #e5e7eb; border-radius: 10px; padding: 15px; cursor: pointer; margin-bottom: 10px; text-align: center; font-weight: 600; color: #4b5563; transition: 0.2s; }
        .payment-method:hover { border-color: var(--primary); background: #f5f3ff; }
        .payment-method.selected { border-color: var(--primary); background: var(--primary); color: white; }
        
        .checkout-footer { padding: 20px; background: #1f2937; color: white; }
        .total-row { display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: 800; margin-bottom: 15px; }
        .btn-finish { background: #10b981; color: white; border: none; border-radius: 10px; width: 100%; padding: 15px; font-size: 1.2rem; font-weight: 700; transition: 0.2s; }
        .btn-finish:hover { background: #059669; }
        
        /* Scrollbar custom */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    </style>
</head>
<body>

    <div class="pdv-wrapper">
        <!-- Minified Sidebar -->
        <nav class="pdv-nav">
            <a href="/" title="Voltar ao Dashboard"><i class="fa-solid fa-house"></i></a>
            <a href="/clientes" title="Clientes"><i class="fa-solid fa-users"></i></a>
            <a href="/produtos" title="Produtos"><i class="fa-solid fa-box-open"></i></a>
            <a href="/vendas" class="active" title="PDV"><i class="fa-solid fa-cart-shopping"></i></a>
        </nav>

        <!-- Main Area -->
        <main class="pdv-main">
            <!-- Topo -->
            <header class="pdv-header">
                <div class="d-flex align-items-center">
                    <i class="fa-solid fa-child-reaching text-primary fs-3 me-3"></i>
                    <div>
                        <h4 class="m-0 fw-bold">Caixa Livre</h4>
                        <small class="text-muted">Op. <?php echo htmlspecialchars($userName); ?></small>
                    </div>
                </div>
                <div id="clock" class="fw-bold text-muted fs-5">00:00</div>
            </header>

            <!-- PDV Grid -->
            <div class="pdv-content">
                
                <!-- Coluna Esquerda: Carrinho -->
                <div class="cart-section">
                    <div class="cart-search">
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0"><i class="fa-solid fa-barcode text-primary"></i></span>
                            <input type="text" id="barcodeInput" class="form-control border-start-0" placeholder="Biper o código de barras ou digite o nome/SKU (Enter)" autocomplete="off">
                        </div>
                    </div>
                    
                    <ul class="cart-items" id="cartList">
                        <!-- Itens do carrinho aparecerão aqui via JS -->
                        <div class="text-center text-muted mt-5 pt-5">
                            <i class="fa-solid fa-cart-arrow-down fs-1 mb-3 opacity-25"></i>
                            <h5>Carrinho Vazio</h5>
                            <p>Bipe um produto para começar a venda.</p>
                        </div>
                    </ul>
                </div>

                <!-- Coluna Direita: Pagamento -->
                <div class="checkout-section">
                    <div class="checkout-header">
                        <label class="form-label text-muted small fw-bold">Cliente (Opcional)</label>
                        <select id="clientSelect" class="form-select border-0 shadow-sm">
                            <option value="">Consumidor Final</option>
                            <?php foreach($clients as $c): ?>
                                <option value="<?php echo $c->id; ?>"><?php echo htmlspecialchars($c->name); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <div class="checkout-body">
                        <h6 class="text-muted fw-bold mb-3">Forma de Pagamento</h6>
                        <div class="row g-2">
                            <div class="col-6">
                                <div class="payment-method selected" data-method="dinheiro" onclick="PdvManager.selectPayment(this)">
                                    <i class="fa-solid fa-money-bill-wave d-block fs-3 mb-2"></i> Dinheiro
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="payment-method" data-method="pix" onclick="PdvManager.selectPayment(this)">
                                    <i class="fa-brands fa-pix d-block fs-3 mb-2"></i> PIX
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="payment-method" data-method="cartao_credito" onclick="PdvManager.selectPayment(this)">
                                    <i class="fa-regular fa-credit-card d-block fs-3 mb-2"></i> Crédito
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="payment-method" data-method="cartao_debito" onclick="PdvManager.selectPayment(this)">
                                    <i class="fa-solid fa-credit-card d-block fs-3 mb-2"></i> Débito
                                </div>
                            </div>
                        </div>

                        <div class="mt-4">
                            <label class="form-label text-muted small fw-bold">Desconto (R$)</label>
                            <input type="number" id="discountInput" class="form-control text-end fw-bold" value="0.00" step="0.01" onchange="PdvManager.updateTotals()">
                        </div>
                    </div>

                    <div class="checkout-footer">
                        <div class="d-flex justify-content-between text-muted mb-2">
                            <span>Subtotal:</span>
                            <span id="lblSubtotal">R$ 0,00</span>
                        </div>
                        <div class="d-flex justify-content-between text-danger mb-3">
                            <span>Desconto:</span>
                            <span id="lblDiscount">- R$ 0,00</span>
                        </div>
                        <div class="total-row text-success">
                            <span>TOTAL:</span>
                            <span id="lblTotal">R$ 0,00</span>
                        </div>
                        
                        <button class="btn-finish" onclick="PdvManager.checkout()">
                            <i class="fa-solid fa-check-circle me-2"></i> FINALIZAR VENDA
                        </button>
                    </div>
                </div>

            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/assets/js/pdv.js"></script>
</body>
</html>
