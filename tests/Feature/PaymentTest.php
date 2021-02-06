<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Cartalyst\Stripe\Stripe;

use Laravel\Passport\Passport;

class PaymentTest extends TestCase
{
   /** @test */

   use WithFaker;

   public function test_user_can_pay () 
   {

        $user = User::factory()->create();

        $stripe = Stripe::make(env('STRIPE_SECRET'));

        $token = $stripe->tokens()->create([
        'card' => [ 
                'number' => '4242424242424242',
                'exp_month' => 6,
                'exp_year' => 2024,
                'cvc' => 756
            ],
        ]);
        Passport::actingAs($user);
         $payload = [
            'amount' => 1000,
            'currency' => 'PHP',
            'stripeToken' => $token['id'],
            'description' => 'random',
         ];

         $response = $this->postJson('/api/payment', $payload);

         $response->assertStatus(200)
                  ->assertJsonStructure([
                         'data' => ['amount','id']
                    ]);

   }

   /** @test */
   public function user_can_retrieve_charges() 
   {
        $stripe = Stripe::make(env('STRIPE_SECRET'));
        
        $user = User::factory()->create();
        Passport::actingAs($user);

        $response = $this->getJson('/api/payment');
  
        $response->assertJsonStructure([
            'data' => [
                'data' => [['id']]
            ]
        ]);
      
   }
}
