import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <h1>Welcome to My Recipe Website</h1>
      <div>
        {location.pathname !== "/login" && <Link to="/login">Log In</Link>}
      </div>
    </header>
  );
}
