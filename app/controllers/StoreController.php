<?php

namespace App\Controllers;

use App\Repositories\ProductRepository;

class StoreController {
    private ProductRepository $productRepo;

    public function __construct() {
        $this->productRepo = new ProductRepository();
    }

    public function index() {
        // Pega todos os produtos ativos que tem estoque
        $allProducts = $this->productRepo->getAll();
        
        $activeProducts = array_filter($allProducts, function($p) {
            return $p->status == 1 && $p->stock_quantity > 0;
        });

        require __DIR__ . '/../views/store/index.php';
    }
}
