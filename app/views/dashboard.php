<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - MaFê Kids ERP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .sidebar { min-height: 100vh; background: #2c3e50; color: white; transition: all 0.3s; }
        .sidebar a { color: #bdc3c7; text-decoration: none; display: block; padding: 12px 20px; transition: 0.2s; }
        .sidebar a:hover { background: #34495e; color: white; border-left: 4px solid #3498db; }
        .brand { font-size: 1.5rem; font-weight: bold; padding: 20px; text-align: center; border-bottom: 1px solid #34495e; background: #243342; color: #ecf0f1; }
        .card-stats { border: none; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.2s; }
        .card-stats:hover { transform: translateY(-5px); }
        .text-primary-custom { color: #3498db !important; }
    </style>
</head>
<body>
    <div class="d-flex">
        <!-- Sidebar -->
        <div class="sidebar" style="width: 250px;">
            <div class="brand">MaFê Kids ERP</div>
            <nav class="mt-3">
                <a href="/">Dashboard</a>
                <a href="#clientes">Clientes</a>
                <a href="#produtos">Produtos & Estoque</a>
                <a href="#vendas">Vendas (PDV)</a>
                <a href="#financeiro">Financeiro</a>
                <a href="#relatorios">Relatórios</a>
                <a href="#configuracoes">Configurações</a>
            </nav>
        </div>
        
        <!-- Main Content -->
        <div class="flex-grow-1 p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="m-0 text-dark">Visão Geral</h2>
                <div class="user-profile">
                    <span class="text-muted">Administrador</span>
                </div>
            </div>
            
            <div class="row g-4">
                <div class="col-md-3">
                    <div class="card card-stats p-3 text-center bg-white">
                        <h5 class="text-muted fs-6 text-uppercase">Vendas no Mês</h5>
                        <h3 class="text-primary-custom m-0">R$ 0,00</h3>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card card-stats p-3 text-center bg-white">
                        <h5 class="text-muted fs-6 text-uppercase">Novos Clientes</h5>
                        <h3 class="text-primary-custom m-0">0</h3>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card card-stats p-3 text-center bg-white">
                        <h5 class="text-muted fs-6 text-uppercase">Pedidos Pendentes</h5>
                        <h3 class="text-warning m-0">0</h3>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card card-stats p-3 text-center bg-white">
                        <h5 class="text-muted fs-6 text-uppercase">Estoque Baixo</h5>
                        <h3 class="text-danger m-0">0</h3>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 bg-white p-4 rounded-4 shadow-sm border-0">
                <h4 class="text-dark">Bem-vindo ao ERP MaFê Kids!</h4>
                <p class="text-muted">A estrutura base (PHP + MVC) está pronta para uso e independente de Node.js. Para ver este painel online no servidor local, você deverá rodar o Composer.</p>
                
                <div class="alert alert-success d-flex align-items-center mt-4" role="alert">
                    <div>
                        <strong>Aviso:</strong> Execute <code>composer install</code> no servidor para baixar o autoloader PSR-4 e as dependências (Router, Dotenv, JWT, DomPDF, PHPMailer).
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
