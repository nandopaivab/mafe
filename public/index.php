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
use App\Controllers\AuthController;
use App\Middlewares\AuthMiddleware;

// Carregar variáveis de ambiente
try {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
} catch (Exception $e) {
    // Ignorar se o .env não existir (útil em produção onde as variáveis podem estar no servidor)
}

// Inicializar o Router
$router = new Router();

// Rotas de Autenticação
$router->get('/login', function() {
    $controller = new AuthController();
    $controller->loginView();
});
$router->post('/api/auth/login', function() {
    $controller = new AuthController();
    $controller->apiLogin();
});
$router->get('/logout', function() {
    $controller = new AuthController();
    $controller->logout();
});

// Rotas Protegidas
$router->before('GET', '/', function() {
    AuthMiddleware::checkAuth();
});
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
