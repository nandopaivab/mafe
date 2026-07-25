<?php

namespace App\Models;

class Sale {
    public ?int $id;
    public ?int $client_id;
    public float $total_amount;
    public float $discount;
    public float $final_amount;
    public string $payment_method;
    public string $status;
    public ?string $created_at;
    public array $items = []; // Array de SaleItem

    public function __construct(array $data = []) {
        $this->id = $data['id'] ?? null;
        $this->client_id = $data['client_id'] ?? null;
        $this->total_amount = isset($data['total_amount']) ? (float)$data['total_amount'] : 0.0;
        $this->discount = isset($data['discount']) ? (float)$data['discount'] : 0.0;
        $this->final_amount = isset($data['final_amount']) ? (float)$data['final_amount'] : 0.0;
        $this->payment_method = $data['payment_method'] ?? 'dinheiro';
        $this->status = $data['status'] ?? 'completed';
        $this->created_at = $data['created_at'] ?? null;
    }
}
