<?php

namespace App\Controllers;

use App\Repositories\SaleRepository;
use App\Repositories\ProductRepository;
use App\Repositories\ClientRepository;
use App\Models\Sale;
use App\Models\SaleItem;
use Exception;

class SaleController {
    private SaleRepository $saleRepo;
    private ProductRepository $productRepo;
    private ClientRepository $clientRepo;

    public function __construct() {
        $this->saleRepo = new SaleRepository();
        $this->productRepo = new ProductRepository();
        $this->clientRepo = new ClientRepository();
    }

    public function pdv() {
        global $currentUser;
        
        // Carregar clientes ativos para o select no PDV
        $clients = $this->clientRepo->getAll(); 
        
        require __DIR__ . '/../views/sales/pdv.php';
    }

    // Endpoint para buscar produto por código de barras ou SKU dinamicamente
    public function searchProduct() {
        header('Content-Type: application/json');
        $code = $_GET['code'] ?? '';
        
        if (empty($code)) {
            echo json_encode(['status' => 'error', 'message' => 'Código vazio']);
            return;
        }

        // Busca tenta primeiro por Barcode, depois SKU, depois ID
        $products = $this->productRepo->getAll($code);
        
        if (count($products) > 0) {
            // Retorna o primeiro exato
            $p = $products[0];
            if ($p->stock_quantity <= 0) {
                echo json_encode(['status' => 'error', 'message' => 'Produto sem estoque!']);
                return;
            }
            echo json_encode(['status' => 'success', 'data' => (array)$p]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Produto não encontrado']);
        }
    }

    // Checkout
    public function checkout() {
        header('Content-Type: application/json');
        $inputJSON = file_get_contents('php://input');
        $data = json_decode($inputJSON, true);

        if (empty($data['items']) || count($data['items']) == 0) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Carrinho vazio.']);
            return;
        }

        try {
            $sale = new Sale([
                'client_id' => !empty($data['client_id']) ? (int)$data['client_id'] : null,
                'total_amount' => $data['total_amount'],
                'discount' => $data['discount'] ?? 0.0,
                'final_amount' => $data['final_amount'],
                'payment_method' => $data['payment_method'],
                'status' => 'completed'
            ]);

            foreach ($data['items'] as $item) {
                $sale->items[] = new SaleItem([
                    'product_id' => $item['id'],
                    'product_name' => $item['name'],
                    'quantity' => $item['qty'],
                    'unit_price' => $item['price'],
                    'subtotal' => $item['qty'] * $item['price']
                ]);
            }

            $this->saleRepo->save($sale);
            
            echo json_encode(['status' => 'success', 'message' => 'Venda finalizada com sucesso!', 'sale_id' => $sale->id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    // Gerador do Recibo HTML para Impressão Térmica
    public function receipt($id) {
        $sale = $this->saleRepo->getById((int)$id);
        if (!$sale) {
            echo "Venda não encontrada.";
            exit;
        }
        
        $clientName = "Consumidor Final";
        if ($sale->client_id) {
            $client = $this->clientRepo->getById($sale->client_id);
            if ($client) $clientName = $client->name;
        }

        require __DIR__ . '/../views/sales/receipt.php';
    }
}
