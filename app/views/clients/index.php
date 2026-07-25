<?php
global $currentUser;
$userName = $currentUser->name ?? 'Administrador';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clientes - MaFê Kids ERP</title>
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
            --text-dark: #1f2937;
        }
        body { background-color: var(--bg-light); font-family: 'Inter', sans-serif; overflow-x: hidden; }
        
        /* Reusing sidebar from dashboard */
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
        
        /* Table Styles */
        .table-hover tbody tr:hover { background-color: #f8fafc; cursor: pointer; }
        .table th { font-weight: 600; color: #6b7280; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; }
        .table td { vertical-align: middle; color: #374151; font-weight: 500; }
        
        .status-badge { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .status-active { background: #dcfce7; color: #10b981; }
        .status-inactive { background: #fee2e2; color: #ef4444; }
    </style>
</head>
<body>
    
    <div class="sidebar">
        <div class="brand"><i class="fa-solid fa-child-reaching text-white"></i><div>MaFê <span>Kids</span></div></div>
        <div class="sidebar-menu">
            <div class="menu-header">Principal</div>
            <a href="/"><i class="fa-solid fa-chart-pie"></i> Visão Geral</a>
            <div class="menu-header mt-4">Cadastros</div>
            <a href="/clientes" class="active"><i class="fa-solid fa-users"></i> Clientes</a>
            <a href="/produtos"><i class="fa-solid fa-box-open"></i> Produtos & Estoque</a>
            <a href="/fornecedores"><i class="fa-solid fa-truck"></i> Fornecedores</a>
            <div class="menu-header mt-4">Sistema</div>
            <a href="/logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sair</a>
        </div>
    </div>
    
    <div class="main-wrapper">
        <header class="topbar">
            <div><h5 class="m-0 text-muted">Módulo de Clientes</h5></div>
            <div class="d-flex align-items-center fw-bold text-dark">
                <i class="fa-regular fa-user-circle fs-4 me-2"></i> <?php echo htmlspecialchars($userName); ?>
            </div>
        </header>
        
        <main class="content-area">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 class="fw-bold mb-1">Gestão de Clientes</h3>
                    <p class="text-muted mb-0">Listagem e cadastro de clientes da loja.</p>
                </div>
                <button class="btn btn-primary" style="background-color: var(--primary-color); border: none;" onclick="ClientManager.openModal()">
                    <i class="fa-solid fa-plus me-2"></i> Novo Cliente
                </button>
            </div>
            
            <div class="card card-custom bg-white p-4">
                <div class="d-flex justify-content-between mb-4">
                    <div class="input-group" style="max-width: 400px;">
                        <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-search text-muted"></i></span>
                        <input type="text" id="searchInput" class="form-control border-start-0 bg-light" placeholder="Buscar por nome, e-mail ou documento..." onkeyup="ClientManager.loadClients()">
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Nome Completo</th>
                                <th>Documento</th>
                                <th>Contato</th>
                                <th>Status</th>
                                <th class="text-end">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="clientsTableBody">
                            <tr><td colspan="5" class="text-center text-muted py-4"><i class="fa-solid fa-spinner fa-spin me-2"></i> Carregando clientes...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <!-- Modal de Cadastro / Edição -->
    <div class="modal fade" id="clientModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
                <div class="modal-header bg-light border-0" style="border-radius: 16px 16px 0 0;">
                    <h5 class="modal-title fw-bold" id="modalTitle">Novo Cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <form id="clientForm">
                        <input type="hidden" id="clientId">
                        
                        <h6 class="fw-bold text-primary mb-3">Dados Pessoais</h6>
                        <div class="row g-3 mb-4">
                            <div class="col-md-8">
                                <label class="form-label text-muted small fw-semibold">Nome Completo *</label>
                                <input type="text" class="form-control" id="clientName" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label text-muted small fw-semibold">CPF / CNPJ</label>
                                <input type="text" class="form-control" id="clientDocument">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted small fw-semibold">E-mail</label>
                                <input type="email" class="form-control" id="clientEmail">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label text-muted small fw-semibold">WhatsApp</label>
                                <input type="text" class="form-control" id="clientPhone">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label text-muted small fw-semibold">Nascimento</label>
                                <input type="date" class="form-control" id="clientBirthdate">
                            </div>
                        </div>
                        
                        <h6 class="fw-bold text-primary mb-3">Endereço</h6>
                        <div class="row g-3 mb-4">
                            <div class="col-md-3">
                                <label class="form-label text-muted small fw-semibold">CEP</label>
                                <input type="text" class="form-control" id="clientZipcode" onblur="ClientManager.fetchAddress()">
                            </div>
                            <div class="col-md-7">
                                <label class="form-label text-muted small fw-semibold">Logradouro</label>
                                <input type="text" class="form-control" id="clientAddress">
                            </div>
                            <div class="col-md-2">
                                <label class="form-label text-muted small fw-semibold">Número</label>
                                <input type="text" class="form-control" id="clientNumber">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label text-muted small fw-semibold">Bairro</label>
                                <input type="text" class="form-control" id="clientNeighborhood">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted small fw-semibold">Cidade</label>
                                <input type="text" class="form-control" id="clientCity">
                            </div>
                            <div class="col-md-2">
                                <label class="form-label text-muted small fw-semibold">UF</label>
                                <input type="text" class="form-control" id="clientState">
                            </div>
                        </div>

                        <div class="row g-3 mb-3">
                            <div class="col-12">
                                <label class="form-label text-muted small fw-semibold">Observações</label>
                                <textarea class="form-control" id="clientObservations" rows="2"></textarea>
                            </div>
                        </div>
                        
                        <div class="form-check form-switch mt-3">
                            <input class="form-check-input" type="checkbox" id="clientStatus" checked>
                            <label class="form-check-label fw-semibold" for="clientStatus">Cliente Ativo</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer border-0 bg-light" style="border-radius: 0 0 16px 16px;">
                    <button type="button" class="btn btn-light text-muted fw-bold" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary fw-bold" style="background-color: var(--primary-color); border: none;" onclick="ClientManager.saveClient()">
                        <i class="fa-solid fa-check me-2"></i> Salvar Cliente
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/assets/js/clients.js"></script>
</body>
</html>
