<?php

namespace App\Models;

class Product {
    public ?int $id;
    public string $sku;
    public ?string $barcode;
    public string $name;
    public ?string $description;
    public ?string $category;
    public float $cost_price;
    public float $sale_price;
    public int $stock_quantity;
    public int $min_stock;
    public bool $status;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = []) {
        $this->id = $data['id'] ?? null;
        $this->sku = $data['sku'] ?? '';
        $this->barcode = $data['barcode'] ?? null;
        $this->name = $data['name'] ?? '';
        $this->description = $data['description'] ?? null;
        $this->category = $data['category'] ?? null;
        $this->cost_price = isset($data['cost_price']) ? (float)$data['cost_price'] : 0.00;
        $this->sale_price = isset($data['sale_price']) ? (float)$data['sale_price'] : 0.00;
        $this->stock_quantity = isset($data['stock_quantity']) ? (int)$data['stock_quantity'] : 0;
        $this->min_stock = isset($data['min_stock']) ? (int)$data['min_stock'] : 5;
        $this->status = isset($data['status']) ? (bool)$data['status'] : true;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }
}
