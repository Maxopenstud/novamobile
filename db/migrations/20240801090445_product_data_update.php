<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class ProductDataUpdate extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        $table = $this->table(DB_PREFIX.'product');

        // this is a fix, because phinx cannot understand default value for date as "0000-00-00"
        $table->changeColumn('date_available', 'datetime', [
            'null' => true,
            'default' => null,
        ]);

        $table->addColumn('data', 'integer', [
            'default' => 0,
            'null' => false,
            'after' => 'status',
        ]);
        $table->addColumn('validity', 'integer', [
            'null' => false,
            'after' => 'data',
        ]);

        $table->update();
    }
}
