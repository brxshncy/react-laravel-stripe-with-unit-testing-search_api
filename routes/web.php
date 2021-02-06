<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Http\Request;

use Cartalyst\Stripe\Stripe;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('test', function (){
    dd(config('app.stripe'));
    $stripe = Stripe::make('sk_test_51HTQZqGxwQufiUoYvUc236iQOKqNcDgEdIP3087G1E7zK3zlb2cLle8RagTPqXfRTuwTg1mUOi1ktFwIwpBtk4GE00iMrbeSB5');
    $customers = $stripe->charges()->all();
    return $customers;
});



Route::any('/{any}', function () {

    return view('welcome');

    
})->where('any', '.*');

