<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Cartalyst\Stripe\Stripe;
use Laravel\Passport\Passport;


class SearchUserTest extends TestCase
{
    /** @test */

    public function check_if_logged_in_user_can_search () {

        $user = User::factory()->create();
        Passport::actingAs($user);
        $payload = [
                'name' => 'bruce',
                'email' => 'bruce@test.com'
            ];
        $response = $this->getJson('/api/search', $payload);

      
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [['name']]
                 ]);
    }
}
