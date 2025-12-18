import React, { useState } from "react";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import "../styles/user.css";

export default function UserDashboard({
  currentUser,
  expenses,
  setExpenses,
  handleLogout
}) {
  // 🔹 NEW: navigation state
  const [activeTab, setActiveTab] = useState("home");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select items");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterCategory, setFilterCategory] = useState("Select items");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // 🔹 EXISTING FUNCTION (UNCHANGED)
  const addExpense = () => {
    if (!title || !amount || !date) {
      return toast.error("Enter all details");
    }

    const newExp = {
      id: Date.now(),
      username: currentUser.username,
      title,
      category,
      date,
      amount: Number(amount),
      desc,
      status: "Pending"
    };

    setExpenses([...expenses, newExp]);
    toast.success("Expense added successfully");

    setTitle("");
    setAmount("");
    setCategory("Hardware");
    setDate("");
    setDesc("");
  };

  // 🔹 EXISTING FILTER LOGIC (UNCHANGED)
  const filteredExpenses = expenses
    .filter(e => e.username === currentUser.username)
    .filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      e =>
        filterCategory === "Select items" || e.category === filterCategory
    )
    .sort((a, b) => {
      if (sort === "dateNew") return new Date(b.date) - new Date(a.date);
      if (sort === "dateOld") return new Date(a.date) - new Date(b.date);
      if (sort === "amtHigh") return b.amount - a.amount;
      if (sort === "amtLow") return a.amount - b.amount;
      return 0;
    });

  const last = currentPage * itemsPerPage;
  const first = last - itemsPerPage;
  const visibleExpenses = filteredExpenses.slice(first, last);

  return (
    <div className="page">
      {/* 🔹 NAVBAR (ADDED ONLY) */}
      <Navbar
        title="💳 User Dashboard"
        currentUser={currentUser}
        handleLogout={handleLogout}
        onNavigate={setActiveTab}
      /><br></br>
      <br></br>

      {/* ================= HOME TAB ================= */}
      {activeTab === "home" && (
        <>
          {/* Add Expense */}
          <div className="card">
            <h3>Add Expense</h3>

            <input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />

            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />

            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option>Select items</option>
              <option>Hardware</option>
              <option>Software</option>
              <option>Travel</option>
              <option>Others</option>
            </select>

            <textarea
              placeholder="Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={addExpense}>Add</button>
              <button
                onClick={() => {
                  setTitle("");
                  setAmount("");
                  setCategory("Hardware");
                  setDate("");
                  setDesc("");
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="search">
            <input
              placeholder="🔎Search title"
              onChange={e => setSearch(e.target.value)}
            />

            <select onChange={e => setFilterCategory(e.target.value)}>
              <option>Select items</option>
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
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {visibleExpenses.map(e => (
                  <tr key={e.id}>
                    <td>{e.title}</td>
                    <td>{e.category}</td>
                    <td>₹{e.amount}</td>
                    <td>{e.date}</td>
                    <td>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            total={filteredExpenses.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {/* ================= REPORTS TAB ================= */}
      {activeTab === "reports" && (
        <div className="table-container">
          <h3>User Expense Report</h3>

          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Title</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {expenses
                .filter(e => e.username === currentUser.username)
                .map(e => (
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
