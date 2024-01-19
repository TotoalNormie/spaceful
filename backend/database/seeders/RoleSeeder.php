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
            'roleName' => 'Default',
            'read' => true,
            'write' => false,
            'manageUser' => false,
            'manageRoles' => false,
        ]);
        DB::table('users')->insert([
            'name' => 'Default',
            'password' => '$argon2id$v=19$m=65536,t=4,p=1$V3hocGpmbTRobmJsLnAvYw$ZUTkpVTisNKg7PXzEV+3eoqiHpQUERrODyGM1VLHMxQ',
            'roles_id' => 1,
        ]);
        DB::table('categories')->insert([
            'id' => 1,
            'categoryName' => 'Default',
        ]);
    }
}
