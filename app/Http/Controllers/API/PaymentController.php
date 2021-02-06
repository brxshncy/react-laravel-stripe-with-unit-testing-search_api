<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Cartalyst\Stripe\Stripe;
use App\Models\UserPaid;

class PaymentController extends Controller
{

    public function index() {

       
        $stripe = Stripe::make(config('app.stripe'));
        $customers = $stripe->charges()->all();


        return response()->json([
            'success' => true,
            'data' => $customers
        ], 200);


    }
    public function store(Request $request) 
    {
        
        try {
                $stripe = Stripe::make(config('app.stripe'));
                $charge = $stripe->charges()->create([
                    'amount' => $request->amount,
                    'currency' =>  $request->currency,
                    'source' => $request->stripeToken,
                    'description' => $request->description,
                    'receipt_email' => $request->email,
                    'metadata' => [
                        'address' => $request->address,
                        'address_country' => $request->address_country,
                        'address_line1' => $request->address_line1,
                        
                    ]
                ]);

                return response()->json([
                    'success' => true,
                     'data' => $charge,
                ], 200);
        }
        catch (Exception $e) {

        }

    }

    
}
