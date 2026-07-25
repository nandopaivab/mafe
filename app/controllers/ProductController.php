<?php

namespace App\Controllers;

use App\Repositories\ProductRepository;
use App\Models\Product;
use Exception;

// Para geração de código de barras e QR Code
use Picqer\Barcode\BarcodeGeneratorPNG;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

class ProductController {
    private ProductRepository $repository;

    public function __construct() {
        $this->repository = new ProductRepository();
    }

    public function index() {
        global $currentUser;
        require __DIR__ . '/../views/products/index.php';
    }

    public function list() {
        header('Content-Type: application/json');
        $search = $_GET['search'] ?? '';
        
        try {
            $products = $this->repository->getAll($search);
            $data = array_map(function($p) { return (array) $p; }, $products);
            echo json_encode(['status' => 'success', 'data' => $data]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Erro ao buscar produtos.']);
        }
    }

    public function save() {
        header('Content-Type: application/json');
        $inputJSON = file_get_contents('php://input');
        $data = json_decode($inputJSON, true);

        if (empty($data['name']) || empty($data['sku'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Nome e SKU são obrigatórios.']);
            return;
        }

        try {
            // Se o usuário deixou o barcode vazio, criamos um automático (ex: EAN13 baseado no time)
            if (empty($data['barcode'])) {
                // Gera um numero pseudo-único de 13 digitos
                $data['barcode'] = '789' . substr(time(), -5) . rand(10000, 99999);
            }

            $product = new Product($data);
            $this->repository->save($product);
            
            echo json_encode(['status' => 'success', 'message' => 'Produto salvo com sucesso!', 'id' => $product->id]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function delete($id) {
        header('Content-Type: application/json');
        try {
            $this->repository->delete((int)$id);
            echo json_encode(['status' => 'success', 'message' => 'Produto desativado com sucesso.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Erro ao desativar produto.']);
        }
    }

    // Endpoint para gerar e retornar a imagem PNG do Código de Barras
    public function barcode($barcode) {
        if (empty($barcode)) {
            http_response_code(404);
            exit;
        }
        
        $generator = new BarcodeGeneratorPNG();
        
        header('Content-Type: image/png');
        echo $generator->getBarcode($barcode, $generator::TYPE_CODE_128, 2, 60);
    }

    // Endpoint para gerar e retornar a imagem PNG do QR Code
    public function qrcode($text) {
        if (empty($text)) {
            http_response_code(404);
            exit;
        }

        $options = new QROptions([
            'version'      => 5,
            'outputType'   => QRCode::OUTPUT_IMAGE_PNG,
            'eccLevel'     => QRCode::ECC_L,
            'scale'        => 5,
        ]);
        
        $qrcode = new QRCode($options);
        
        header('Content-Type: image/png');
        echo $qrcode->render($text);
    }
}
