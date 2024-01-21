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
            'roleName' => 'Plauktu Kartotajs',
            'read' => true,
            'write' => true,
            'manageUser' => false,
            'manageRoles' => false,
        ]);
        DB::table('roles')->insert([
            'id' => 2,
            'roleName' => 'Noliktavas Darbinieks',
            'read' => true,
            'write' => true,
            'manageUser' => false,
            'manageRoles' => false,
            'createReports' => true,
            'createOrders' => true,
            'manageCategories' => true

        ]);
        DB::table('roles')->insert([
            'id' => 3,
            'roleName' => 'Administrators',
            'read' => true,
            'write' => true,
            'manageUser' => true,
            'manageRoles' => true,
            'managePermissions' => true,
            'createReports' => true,
            'createOrders' => true,
            'manageCategories' => true
        ]);
        DB::table('users')->insert([
            'name' => 'amog',
            'password' => '$argon2id$v=19$m=65536,t=4,p=1$V3hocGpmbTRobmJsLnAvYw$ZUTkpVTisNKg7PXzEV+3eoqiHpQUERrODyGM1VLHMxQ',
            'roles_id' => 1,
        ]);
        DB::table('categories')->insert([
            'id' => 1,
            'categoryName' => 'Default',
        ]);
    }
}
