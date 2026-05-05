// import React from 'react'

import { useState } from "react"

const Form = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState(null)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({name,email,password})
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Enter name</label>  
      <input type="text" name='name' id="name" placeholder="Name"
      value={name}
      onChange={(e)=> setName(e.target.value)}
      required
      />
      <label htmlFor="email">Enter email</label>  
      <input type="email" name='email' id="email" placeholder="Email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      required
      />
      <label htmlFor="password">Enter password</label>  
      <input type="password" name='password' id="password" placeholder="Password"
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      required
      />

      <button type='submit'>Submit</button>
    </form>

    <div>
        {data && (
            <div>
                <div>
                <span>Name : <span>{name}</span></span>
            </div>
            <div>
                <span>Email : <span>{email}</span></span>
            </div>
            <div>
                <span>Password : <span>{password}</span></span>
            </div>
            </div>
        )}
    </div>
    </>


  )
}

export default Form
