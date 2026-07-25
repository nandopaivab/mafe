<?php
global $currentUser;
// Se o middleware não passou a variável, setamos um fallback
$userName = $currentUser->name ?? 'Administrador';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Principal - MaFê Kids ERP</title>
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary-color: #6366f1;
            --primary-hover: #4f46e5;
            --sidebar-bg: #1e1e2d;
            --sidebar-hover: #2b2b40;
            --bg-light: #f3f4f6;
            --text-dark: #1f2937;
            --text-muted: #6b7280;
        }
        
        body { 
            background-color: var(--bg-light); 
            font-family: 'Inter', sans-serif; 
            overflow-x: hidden;
        }

        /* Sidebar Base */
        .sidebar { 
            min-height: 100vh; 
            background: var(--sidebar-bg); 
            color: white; 
            transition: all 0.3s ease;
            width: 260px;
            position: fixed;
            z-index: 1000;
        }
        
        .brand { 
            font-size: 1.4rem; 
            font-weight: 800; 
            padding: 20px 25px; 
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.05); 
            color: #fff; 
        }
        .brand span { color: var(--primary-color); }
        
        .sidebar-menu { padding: 20px 0; }
        .sidebar-menu .menu-header {
            padding: 10px 25px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #6b7280;
            font-weight: 600;
        }
        .sidebar-menu a { 
            color: #9ca3af; 
            text-decoration: none; 
            display: flex; 
            align-items: center;
            gap: 12px;
            padding: 12px 25px; 
            transition: 0.2s; 
            font-weight: 500;
        }
        .sidebar-menu a:hover, .sidebar-menu a.active { 
            background: var(--sidebar-hover); 
            color: white; 
            border-left: 4px solid var(--primary-color); 
        }
        
        /* Main Content Wrapper */
        .main-wrapper {
            margin-left: 260px;
            transition: all 0.3s ease;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Topbar */
        .topbar {
            background: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            z-index: 900;
        }
        
        .search-bar input {
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            padding: 8px 20px;
            font-size: 0.9rem;
            width: 300px;
            background: #f9fafb;
        }
        .search-bar input:focus {
            outline: none;
            border-color: var(--primary-color);
            background: white;
        }

        /* User Dropdown */
        .user-dropdown .dropdown-toggle {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            color: var(--text-dark);
            font-weight: 500;
        }
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        /* Content Area */
        .content-area {
            padding: 30px;
            flex-grow: 1;
        }
        
        /* Stats Cards */
        .card-stats { 
            border: none; 
            border-radius: 16px; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
            transition: transform 0.2s; 
            padding: 24px;
        }
        .card-stats:hover { transform: translateY(-4px); }
        .icon-shape {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        
        .bg-light-primary { background: #e0e7ff; color: var(--primary-color); }
        .bg-light-success { background: #dcfce7; color: #10b981; }
        .bg-light-warning { background: #fef3c7; color: #f59e0b; }
        .bg-light-danger { background: #fee2e2; color: #ef4444; }

        /* Chart Card */
        .card-custom {
            border: none;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="brand">
            <i class="fa-solid fa-child-reaching text-white"></i>
            <div>MaFê <span>Kids</span></div>
        </div>
        <div class="sidebar-menu">
            <div class="menu-header">Principal</div>
            <a href="/" class="active"><i class="fa-solid fa-chart-pie"></i> Visão Geral</a>
            <a href="/vendas"><i class="fa-solid fa-cart-shopping"></i> PDV / Vendas</a>
            
            <div class="menu-header mt-4">Cadastros</div>
            <a href="/clientes"><i class="fa-solid fa-users"></i> Clientes</a>
            <a href="/produtos"><i class="fa-solid fa-box-open"></i> Produtos & Estoque</a>
            <a href="/fornecedores"><i class="fa-solid fa-truck"></i> Fornecedores</a>
            
            <div class="menu-header mt-4">Gestão</div>
            <a href="/financeiro"><i class="fa-solid fa-wallet"></i> Financeiro</a>
            <a href="/relatorios"><i class="fa-solid fa-chart-line"></i> Relatórios</a>
            
            <div class="menu-header mt-4">Sistema</div>
            <a href="/configuracoes"><i class="fa-solid fa-gear"></i> Configurações</a>
        </div>
    </div>
    
    <!-- Main Wrapper -->
    <div class="main-wrapper">
        
        <!-- Topbar -->
        <header class="topbar">
            <div class="search-bar">
                <input type="text" placeholder="Buscar clientes, produtos ou pedidos...">
            </div>
            
            <div class="d-flex align-items-center gap-4">
                <a href="#" class="text-muted"><i class="fa-regular fa-bell fs-5"></i></a>
                
                <div class="dropdown user-dropdown">
                    <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="user-avatar">
                            <?php echo substr($userName, 0, 1); ?>
                        </div>
                        <div class="d-none d-md-block">
                            <span class="d-block lh-1"><?php echo htmlspecialchars($userName); ?></span>
                            <small class="text-muted" style="font-size: 0.75rem;">Administrador</small>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                        <li><a class="dropdown-item" href="/perfil"><i class="fa-regular fa-user me-2"></i> Meu Perfil</a></li>
                        <li><a class="dropdown-item" href="/configuracoes"><i class="fa-solid fa-gear me-2"></i> Configurações</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="/logout"><i class="fa-solid fa-arrow-right-from-bracket me-2"></i> Sair do Sistema</a></li>
                    </ul>
                </div>
            </div>
        </header>
        
        <!-- Content Area -->
        <main class="content-area">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 class="fw-bold mb-1">Dashboard</h3>
                    <p class="text-muted mb-0">Resumo das atividades da MaFê Kids</p>
                </div>
                <button class="btn btn-primary" style="background-color: var(--primary-color); border: none;">
                    <i class="fa-solid fa-plus me-2"></i> Nova Venda
                </button>
            </div>
            
            <!-- Cards Row -->
            <div class="row g-4 mb-4">
                <!-- Vendas Card -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card card-stats bg-white h-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="text-muted fw-semibold mb-0">Vendas no Mês</h6>
                            <div class="icon-shape bg-light-primary">
                                <i class="fa-solid fa-money-bill-trend-up"></i>
                            </div>
                        </div>
                        <h3 class="fw-bold mb-2">R$ 14.500,00</h3>
                        <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1">
                            <i class="fa-solid fa-arrow-up me-1"></i> +12.5%
                        </span>
                        <span class="text-muted small ms-2">vs último mês</span>
                    </div>
                </div>
                
                <!-- Clientes Card -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card card-stats bg-white h-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="text-muted fw-semibold mb-0">Novos Clientes</h6>
                            <div class="icon-shape bg-light-success">
                                <i class="fa-solid fa-users"></i>
                            </div>
                        </div>
                        <h3 class="fw-bold mb-2">124</h3>
                        <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1">
                            <i class="fa-solid fa-arrow-up me-1"></i> +5.2%
                        </span>
                        <span class="text-muted small ms-2">vs último mês</span>
                    </div>
                </div>
                
                <!-- Pedidos Card -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card card-stats bg-white h-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="text-muted fw-semibold mb-0">Pedidos Pendentes</h6>
                            <div class="icon-shape bg-light-warning">
                                <i class="fa-solid fa-box-open"></i>
                            </div>
                        </div>
                        <h3 class="fw-bold mb-2">18</h3>
                        <span class="badge bg-danger bg-opacity-10 text-danger rounded-pill px-2 py-1">
                            <i class="fa-solid fa-circle-exclamation me-1"></i> Atenção
                        </span>
                        <span class="text-muted small ms-2">aguardando envio</span>
                    </div>
                </div>
                
                <!-- Estoque Card -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card card-stats bg-white h-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="text-muted fw-semibold mb-0">Estoque Crítico</h6>
                            <div class="icon-shape bg-light-danger">
                                <i class="fa-solid fa-triangle-exclamation"></i>
                            </div>
                        </div>
                        <h3 class="fw-bold mb-2">5 Itens</h3>
                        <a href="/produtos?filtro=estoque_baixo" class="text-primary text-decoration-none small fw-semibold">
                            Ver produtos <i class="fa-solid fa-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Charts and Tables Row -->
            <div class="row g-4">
                <!-- Gráfico de Vendas -->
                <div class="col-12 col-lg-8">
                    <div class="card card-custom bg-white p-4 h-100">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="fw-bold m-0">Desempenho de Vendas</h5>
                            <select class="form-select form-select-sm w-auto">
                                <option>Últimos 7 dias</option>
                                <option selected>Últimos 30 dias</option>
                                <option>Este Ano</option>
                            </select>
                        </div>
                        <canvas id="salesChart" height="300"></canvas>
                    </div>
                </div>
                
                <!-- Últimas Vendas -->
                <div class="col-12 col-lg-4">
                    <div class="card card-custom bg-white p-4 h-100">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="fw-bold m-0">Vendas Recentes</h5>
                            <a href="/vendas" class="text-primary text-decoration-none small fw-semibold">Ver todas</a>
                        </div>
                        
                        <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                            <div class="bg-light-success rounded p-2 me-3">
                                <i class="fa-solid fa-bag-shopping text-success"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-0 fw-semibold">Ana Silva</h6>
                                <small class="text-muted">Conjunto Inverno Infantil</small>
                            </div>
                            <div class="text-end">
                                <h6 class="mb-0 fw-bold">R$ 145,90</h6>
                                <small class="text-muted">Hoje, 10:45</small>
                            </div>
                        </div>
                        
                        <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                            <div class="bg-light-success rounded p-2 me-3">
                                <i class="fa-solid fa-bag-shopping text-success"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-0 fw-semibold">Mariana Costa</h6>
                                <small class="text-muted">Vestido Festa Azul</small>
                            </div>
                            <div class="text-end">
                                <h6 class="mb-0 fw-bold">R$ 210,00</h6>
                                <small class="text-muted">Ontem, 16:30</small>
                            </div>
                        </div>

                        <div class="d-flex align-items-center">
                            <div class="bg-light-success rounded p-2 me-3">
                                <i class="fa-solid fa-bag-shopping text-success"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-0 fw-semibold">Carlos Oliveira</h6>
                                <small class="text-muted">Tênis Casual</small>
                            </div>
                            <div class="text-end">
                                <h6 class="mb-0 fw-bold">R$ 89,90</h6>
                                <small class="text-muted">Ontem, 14:15</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <script>
        // Inicialização do Gráfico de Vendas
        const ctx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['01/Jul', '05/Jul', '10/Jul', '15/Jul', '20/Jul', '25/Jul'],
                datasets: [{
                    label: 'Faturamento (R$)',
                    data: [1200, 1900, 3000, 2500, 4200, 3800],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#6366f1',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [5, 5], color: '#f3f4f6' },
                        border: { display: false }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false }
                    }
                }
            }
        });
    </script>
</body>
</html>
