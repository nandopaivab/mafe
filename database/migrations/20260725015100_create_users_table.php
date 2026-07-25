<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateUsersTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('users');
        $table->addColumn('firebase_uid', 'string', ['limit' => 128, 'null' => false])
              ->addColumn('name', 'string', ['limit' => 100, 'null' => false])
              ->addColumn('email', 'string', ['limit' => 100, 'null' => false])
              ->addColumn('role', 'string', ['limit' => 20, 'default' => 'user'])
              ->addColumn('status', 'boolean', ['default' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              ->addIndex(['firebase_uid'], ['unique' => true])
              ->addIndex(['email'], ['unique' => true])
              ->create();
    }
}
