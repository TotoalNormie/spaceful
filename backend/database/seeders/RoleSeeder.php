<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('roles')->insert([
            'id' => 1,
            'roleName' => 'Administrator',
            'addnewproduct' => true,
            'addtowarehouse' => false,
            'itemsearch' => true,
            'productsearch' => true,
            'orders' => true,
            'reports' => true,
        ]);
        DB::table('roles')->insert([
            'roleName' => 'Shelve Sorter',
            'addnewproduct' => false,
            'addtowarehouse' => true,
            'itemsearch' => true,
            'productsearch' => false,
            'orders' => false,
            'reports' => false,
        ]);
        DB::table('roles')->insert([
            'roleName' => 'Warehouse Worker',
            'addnewproduct' => true,
            'addtowarehouse' => false,
            'itemsearch' => false,
            'productsearch' => true,
            'orders' => true,
            'reports' => true,

        ]);
        DB::table('users')->insert([
            'name' => 'amog',
            'password' => '$argon2id$v=19$m=65536,t=4,p=1$V3hocGpmbTRobmJsLnAvYw$ZUTkpVTisNKg7PXzEV+3eoqiHpQUERrODyGM1VLHMxQ',
            'email' => 'amog@amog.com',
            'roles_id' => 3,
        ]);
        DB::table('warehouse_apps')->insert([
            'id' => 1,
            'name' => 'amog',
            'user_id' => 1,
            'description' => 'Fitogus whyy chungbyte?',
        ]);
        DB::table('categories')->insert([
            'id' => 1,
            'warehouse_app_id' => 1,
            'categoryName' => 'Drink',
        ]);
        DB::table('categories')->insert([
            'id' => 2,
            'warehouse_app_id' => 1,
            'categoryName' => 'Food',
        ]);
        DB::table('categories')->insert([
            'id' => 3,
            'warehouse_app_id' => 1,
            'categoryName' => 'Keychain',
        ]);
        DB::table('products')->insert([
            'name' => 'Amognus Energy',
            'categories_id' => 1,
            'warehouse_app_id' => 1,
            'price' => 0.99,
            'weight' => 0.5,
            'img' => 'https://i.redd.it/qy388n9zpxp81.jpg',
            'supplier' => 'Mognus llc.',
        ]);
        DB::table('products')->insert([
            'name' => 'Amognst a Cake in a cup?',
            'categories_id' => 2,
            'warehouse_app_id' => 1,
            'price' => 0.99,
            'weight' => 0.5,
            'img' => 'https://flaircakeboutique.com/wp-content/uploads/2021/04/among-us-cupcake.jpg',
            'supplier' => 'Mognus llc.',
        ]);
        DB::table('products')->insert([
            'name' => 'Amogns keyčain?',
            'categories_id' => 3,
            'warehouse_app_id' => 1,
            'price' => 1.99,
            'weight' => 0.101,
            'img' => 'https://www.babystore.lv/img/lg/products/145961/0vbik4vj4t.jpg',
            'supplier' => 'Mognus llc.',
        ]);
        DB::table('warehouses')->insert([
            'products_id' => 1,
            'warehouse_app_id' => 1,
            'shelfId' => '1V',
            'amount' => 48,
        ]);
        DB::table('warehouses')->insert([
            'products_id' => 2,
            'warehouse_app_id' => 1,
            'shelfId' => '4C',
            'amount' => 36,
        ]); 
        DB::table('warehouses')->insert([
            'products_id' => 3,
            'warehouse_app_id' => 1,
            'shelfId' => '9J',
            'amount' => 11,
        ]);
        DB::table('orders')->insert([
            'products_id' => 1,
            'orderType' => 'Buy',
            'supplier' => 'ChungByte Industries Inc.',
            'amount' => 11,
            'sum' => 10.89,
            'status' => 1,
        ]);
        DB::table('orders')->insert([
            'products_id' => 1,
            'orderType' => 'Sell',
            'supplier' => 'ChungByte Industries Inc.',
            'amount' => 5,
            'sum' => 4.95,
            'status' => 1,
        ]);
        DB::table('orders')->insert([
            'products_id' => 2,
            'orderType' => 'Sell',
            'supplier' => 'ChungByte Industries Inc.',
            'amount' => 7,
            'sum' => 6.93,
            'status' => 0,
        ]);
        DB::table('orders')->insert([
            'products_id' => 3,
            'orderType' => 'Buy',
            'supplier' => 'ChungByte Industries Inc.',
            'amount' => 27,
            'sum' => 53.73,
            'status' => 0,
        ]);
        DB::table('orders')->insert([
            'products_id' => 1,
            'orderType' => 'Sell',
            'supplier' => 'ChungByte Industries Inc.',
            'amount' => 71,
            'sum' => 70.29,
            'status' => 1,
        ]);
    }
}
