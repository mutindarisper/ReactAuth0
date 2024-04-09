import React from 'react'
import { useEffect, useRef, useState } from 'react'
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { Button } from 'primereact/button';

import { InputText } from 'primereact/inputtext';

import { supabase } from '../lib/helper/supabaseClient'

const Todo = ({ user }) => {
    const inputRef = useRef()
    const [error, seterror] = useState(null)
    const [todo, settodo] = useState([])

    const logOut = async () => {
        await supabase.auth.signOut({

        })
    }


    const handleCreateTodo = async () => {
        //CONNECT SUPABASE TABLE
        const title = inputRef.current.value
        console.log(title)
        const response = await supabase
            .from("todo").
            insert({ title, user_id: user.id })
            .select('*')
            .single()

        // console.log(response)
        seterror(response.error)
        if(response.data) {
            settodo((currentTodo) => [...currentTodo, response.data])
        }
    }
    const getTodo = async () => {
       const response =  await supabase
        .from("todo")
        .select("*")
        // console.log(response)
        settodo(response.data)
        seterror(response.error)
    }

    const handleUpdate = async (id) => {
        const response = await supabase.from("todo")
        .update({complete:true})
        .eq("id", id)
        .select("*")
        .single()

        // console.log(response)
        if(!response.error){
            settodo((currentTodo) => 
            currentTodo.map((todo) => {
                    if(todo.id === id){
                        todo.complete = true
                    }
                    return todo
                })
            )
        }
        else{
            seterror(response.error)
        }
    }

    useEffect(() => {
      
        getTodo()
     
    }, [])
    
    return (
        <div>
            <div className="card flex justify-content-center">
                <h1>React supabase database CRUD and policy</h1>
                <InputText ref={inputRef} />
                <Button severity="success" label="Add" onClick={handleCreateTodo} />
                {error && <pre>{error.message}</pre>}
            </div>
            <Button severity="success" label="Logout" onClick={logOut} />



            {todo.map((value, index) => {
                return (
                    <div key={index}>
                        <h2 style={{
                            textDecoration : value.complete ?
                            'line-through' : ''
                        }}>{value.title}</h2>
                          <Button severity="info" label="Complete"  />
                          <Button severity="danger" label="Delete"  />
                    </div>
                )
            })}
        </div>
    )
}

export default Todo