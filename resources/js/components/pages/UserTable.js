import React from 'react'
import {
    Table
} from 'reactstrap'

const UserTable = ( {users} ) => {
    
    return(
        <Table  striped bordered>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                { users && users.map( user => {
                    return (
                        <tr key= {user.id} >
                            <td> {user.name} </td>
                            <td> {user.email} </td>
                        </tr>
                    )
                }) }
            </tbody>
        </Table> 
    )
}

export default UserTable