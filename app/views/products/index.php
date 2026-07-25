<?php
global $currentUser;
$userName = $currentUser->name ?? 'Administrador';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos - MaFê Kids ERP</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #6366f1;
            --primary-hover: #4f46e5;
            --sidebar-bg: #1e1e2d;
            --sidebar-hover: #2b2b40;
            --bg-light: #f3f4f6;
        }
        body { background-color: var(--bg-light); font-family: 'Inter', sans-serif; overflow-x: hidden; }
        
        .sidebar { min-height: 100vh; background: var(--sidebar-bg); color: white; width: 260px; position: fixed; z-index: 1000; }
        .brand { font-size: 1.4rem; font-weight: 800; padding: 20px 25px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; }
        .brand span { color: var(--primary-color); }
        .sidebar-menu { padding: 20px 0; }
        .sidebar-menu .menu-header { padding: 10px 25px; font-size: 0.75rem; text-transform: uppercase; color: #6b7280; font-weight: 600; }
        .sidebar-menu a { color: #9ca3af; text-decoration: none; display: flex; align-items: center; gap: 12px; padding: 12px 25px; font-weight: 500; }
        .sidebar-menu a:hover, .sidebar-menu a.active { background: var(--sidebar-hover); color: white; border-left: 4px solid var(--primary-color); }
        
        .main-wrapper { margin-left: 260px; min-height: 100vh; display: flex; flex-direction: column; }
        .topbar { background: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .content-area { padding: 30px; flex-grow: 1; }
        
        .card-custom { border: none; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .table th { font-weight: 600; color: #6b7280; font-size: 0.85rem; text-transform: uppercase; border-bottom: 2px solid #e5e7eb; }
        .table td { vertical-align: middle; font-weight: 500; }
        
        .stock-badge { padding: 5px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; }
        .stock-ok { background: #dcfce7; color: #10b981; }
        .stock-low { background: #fee2e2; color: #ef4444; }
        
        .barcode-preview { border: 1px solid #ddd; border-radius: 8px; padding: 10px; background: white; text-align: center; }
    </style>
</head>
<body>
    
    <div class="sidebar">
        <div class="brand"><i class="fa-solid fa-child-reaching text-white"></i><div>MaFê <span>Kids</span></div></div>
        <div class="sidebar-menu">
            <div class="menu-header">Principal</div>
            <a href="/"><i class="fa-solid fa-chart-pie"></i> Visão Geral</a>
            <div class="menu-header mt-4">Cadastros</div>
            <a href="/clientes"><i class="fa-solid fa-users"></i> Clientes</a>
            <a href="/produtos" class="active"><i class="fa-solid fa-box-open"></i> Produtos & Estoque</a>
            <a href="/fornecedores"><i class="fa-solid fa-truck"></i> Fornecedores</a>
            <div class="menu-header mt-4">Sistema</div>
            <a href="/logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sair</a>
        </div>
    </div>
    
    <div class="main-wrapper">
        <header class="topbar">
            <div><h5 class="m-0 text-muted">Módulo de Estoque</h5></div>
            <div class="d-flex align-items-center fw-bold text-dark">
                <i class="fa-regular fa-user-circle fs-4 me-2"></i> <?php echo htmlspecialchars($userName); ?>
            </div>
        </header>
        
        <main class="content-area">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 class="fw-bold mb-1">Gestão de Produtos</h3>
                    <p class="text-muted mb-0">Controle de SKUs, preços e níveis de estoque.</p>
                </div>
                <button class="btn btn-primary fw-bold" style="background-color: var(--primary-color); border: none;" onclick="ProductManager.openModal()">
                    <i class="fa-solid fa-plus me-2"></i> Novo Produto
                </button>
            </div>
            
            <div class="card card-custom bg-white p-4">
                <div class="input-group mb-4" style="max-width: 400px;">
                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-search text-muted"></i></span>
                    <input type="text" id="searchInput" class="form-control border-start-0 bg-light" placeholder="Buscar por Nome, SKU ou Categoria..." onkeyup="ProductManager.loadProducts()">
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Preço Venda</th>
                                <th>Estoque</th>
                                <th class="text-end">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="productsTableBody">
                            <tr><td colspan="5" class="text-center text-muted py-4"><i class="fa-solid fa-spinner fa-spin me-2"></i> Carregando...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <!-- Modal Form -->
    <div class="modal fade" id="productModal" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
                <div class="modal-header bg-light border-0" style="border-radius: 16px 16px 0 0;">
                    <h5 class="modal-title fw-bold" id="modalTitle">Novo Produto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row">
                        <!-- Formulário (Esquerda) -->
                        <div class="col-lg-8">
                            <form id="productForm">
                                <input type="hidden" id="productId">
                                
                                <h6 class="fw-bold text-primary mb-3">Identificação</h6>
                                <div class="row g-3 mb-4">
                                    <div class="col-md-9">
                                        <label class="form-label text-muted small fw-semibold">Nome / Variação do Produto *</label>
                                        <input type="text" class="form-control" id="productName" required placeholder="Ex: Vestido Floral - Tam P">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label text-muted small fw-semibold">SKU *</label>
                                        <input type="text" class="form-control" id="productSku" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Código de Barras (EAN/UPC)</label>
                                        <input type="text" class="form-control" id="productBarcode" placeholder="Deixe em branco para gerar auto">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label text-muted small fw-semibold">Categoria</label>
                                        <input type="text" class="form-control" id="productCategory" placeholder="Ex: Vestuário Menina">
                                    </div>
                                </div>
                                
                                <h6 class="fw-bold text-primary mb-3">Financeiro & Estoque</h6>
                                <div class="row g-3 mb-4">
                                    <div class="col-md-3">
                                        <label class="form-label text-muted small fw-semibold">Preço Custo (R$)</label>
                                        <input type="number" step="0.01" class="form-control" id="productCost">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label text-muted small fw-semibold">Preço Venda (R$)</label>
                                        <input type="number" step="0.01" class="form-control" id="productSale">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label text-muted small fw-semibold">Qtd Estoque</label>
                                        <input type="number" class="form-control" id="productStock">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label text-muted small fw-semibold">Estoque Mínimo</label>
                                        <input type="number" class="form-control" id="productMinStock" value="5">
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <!-- Etiquetagem (Direita) -->
                        <div class="col-lg-4 bg-light p-3 rounded" id="labelPreviewArea" style="display: none;">
                            <h6 class="fw-bold text-dark text-center mb-4"><i class="fa-solid fa-tags me-2"></i> Impressão de Etiquetas</h6>
                            
                            <div class="barcode-preview mb-4">
                                <small class="d-block text-muted mb-2">Código de Barras</small>
                                <img id="imgBarcode" src="" alt="Barcode" style="max-width: 100%;">
                                <div class="fw-bold mt-2" id="txtBarcode"></div>
                            </div>
                            
                            <div class="barcode-preview">
                                <small class="d-block text-muted mb-2">QR Code</small>
                                <img id="imgQrcode" src="" alt="QR Code" style="width: 120px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 bg-light" style="border-radius: 0 0 16px 16px;">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary fw-bold" style="background-color: var(--primary-color); border: none;" onclick="ProductManager.saveProduct()">
                        <i class="fa-solid fa-save me-2"></i> Salvar Produto
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/assets/js/products.js"></script>
</body>
</html>
