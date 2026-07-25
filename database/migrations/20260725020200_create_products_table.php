<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateProductsTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('products');
        $table->addColumn('sku', 'string', ['limit' => 50, 'null' => false])
              ->addColumn('barcode', 'string', ['limit' => 100, 'null' => true])
              ->addColumn('name', 'string', ['limit' => 200, 'null' => false])
              ->addColumn('description', 'text', ['null' => true])
              ->addColumn('category', 'string', ['limit' => 100, 'null' => true])
              ->addColumn('cost_price', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0.00])
              ->addColumn('sale_price', 'decimal', ['precision' => 10, 'scale' => 2, 'default' => 0.00])
              ->addColumn('stock_quantity', 'integer', ['default' => 0])
              ->addColumn('min_stock', 'integer', ['default' => 5])
              ->addColumn('status', 'boolean', ['default' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              ->addIndex(['sku'], ['unique' => true])
              ->addIndex(['barcode'])
              ->addIndex(['category'])
              ->create();
    }
}
