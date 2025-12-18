import React from "react";
import { toast } from "react-toastify";
import "../styles/global.css";

export default function Navbar({ title, currentUser, handleLogout, onNavigate }) {
  const handleProfileClick = () => {
    toast(
      ({ closeToast }) => (
        <div className="logout-toast">
          <p>
            Logout <b>{currentUser.username}</b>?
          </p>

          <div className="toast-actions">
            <button
              className="btn-ok"
              onClick={() => {
                handleLogout();
                closeToast();
              }}
            >
              OK
            </button>

            <button className="btn-cancel" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h2>{title}</h2>
      </div>

      {/* CENTER */}
      <ul className="nav-menu">
        <li onClick={() => onNavigate("home")}>Home</li>
        <li onClick={() => onNavigate("reports")}>Reports</li>
      </ul>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="profile" onClick={handleProfileClick}>
          {currentUser.username[0].toUpperCase()}
        </div>
      </div>
    </nav>
  );
}
