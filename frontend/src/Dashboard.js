import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Chart from "chart.js/auto";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import CalendarView from "./CalendarView";
import ConfirmModal from "./ConfirmModal";
import { categoryColors } from "./constants";
import "./style.css";
import icon from "./icon.jpg";
import axios from "axios";

// Layout wrapper
const Layout = ({ children, totalAmount, onReset }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  return (
    <div className="main-content">
      {isHome ? (
        <header className="main-header">
          <div className="header-left">
            <img src={icon} className="header-icon" alt="logo" />
            <div>
              <h1 className="header-title">Tesseract</h1>
              <p className="header-subtitle">
                Analyses your finances 4-Dimensionally
              </p>
            </div>
          </div>
          <div className="header-right">
            <p className="total-expenses-label">Total Expenses</p>
            <span className="total-expenses-amount">₹{totalAmount}</span>
          </div>
        </header>
      ) : (
        <header className="main-header">
          <button
            onClick={() => navigate("/dashboard")}
            className="back-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="back-button-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Home</span>
          </button>
          <h1 className="header-title">
            {location.pathname === "/dashboard/history"
              ? "Transaction History"
              : "Calendar View"}
          </h1>
        </header>
      )}

      <div className="navigation-tabs">
        <button
          onClick={() => navigate("/dashboard")}
          className={`nav-button ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => navigate("/dashboard/history")}
          className={`nav-button ${
            location.pathname === "/dashboard/history" ? "active" : ""
          }`}
        >
          Transaction History
        </button>
        <button
          onClick={() => navigate("/dashboard/calendar")}
          className={`nav-button ${
            location.pathname === "/dashboard/calendar" ? "active" : ""
          }`}
        >
          Calendar View
        </button>
        <button onClick={() => navigate("/")} className="nav-button logout-button">
          Logout
        </button>
      </div>

      {children}
    </div>
  );
};

// Dashboard
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const location = useLocation();

  // Fetch expenses on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:8080/api/expenses/user/${userId}`)
      .then((response) => setExpenses(response.data))
      .catch((error) =>
        console.error("Error fetching user-specific expenses:", error)
      );
  }, []);

  // Re-render pie chart whenever expenses or route changes
  useEffect(() => {
    if (location.pathname !== "/dashboard" && location.pathname !== "/dashboard/") {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
      return;
    }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const userId = localStorage.getItem("userId");
    const categoryTotals = expenses
      .filter((expense) => expense.user?.id?.toString() === userId)
      .reduce((acc, expense) => {
        const cat = expense.category;
        const amt = parseFloat(expense.amount);
        acc[cat] = acc[cat] ? acc[cat] + amt : amt;
        return acc;
      }, {});

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const backgroundColors = labels.map(
      (label) => categoryColors[label] || "#d1d3d3"
    );

    if (labels.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: { labels, datasets: [{ data, backgroundColor: backgroundColors }] },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.label || "";
                  if (label) label += ": ";
                  if (context.parsed !== null)
                    label += new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(context.parsed);
                  return label;
                },
              },
            },
          },
        },
      });
    }
  }, [expenses, location]);

  // Add expense and update chart instantly
  const handleAddExpense = async (expense) => {
    const userId = localStorage.getItem("userId");
    const expenseData = {
      ...expense,
      user: { id: userId },
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/expenses",
        expenseData
      );

      // ✅ Update local state immediately so chart updates
      setExpenses((prev) => [response.data, ...prev]);
      console.log("Expense added and chart updated!");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const resetData = () => setIsConfirmModalOpen(true);
  const confirmReset = () => {
    setExpenses([]);
    localStorage.removeItem("expenses");
    setIsConfirmModalOpen(false);
  };
  const cancelReset = () => setIsConfirmModalOpen(false);

  const totalAmount = expenses
    .reduce((sum, e) => sum + parseFloat(e.amount), 0)
    .toFixed(2);

  return (
    <Layout totalAmount={totalAmount} onReset={resetData}>
      <Routes>
        <Route
          index
          element={<HomePage onAddExpense={handleAddExpense} chartRef={chartRef} />}
        />
        <Route
          path="history"
          element={
            <HistoryPage
              expenses={expenses}
              filteredCategory={filteredCategory}
              setFilteredCategory={setFilteredCategory}
              deleteExpense={deleteExpense}
            />
          }
        />
        <Route
          path="calendar"
          element={
            <CalendarView
              expenses={expenses}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          }
        />
      </Routes>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={confirmReset}
        onCancel={cancelReset}
      />
    </Layout>
  );
};

export default Dashboard;
