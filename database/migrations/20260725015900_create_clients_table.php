<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateClientsTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('clients');
        $table->addColumn('name', 'string', ['limit' => 150, 'null' => false])
              ->addColumn('document', 'string', ['limit' => 20, 'null' => true, 'comment' => 'CPF ou CNPJ'])
              ->addColumn('email', 'string', ['limit' => 150, 'null' => true])
              ->addColumn('phone', 'string', ['limit' => 20, 'null' => true])
              ->addColumn('birthdate', 'date', ['null' => true])
              ->addColumn('zipcode', 'string', ['limit' => 10, 'null' => true])
              ->addColumn('address', 'string', ['limit' => 200, 'null' => true])
              ->addColumn('number', 'string', ['limit' => 20, 'null' => true])
              ->addColumn('complement', 'string', ['limit' => 100, 'null' => true])
              ->addColumn('neighborhood', 'string', ['limit' => 100, 'null' => true])
              ->addColumn('city', 'string', ['limit' => 100, 'null' => true])
              ->addColumn('state', 'string', ['limit' => 2, 'null' => true])
              ->addColumn('observations', 'text', ['null' => true])
              ->addColumn('status', 'boolean', ['default' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              ->addIndex(['document'], ['unique' => true])
              ->addIndex(['email'])
              ->create();
    }
}
