import React, { useState } from "react";

export default function Sidebar({ parameters, onSelectParameter, selectedIndex }) {
  const [open, setOpen] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleSidebar = () => setOpen((o) => !o);

  const handleClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      onSelectParameter(null);
    } else {
      setExpandedIndex(index);
      onSelectParameter(index);
    }
  };

  return (
    <div
      style={{
        width: open ? 280 : 60,
        transition: "width 0.3s",
        height: "100vh",
        background: "#1e1e2f",
        color: "#eee",
        overflowY: "auto",
        boxShadow: "2px 0 8px rgba(0,0,0,0.7)",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          background: "none",
          border: "none",
          color: "#eee",
          fontSize: 24,
          padding: "15px 20px",
          cursor: "pointer",
          width: "100%",
          textAlign: open ? "right" : "center",
          outline: "none",
          borderBottom: "1px solid #333",
          transition: "background-color 0.3s",
        }}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        title={open ? "Close sidebar" : "Open sidebar"}
      >
        {open ? "⮜" : "☰"}
      </button>

      {/* Parameter List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: 10,
          flexGrow: 1,
        }}
      >
        {parameters?.map((param, index) => (
          <li key={param.name}>
            <div
              onClick={() => handleClick(index)}
              style={{
                cursor: "pointer",
                padding: "14px 20px",
                borderBottom: "1px solid #333",
                fontWeight: "700",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:
                  selectedIndex === index ? "#3a3a5c" : "transparent",
                transition: "background-color 0.3s",
                userSelect: "none",
              }}
              title={param.name}
            >
              <span>{open ? param.name : param.name[0]}</span>
              {open && (
                <span style={{ fontSize: 20 }}>
                  {selectedIndex === index ? "−" : "+"}
                </span>
              )}
            </div>

            {open && selectedIndex === index && (
              <div
                style={{
                  padding: "12px 20px",
                  fontSize: 14,
                  color: "#ccc",
                  backgroundColor: "#2e2e4a",
                  whiteSpace: "normal",
                  transition: "max-height 0.3s ease",
                }}
              >
                {param.details}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
