<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Laravel\Passport\Passport;


class UserTest extends TestCase
{
    /** @test */
    use WithFaker;

  
    public function user_can_register()
    {
        $this->withoutExceptionHandling();
        $payload = [
            'email' => $this->faker->email,
            'name' => $this->faker->name,
            'password' => $this->faker->password
        ];

       $response = $this->postJson('/api/register', $payload);
       $response 
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => ['user', 'accessToken']
            ]);
    }

     /** @test */
    public function user_can_login()
    {
        $this->withoutExceptionHandling();
        $payload = [
            'email' => 'bruce@test.com',
            'password' => '123'
        ];
        $response = $this->postJson('/api/login', $payload);
        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                ['data' => ['user', 'accessToken']]
            );
    }

    /** @test */
    public function user_cannot_login_if_credentials_are_invalid()
    {
        $payload = [
            'email' => 'test@test.com',
            'password' => '1234'
        ];

        $response = $this->postJson('/api/login', $payload);
        $response
                ->assertStatus(401)
                ->assertJson(
                    ['success' => false]
                );
    }
}
