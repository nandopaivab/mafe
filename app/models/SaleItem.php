<?php

namespace App\Models;

class SaleItem {
    public ?int $id;
    public ?int $sale_id;
    public ?int $product_id;
    public string $product_name;
    public int $quantity;
    public float $unit_price;
    public float $subtotal;

    public function __construct(array $data = []) {
        $this->id = $data['id'] ?? null;
        $this->sale_id = $data['sale_id'] ?? null;
        $this->product_id = $data['product_id'] ?? null;
        $this->product_name = $data['product_name'] ?? '';
        $this->quantity = isset($data['quantity']) ? (int)$data['quantity'] : 1;
        $this->unit_price = isset($data['unit_price']) ? (float)$data['unit_price'] : 0.0;
        $this->subtotal = isset($data['subtotal']) ? (float)$data['subtotal'] : ($this->quantity * $this->unit_price);
    }
}
