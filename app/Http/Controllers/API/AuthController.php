<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterValidator;
use App\Models\User;

class AuthController extends Controller
{
    public function register (RegisterValidator $request)
    {
        $data = [];
        $request->merge(['password' => bcrypt($request->password)]);
        $request->except(['retype_password']);
        $user = User::create($request->all());
        $accessToken = $user->createToken('token')->accessToken;

        $data['user'] = $user;
        $data['accessToken'] = $accessToken;

        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }

    public function login (Request $request) 
    {
        $data = [];
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (!auth()->attempt($credentials)) {

            $data['user'] = 'Invalid Username and Password Combination';
            return response()->json([
                'success' => false,
                'data' => 'Invalid Username and Password Combination'
            ], 401);
        }
        else {
            $data['user'] = auth()->user();

            $data['accessToken'] = auth()->user()->createToken('token')->accessToken;
    
            return response()->json([
                'success' => true,
                'data' => $data
            ], 200);
        }

    }
}
