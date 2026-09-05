import { useState } from "react";
import "./index.css";
import StudentDashboard from "./studentDashboard";
import TeacherDashboard from "./teacherDashboard";
import AdminDashboard from "./AdminDashboard";
import ManagementDashboard from "./ManagementDashboard";
function App() {
  const [page, setPage] = useState("login");
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const credentials = {
    Student: {
      username: "STU1001",
      password: "student123",
    },

    Teacher: {
      username: "TCH1001",
      password: "teacher123",
    },

    Admin: {
      username: "ADM1001",
      password: "admin123",
    },

    Management: {
      username: "MGT1001",
      password: "management123",
    },
  };

  const roles = [
    {
      name: "Student",
      icon: "🎓",
    },
    {
      name: "Teacher",
      icon: "👨‍🏫",
    },
    {
      name: "Admin",
      icon: "🛡️",
    },
    {
      name: "Management",
      icon: "🏢",
    },
  ];

  const selectRole = (role) => {
    setSelectedRole(role);
    setUsername("");
    setPassword("");
    setError("");
    setPage("roleLogin");
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: selectedRole,
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setError("");
      setPage("dashboard");
    } else {
      setError(data.message);
    }
  } catch (error) {
    console.error(error);
    setError("Backend server is not running.");
  }
};

  const logout = () => {
    setPage("login");
    setSelectedRole("");
    setUsername("");
    setPassword("");
    setError("");
  };

  /* STUDENT DASHBOARD */
if (page === "dashboard" && selectedRole === "Student") {
  return <StudentDashboard />;
}

if (page === "dashboard" && selectedRole === "Teacher") {
  return <TeacherDashboard />;
}
if (page === "dashboard" && selectedRole === "Admin") {
  return <AdminDashboard />;
}
if (page === "dashboard" && selectedRole === "Management") {
  return <ManagementDashboard />;
}
  return (
    <div className="app">
      <div className="login-card">

        {/* MAIN LOGIN */}
        {page === "login" && (
          <>
            <div className="logo">🏫</div>

            <h1>College Management System</h1>

            <p className="subtitle">
              Welcome to the College Management System
            </p>

            <button
              className="main-button"
              onClick={() => setPage("roles")}
            >
              Login
            </button>
          </>
        )}

        {/* ROLE SELECTION */}
        {page === "roles" && (
          <>
            <h2>Select Your Role</h2>

            <p className="subtitle">
              Choose your account type to continue
            </p>

            <div className="role-grid">
              {roles.map((role) => (
                <button
                  key={role.name}
                  className="role-card"
                  onClick={() => selectRole(role.name)}
                >
                  <span className="role-icon">
                    {role.icon}
                  </span>

                  <span>{role.name}</span>
                </button>
              ))}
            </div>

            <button
              className="back-button"
              onClick={() => setPage("login")}
            >
              ← Back to Login
            </button>
          </>
        )}

        {/* ROLE LOGIN */}
        {page === "roleLogin" && (
          <>
            <div className="role-large-icon">
              {selectedRole === "Student" && "🎓"}
              {selectedRole === "Teacher" && "👨‍🏫"}
              {selectedRole === "Admin" && "🛡️"}
              {selectedRole === "Management" && "🏢"}
            </div>

            <h2>{selectedRole} Login</h2>

            <p className="subtitle">
              Enter your username and password
            </p>

            <form
              onSubmit={handleLogin}
              className="login-form"
            >
              <label>Username / ID</label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder={`Enter ${selectedRole} username`}
                required
              />

              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
              />

              {error && (
                <p className="error-message">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="main-button"
              >
                Login
              </button>
            </form>

            <button
              className="back-button"
              onClick={() => setPage("roles")}
            >
              ← Back to Role Selection
            </button>
          </>
        )}

        <div className="footer">
          © 2026 College Management System
        </div>

      </div>
    </div>
  );
}

export default App;
