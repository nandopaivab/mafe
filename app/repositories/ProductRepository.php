<?php

namespace App\Repositories;

use PDO;
use App\Models\Product;
use Exception;

class ProductRepository {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function getAll(string $search = ''): array {
        $query = "SELECT * FROM products WHERE 1=1";
        $params = [];

        if (!empty($search)) {
            $query .= " AND (name LIKE :search OR sku LIKE :search OR barcode LIKE :search OR category LIKE :search)";
            $params['search'] = "%{$search}%";
        }

        $query .= " ORDER BY name ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results = [];
        while ($row = $stmt->fetch()) {
            $results[] = new Product($row);
        }
        return $results;
    }

    public function getById(int $id): ?Product {
        $stmt = $this->db->prepare("SELECT * FROM products WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        return $row ? new Product($row) : null;
    }
    
    public function getBySku(string $sku): ?Product {
        $stmt = $this->db->prepare("SELECT * FROM products WHERE sku = :sku LIMIT 1");
        $stmt->execute(['sku' => $sku]);
        $row = $stmt->fetch();

        return $row ? new Product($row) : null;
    }

    public function save(Product $product): bool {
        // Valida SKU Único
        $stmt = $this->db->prepare("SELECT id FROM products WHERE sku = :sku AND id != :id");
        $stmt->execute(['sku' => $product->sku, 'id' => $product->id ?? 0]);
        if ($stmt->fetch()) {
            throw new Exception("Já existe um produto cadastrado com este SKU.");
        }

        if ($product->id) {
            return $this->update($product);
        } else {
            return $this->insert($product);
        }
    }

    private function insert(Product $product): bool {
        $sql = "INSERT INTO products (sku, barcode, name, description, category, cost_price, sale_price, stock_quantity, min_stock, status) 
                VALUES (:sku, :barcode, :name, :description, :category, :cost_price, :sale_price, :stock_quantity, :min_stock, :status)";
        
        $stmt = $this->db->prepare($sql);
        $success = $stmt->execute([
            'sku' => $product->sku,
            'barcode' => $product->barcode,
            'name' => $product->name,
            'description' => $product->description,
            'category' => $product->category,
            'cost_price' => $product->cost_price,
            'sale_price' => $product->sale_price,
            'stock_quantity' => $product->stock_quantity,
            'min_stock' => $product->min_stock,
            'status' => (int)$product->status
        ]);

        if ($success) {
            $product->id = (int)$this->db->lastInsertId();
        }
        return $success;
    }

    private function update(Product $product): bool {
        $sql = "UPDATE products SET 
                sku = :sku, barcode = :barcode, name = :name, description = :description, 
                category = :category, cost_price = :cost_price, sale_price = :sale_price, 
                stock_quantity = :stock_quantity, min_stock = :min_stock, status = :status 
                WHERE id = :id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'id' => $product->id,
            'sku' => $product->sku,
            'barcode' => $product->barcode,
            'name' => $product->name,
            'description' => $product->description,
            'category' => $product->category,
            'cost_price' => $product->cost_price,
            'sale_price' => $product->sale_price,
            'stock_quantity' => $product->stock_quantity,
            'min_stock' => $product->min_stock,
            'status' => (int)$product->status
        ]);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("UPDATE products SET status = 0 WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
