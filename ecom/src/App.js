import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);

  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || []
  );
  const [expenses, setExpenses] = useState(
    () => JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [users, expenses]);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info(`${currentUser.username} logged out successfully`);
    setCurrentUser(null);
    setPage("login");
  };

  return (
    <div>
      <ToastContainer />
      {page === "login" && (
        <Login
          setPage={setPage}
          setCurrentUser={setCurrentUser}
          users={users}
          setUsers={setUsers}
        />
      )}
      {page === "register" && (
        <Register
          setPage={setPage}
          users={users}
          setUsers={setUsers}
        />
      )}
      {page === "user" && currentUser && currentUser.role === "user" && (
        <UserDashboard
          currentUser={currentUser}
          expenses={expenses}
          setExpenses={setExpenses}
          handleLogout={handleLogout}
        />
      )}
      {page === "admin" && currentUser && currentUser.role === "admin" && (
        <AdminDashboard
          currentUser={currentUser}
          users={users}
          setUsers={setUsers}
          expenses={expenses}
          setExpenses={setExpenses}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}
