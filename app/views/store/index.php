<?php
// A variável $activeProducts já chega populada pelo StoreController
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MaFê Kids - Moda Infantil Mágica</title>
    <!-- Google Fonts: Poppins para um ar mais fofo e comercial -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --brand-primary: #ff758f;
            --brand-secondary: #ffb5a7;
            --brand-accent: #fec89a;
            --text-dark: #2b2d42;
        }
        body { 
            font-family: 'Poppins', sans-serif; 
            background-color: #fff9fa;
            color: var(--text-dark);
            overflow-x: hidden;
        }

        /* Navbar */
        .navbar-custom {
            background-color: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            padding: 15px 0;
        }
        .navbar-brand {
            font-weight: 800;
            font-size: 1.8rem;
            color: var(--brand-primary) !important;
        }
        .navbar-brand span { color: var(--brand-accent); }
        .cart-icon-btn {
            position: relative;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--brand-primary);
        }
        .cart-badge {
            position: absolute;
            top: -5px;
            right: -10px;
            background-color: var(--brand-accent);
            color: white;
            font-size: 0.75rem;
            font-weight: bold;
            padding: 3px 6px;
            border-radius: 50%;
        }

        /* Hero Banner */
        .hero-banner {
            background: linear-gradient(135deg, var(--brand-secondary) 0%, var(--brand-primary) 100%);
            padding: 80px 20px;
            text-align: center;
            color: white;
            border-radius: 0 0 40px 40px;
            margin-bottom: 50px;
        }
        .hero-banner h1 { font-weight: 800; font-size: 3rem; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
        .hero-banner p { font-size: 1.2rem; font-weight: 300; opacity: 0.9; }

        /* Grid de Produtos */
        .product-card {
            background: white;
            border-radius: 20px;
            border: none;
            box-shadow: 0 10px 20px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
            height: 100%;
            overflow: hidden;
        }
        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(255, 117, 143, 0.15);
        }
        .product-img-placeholder {
            background-color: #f8f9fa;
            height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #dee2e6;
            font-size: 4rem;
        }
        .product-body { padding: 20px; text-align: center; }
        .product-category { font-size: 0.8rem; text-transform: uppercase; color: var(--brand-primary); font-weight: 700; letter-spacing: 1px; margin-bottom: 10px; }
        .product-title { font-weight: 600; font-size: 1.1rem; margin-bottom: 15px; color: var(--text-dark); }
        .product-price { font-weight: 800; font-size: 1.4rem; color: var(--brand-primary); margin-bottom: 20px; }
        
        .btn-add-cart {
            background-color: white;
            color: var(--brand-primary);
            border: 2px solid var(--brand-primary);
            border-radius: 30px;
            padding: 10px 20px;
            font-weight: 600;
            transition: 0.3s;
            width: 100%;
        }
        .btn-add-cart:hover {
            background-color: var(--brand-primary);
            color: white;
        }

        /* Carrinho Offcanvas */
        .offcanvas-custom { border-radius: 20px 0 0 20px; border: none; box-shadow: -5px 0 25px rgba(0,0,0,0.05); }
        .offcanvas-header { border-bottom: 1px solid #f1f1f1; }
        .cart-item-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f9f9f9; }
        .cart-item-info h6 { margin: 0; font-weight: 600; font-size: 0.95rem; }
        .cart-item-info small { color: #888; }
        .btn-remove { color: #ff4d4d; background: none; border: none; padding: 0; }
        
        .btn-whatsapp {
            background-color: #25D366;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 15px;
            font-weight: bold;
            font-size: 1.1rem;
            width: 100%;
            transition: 0.3s;
        }
        .btn-whatsapp:hover { background-color: #1ebd5a; color: white; }

        /* Footer */
        footer { background: white; padding: 40px 0; text-align: center; margin-top: 80px; color: #888; }
    </style>
</head>
<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-custom sticky-top">
        <div class="container">
            <a class="navbar-brand" href="/">
                <i class="fa-solid fa-child-reaching me-2"></i>MaFê <span>Kids</span>
            </a>
            
            <div class="d-flex align-items-center">
                <button class="cart-icon-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <span class="cart-badge" id="cartBadgeCount">0</span>
                </button>
                <a href="/login" class="btn btn-outline-secondary btn-sm rounded-pill px-3" style="font-weight: 600;">
                    <i class="fa-solid fa-lock me-1"></i> Área Restrita
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <header class="hero-banner">
        <div class="container">
            <h1>Moda Infantil com Amor</h1>
            <p>Roupas confortáveis, estilosas e perfeitas para todas as brincadeiras!</p>
        </div>
    </header>

    <!-- Vitrine de Produtos -->
    <main class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold m-0" style="color: var(--brand-primary);">Nossa Coleção</h3>
            <span class="text-muted fw-semibold"><?php echo count($activeProducts); ?> produtos</span>
        </div>

        <div class="row g-4">
            <?php if(empty($activeProducts)): ?>
                <div class="col-12 text-center py-5">
                    <i class="fa-solid fa-box-open fs-1 text-muted mb-3 opacity-25"></i>
                    <h4 class="text-muted">Nenhum produto disponível no momento.</h4>
                    <p>Volte em breve para conferir as novidades!</p>
                </div>
            <?php else: ?>
                <?php foreach($activeProducts as $p): ?>
                    <div class="col-6 col-md-4 col-lg-3">
                        <div class="product-card">
                            <div class="product-img-placeholder">
                                <i class="fa-solid fa-shirt"></i>
                            </div>
                            <div class="product-body">
                                <div class="product-category"><?php echo htmlspecialchars($p->category ?: 'Vestuário'); ?></div>
                                <h5 class="product-title"><?php echo htmlspecialchars($p->name); ?></h5>
                                <div class="product-price">R$ <?php echo number_format($p->sale_price, 2, ',', '.'); ?></div>
                                
                                <button class="btn-add-cart" 
                                    onclick="StoreCart.addItem(<?php echo $p->id; ?>, '<?php echo htmlspecialchars(addslashes($p->name)); ?>', <?php echo $p->sale_price; ?>)">
                                    <i class="fa-solid fa-cart-plus me-2"></i> Eu Quero!
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            <h5 class="fw-bold" style="color: var(--brand-primary);">MaFê Kids</h5>
            <p class="mb-0">Todos os direitos reservados &copy; <?php echo date('Y'); ?></p>
            <small>Feito com carinho para crianças incríveis.</small>
        </div>
    </footer>

    <!-- Offcanvas Carrinho -->
    <div class="offcanvas offcanvas-end offcanvas-custom" tabindex="-1" id="cartOffcanvas">
        <div class="offcanvas-header p-4">
            <h5 class="offcanvas-title fw-bold" style="color: var(--brand-primary);">
                <i class="fa-solid fa-bag-shopping me-2"></i> Sua Sacola
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body p-4 d-flex flex-column">
            
            <!-- Lista de Itens -->
            <div id="storeCartItems" class="flex-grow-1 overflow-auto">
                <!-- Preenchido via JS -->
            </div>

            <!-- Total e Checkout -->
            <div class="mt-4 pt-3 border-top">
                <div class="d-flex justify-content-between mb-4">
                    <span class="fs-5 fw-bold text-muted">Total:</span>
                    <span class="fs-4 fw-bold" style="color: var(--brand-primary);" id="storeCartTotal">R$ 0,00</span>
                </div>
                
                <button class="btn-whatsapp" onclick="StoreCart.checkoutWhatsapp()">
                    <i class="fa-brands fa-whatsapp fs-4 me-2 align-middle"></i> Comprar via WhatsApp
                </button>
                <p class="text-center text-muted mt-3 small">
                    O pagamento e entrega serão combinados diretamente pelo nosso WhatsApp. É super rápido e seguro!
                </p>
            </div>
            
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/assets/js/store.js"></script>
</body>
</html>
