<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateSalesTables extends AbstractMigration
{
    public function change(): void
    {
        // Tabela de Vendas (sales)
        $sales = $this->table('sales');
        $sales->addColumn('client_id', 'integer', ['null' => true])
              ->addColumn('total_amount', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0.00])
              ->addColumn('discount', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0.00])
              ->addColumn('final_amount', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0.00])
              ->addColumn('payment_method', 'string', ['limit' => 50, 'null' => false]) // dinheiro, pix, cartao_credito, cartao_debito
              ->addColumn('status', 'string', ['limit' => 20, 'default' => 'completed']) // completed, canceled
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              ->addForeignKey('client_id', 'clients', 'id', ['delete'=> 'SET_NULL', 'update'=> 'NO_ACTION'])
              ->create();

        // Tabela de Itens da Venda (sale_items)
        $items = $this->table('sale_items');
        $items->addColumn('sale_id', 'integer', ['null' => false])
              ->addColumn('product_id', 'integer', ['null' => true])
              ->addColumn('product_name', 'string', ['limit' => 200, 'null' => false]) // Salva nome caso o produto seja deletado depois
              ->addColumn('quantity', 'integer', ['null' => false])
              ->addColumn('unit_price', 'decimal', ['precision' => 10, 'scale' => 2, 'null' => false])
              ->addColumn('subtotal', 'decimal', ['precision' => 10, 'scale' => 2, 'null' => false])
              ->addForeignKey('sale_id', 'sales', 'id', ['delete'=> 'CASCADE', 'update'=> 'NO_ACTION'])
              ->addForeignKey('product_id', 'products', 'id', ['delete'=> 'SET_NULL', 'update'=> 'NO_ACTION'])
              ->create();
    }
}
