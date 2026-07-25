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
use App\Controllers\ClientController;
use App\Controllers\ProductController;
use App\Controllers\SaleController;
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
$router->before('GET|POST|PUT|DELETE', '/.*', function() {
    // Exceções que não precisam de Auth
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (in_array($path, ['/login', '/api/auth/login'])) {
        return;
    }
    AuthMiddleware::checkAuth();
});

$router->get('/', function() {
    require __DIR__ . '/../app/views/dashboard.php';
});

// Módulo de Clientes
$router->get('/clientes', function() {
    $controller = new ClientController();
    $controller->index();
});
$router->get('/api/clientes', function() {
    $controller = new ClientController();
    $controller->list();
});
$router->post('/api/clientes', function() {
    $controller = new ClientController();
    $controller->save();
});
$router->delete('/api/clientes/(\d+)', function($id) {
    $controller = new ClientController();
    $controller->delete($id);
});

// Módulo de Produtos e Estoque
$router->get('/produtos', function() {
    $controller = new ProductController();
    $controller->index();
});
$router->get('/api/produtos', function() {
    $controller = new ProductController();
    $controller->list();
});
$router->post('/api/produtos', function() {
    $controller = new ProductController();
    $controller->save();
});
$router->delete('/api/produtos/(\d+)', function($id) {
    $controller = new ProductController();
    $controller->delete($id);
});

// Geradores de Códigos (Retornam Imagem)
$router->get('/api/produtos/barcode/(.*)', function($barcode) {
    $controller = new ProductController();
    $controller->barcode($barcode);
});
$router->get('/api/produtos/qrcode/(.*)', function($sku) {
    $controller = new ProductController();
    $controller->qrcode($sku);
});

// Módulo de PDV e Vendas
$router->get('/vendas', function() {
    $controller = new SaleController();
    $controller->pdv();
});
$router->get('/api/vendas/buscar-produto', function() {
    $controller = new SaleController();
    $controller->searchProduct();
});
$router->post('/api/vendas/checkout', function() {
    $controller = new SaleController();
    $controller->checkout();
});
$router->get('/vendas/recibo/(\d+)', function($id) {
    $controller = new SaleController();
    $controller->receipt($id);
});

// API teste
$router->get('/api/teste', function() {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'API MaFê Kids Funcionando!']);
});

// Iniciar o Router
$router->run();
