<?php

require_once('config.php');
return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/db/migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/db/seeds'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => 'development',
        'production' => [
            'adapter' => 'mysql',
            'host' => DB_HOSTNAME,
            'name' => DB_DATABASE,
            'user' => DB_USERNAME,
            'pass' => DB_PASSWORD,
            'port' => DB_PORT,
            'charset' => 'utf8',
        ],
        'development' => [
            'adapter' => 'mysql',
            'host' => DB_HOSTNAME,
            'name' => DB_DATABASE,
            'user' => DB_USERNAME,
            'pass' => DB_PASSWORD,
            'port' => DB_PORT,
            'charset' => 'utf8',
        ],
        'testing' => [
            'adapter' => 'mysql',
            'host' => DB_HOSTNAME,
            'name' => DB_DATABASE,
            'user' => DB_USERNAME,
            'pass' => DB_PASSWORD,
            'port' => DB_PORT,
            'charset' => 'utf8',
        ]
    ],
    'version_order' => 'creation'
];
