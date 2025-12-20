import React, { useState } from "react";
import { toast } from "react-toastify";
export default function Register({ setPage, users, setUsers }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    if (!username || !password) return toast.error("Fill all fields");
    if (users.find(u => u.username === username)) return toast.error("User exists");
 const newUser = { username, password, role: "user" };
    setUsers([...users, newUser]);
    toast.success("Registered successfully");
    setPage("login");
  };
return (
    <div className="page center">
      <div className="card">
        <h2 style={{textAlign:'center'}}>Register</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
        <p  style={{textAlign:'center',fontSize:'0.8rem',fontWeight:'bolder',cursor:'pointer'}} onClick={() => setPage("login")}>Back to Login ?</p>
      </div>
    </div>
  );
}
