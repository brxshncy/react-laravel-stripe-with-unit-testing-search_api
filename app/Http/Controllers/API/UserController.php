<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::orderBy('created_at','DESC')->get();

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

 
 

    public function store(Request $request)
    {
        //
    }


    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
        //
    }

   
    public function destroy($id)
    {
        //
    }

    public function searchUser(Request $request) {

        $user = User::search($request->userSearchKeyword)->get();

        return response()->json([
            'success' => true,
            'data' => $user
        ], 200);
    }
}
