import React from "react";

export default function User({ user }) {
  return (
    <div className="user">
      <span>🟢</span> {user}
    </div>
  );
}
