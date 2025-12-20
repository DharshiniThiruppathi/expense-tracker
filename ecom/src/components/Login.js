import React, { useState } from "react";
import { toast } from "react-toastify";
export default function Login({ setPage, setCurrentUser, users }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
 const handleLogin = () => {
    if (!username || !password || !role) return toast.error("Fill all fields");

    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        const user = { username, role };
        sessionStorage.setItem("user", JSON.stringify(user));
        setCurrentUser(user);
        toast.success("Admin login successful");
        return setPage("admin");
      } else return toast.error("Invalid admin credentials");
    }

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return toast.error("User not registered");

    sessionStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    toast.success("User login successful");
    setPage("user");
  };
 return (
    <div className="page center">
      <div className="card">
        <h2 style={{textAlign:'center'}}>Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option><br></br>
        </select> <br></br>
        <button onClick={handleLogin}>Login</button>
        <p style={{marginTop:'10px',  textAlign:'center',fontSize:'0.8rem',fontWeight:'bolder',cursor:'pointer'}}onClick={() => setPage("register")}>Are You New here ? Register now</p>
      </div>
    </div>
  );
}
