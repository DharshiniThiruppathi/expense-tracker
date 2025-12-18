import React, { useState } from "react";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import "../styles/admin.css";

export default function AdminDashboard({
  currentUser,
  users,
  setUsers,
  expenses,
  setExpenses,
  handleLogout
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterCategory, setFilterCategory] = useState("select items");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState("home"); // ✅ NEW

  const itemsPerPage = 5;

  const updateStatus = (id, status) => {
    setExpenses(expenses.map(e => (e.id === id ? { ...e, status } : e)));
    toast.success(`Expense ${status}`);
  };

  const filteredExpenses = expenses
    .filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      e => filterCategory === "select items" || e.category === filterCategory
    )
    .sort((a, b) => {
      if (sort === "dateNew") return new Date(b.date) - new Date(a.date);
      if (sort === "dateOld") return new Date(a.date) - new Date(b.date);
      if (sort === "amtHigh") return b.amount - a.amount;
      if (sort === "amtLow") return a.amount - b.amount;
      return 0;
    });

  const expensesLast = currentPage * itemsPerPage;
  const expensesFirst = expensesLast - itemsPerPage;

  const usersLast = currentPage * itemsPerPage;
  const usersFirst = usersLast - itemsPerPage;

  return (
    <div className="page">
      {/* ✅ NAVBAR WITH NAVIGATION */}
      <Navbar
        title="💳 Admin Dashboard"
        currentUser={currentUser}
        handleLogout={handleLogout}
        onNavigate={setActivePage}
      /> <br></br>
      <br></br>

      {/* ================= HOME PAGE ================= */}
      {activePage === "home" && (
        <>
          {/* Search & Filter */}
          <div className="search">
            <input
              placeholder=" 🔎Search title"
              onChange={e => setSearch(e.target.value)}
            />
            <select onChange={e => setFilterCategory(e.target.value)}>
              <option>select items</option>
              <option>Hardware</option>
              <option>Software</option>
              <option>Travel</option>
              <option>Others</option>
            </select>
            <select onChange={e => setSort(e.target.value)}>
              <option value="">Sort</option>
              <option value="dateNew">Date New → Old</option>
              <option value="dateOld">Date Old → New</option>
              <option value="amtHigh">Amount High → Low</option>
              <option value="amtLow">Amount Low → High</option>
            </select>
          </div>

          {/* Expenses Table */}
          <div className="table-container">
            <h3>All Expenses</h3>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses
                  .slice(expensesFirst, expensesLast)
                  .map(e => {
                    const userExp = expenses.filter(
                      x => x.username === e.username
                    );
                    return (
                      <tr key={e.id}>
                        <td>{e.username}</td>
                        <td>{e.title}</td>
                        <td>{e.category}</td>
                        <td>₹{e.amount}</td>
                        <td>{e.date}</td>
                        <td>{e.status}</td>
                        <td>
                          <button onClick={() => updateStatus(e.id, "Approved")}>
                            Approve
                          </button>
                          <br />
                          <button onClick={() => updateStatus(e.id, "Declined")}>
                            Decline
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              alert(
                                `User: ${e.username}\nTotal Expenses: ${
                                  userExp.length
                                }\n` +
                                  userExp
                                    .map(
                                      (x, i) =>
                                        `${i + 1}. ${x.title} - ₹${x.amount}`
                                    )
                                    .join("\n")
                              )
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              total={filteredExpenses.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Registered Users Table */}
          <div className="table-container">
            <h3>Registered Users</h3>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(usersFirst, usersLast).map(u => (
                  <tr key={u.username}>
                    <td>{u.username}</td>
                    <td>{u.password}</td>
                    <td>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(`Delete user ${u.username}?`)
                          ) {
                            setUsers(
                              users.filter(
                                user => user.username !== u.username
                              )
                            );
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              total={users.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}

      {/* ================= REPORTS PAGE ================= */}
      {activePage === "reports" && (
        <div className="table-container">
          <h3>Expense Reports</h3>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Title</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td>{e.username}</td>
                  <td>{e.title}</td>
                  <td>{e.date}</td>
                  <td>₹{e.amount}</td>
                  <td>{e.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
