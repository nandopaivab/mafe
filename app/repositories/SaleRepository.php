<?php

namespace App\Repositories;

use PDO;
use App\Models\Sale;
use App\Models\SaleItem;
use Exception;

class SaleRepository {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function save(Sale $sale): bool {
        // Inicia Transação para garantir consistência entre Venda, Itens e Estoque
        $this->db->beginTransaction();

        try {
            // 1. Gravar Venda Principal
            $sql = "INSERT INTO sales (client_id, total_amount, discount, final_amount, payment_method, status) 
                    VALUES (:client_id, :total_amount, :discount, :final_amount, :payment_method, :status)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                'client_id' => $sale->client_id,
                'total_amount' => $sale->total_amount,
                'discount' => $sale->discount,
                'final_amount' => $sale->final_amount,
                'payment_method' => $sale->payment_method,
                'status' => $sale->status
            ]);
            
            $saleId = (int)$this->db->lastInsertId();
            $sale->id = $saleId;

            // 2. Gravar Itens e Abater Estoque
            $sqlItem = "INSERT INTO sale_items (sale_id, product_id, product_name, quantity, unit_price, subtotal) 
                        VALUES (:sale_id, :product_id, :product_name, :quantity, :unit_price, :subtotal)";
            $stmtItem = $this->db->prepare($sqlItem);

            $sqlStock = "UPDATE products SET stock_quantity = stock_quantity - :qty WHERE id = :id";
            $stmtStock = $this->db->prepare($sqlStock);

            foreach ($sale->items as $item) {
                // Gravar o Item
                $stmtItem->execute([
                    'sale_id' => $saleId,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'subtotal' => $item->subtotal
                ]);

                // Abater o Estoque
                if ($item->product_id) {
                    $stmtStock->execute([
                        'qty' => $item->quantity,
                        'id' => $item->product_id
                    ]);
                }
            }

            // Confirma a Transação se tudo deu certo
            $this->db->commit();
            return true;

        } catch (Exception $e) {
            // Desfaz tudo se der erro (Rollback)
            $this->db->rollBack();
            throw new Exception("Erro ao processar venda: " . $e->getMessage());
        }
    }
    
    public function getById(int $id): ?Sale {
        $stmt = $this->db->prepare("SELECT * FROM sales WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) return null;
        
        $sale = new Sale($row);
        
        // Buscar Itens
        $stmtItems = $this->db->prepare("SELECT * FROM sale_items WHERE sale_id = :sale_id");
        $stmtItems->execute(['sale_id' => $id]);
        while ($itemRow = $stmtItems->fetch()) {
            $sale->items[] = new SaleItem($itemRow);
        }
        
        return $sale;
    }
}
