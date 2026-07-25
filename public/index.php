<?php

// Front Controller

// Autoload do Composer (será gerado pelo comando `composer install`)
$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoloadPath)) {
    require_once $autoloadPath;
} else {
    die("<h1>Erro Crítico</h1><p>O diretório <b>vendor</b> não foi encontrado. Execute <code>composer install</code> na raiz do projeto.</p>");
}

use Bramus\Router\Router;
use Dotenv\Dotenv;

// Carregar variáveis de ambiente
try {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
} catch (Exception $e) {
    // Ignorar se o .env não existir (útil em produção onde as variáveis podem estar no servidor)
}

// Inicializar o Router
$router = new Router();

// Definir rotas básicas
$router->get('/', function() {
    require __DIR__ . '/../app/views/dashboard.php';
});

// API teste
$router->get('/api/teste', function() {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'API MaFê Kids Funcionando!']);
});

// Iniciar o Router
$router->run();
