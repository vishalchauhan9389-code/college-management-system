import React, { useState } from "react";
import StudentManagement from "./studentManagement";
import TeacherManagement from "./teacherManagement";
import SubjectManagement from "./subjectManagement";
import AttendanceManagement from "./attendanceManagement";
import AssignmentManagement from "./assignmentManagement";
import MarksManagement from "./marksManagement";
import UserManagement from "./userManagement";
const ManagementDashboard = () => {
  const [selectedModule, setSelectedModule] = useState("");

  const managementModules = [
    {
      page: "students",
      icon: "👨‍🎓",
      title: "Student Management",
      description: "Manage student records",
    },
    {
      page: "teachers",
      icon: "👨‍🏫",
      title: "Teacher Management",
      description: "Manage teacher records",
    },
    {
      page: "subjects",
      icon: "📚",
      title: "Subject Management",
      description: "Manage subjects",
    },
    {
      page: "attendance",
      icon: "📊",
      title: "Attendance Management",
      description: "Manage attendance",
    },
    {
      page: "assignments",
      icon: "📝",
      title: "Assignment Management",
      description: "Manage assignments",
    },
    {
      page: "marks",
      icon: "📈",
      title: "Marks & Results",
      description: "Manage marks and results",
    },
    {
      page: "users",
      icon: "👥",
      title: "User Management",
      description: "Manage users",
    },
  ];
if (selectedModule === "students") {
  return (
    <div>
      <button
        className="back-management-btn"
        onClick={() => setSelectedModule("")}
      >
        ← Back to Management System
      </button>
      <StudentManagement />
    </div>
  );
}

if (selectedModule === "teachers") {
  return (
    <div>
      <button
        className="back-management-btn"
        onClick={() => setSelectedModule("")}
      >
        ← Back to Management System
      </button>
      <TeacherManagement />
    </div>
  );
}

if (selectedModule === "subjects") {
  return (
    <div>
      <button
        className="back-management-btn"
        onClick={() => setSelectedModule("")}
      >
        ← Back to Management System
      </button>
      <SubjectManagement />
    </div>
  );
}

if (selectedModule === "attendance") {
  return (
    <div>
      <button
        className="back-management-btn"
        onClick={() => setSelectedModule("")}
      >
        ← Back to Management System
      </button>
      <AttendanceManagement />
    </div>
  );
}

if (selectedModule === "assignments") {
  return (
    <div>
      <button
        className="back-management-btn"
        onClick={() => setSelectedModule("")}
      >
        ← Back to Management System
      </button>
      <AssignmentManagement />
    </div>
  );
}

if (selectedModule === "marks") {
  return (
    <div>
      <button
        className="back-management-btn"
        onClick={() => setSelectedModule("")}
      >
        ← Back to Management System
      </button>
      <MarksManagement />
    </div>
  );
}

if (selectedModule === "users") {
  return (
    <div>
      <button
        className="back-management-btn"
        onClick={() => setSelectedModule("")}
      >
        ← Back to Management System
      </button>
      <UserManagement />
    </div>
  );
}
  if (selectedModule === "students") {
    return <StudentManagement />;
  }
if (selectedModule === "teachers") {
  return <TeacherManagement />;
}
if (selectedModule === "subjects") {
  return <SubjectManagement />;
}
if (selectedModule === "attendance") {
  return <AttendanceManagement />;
}
if (selectedModule === "assignments") {
  return <AssignmentManagement />;
}
if (selectedModule === "marks") {
  return <MarksManagement />;
}
if (selectedModule === "users") {
  return <UserManagement />;
}
  return (
    <div className="management-dashboard">
      <div className="management-header">
        <h1>⚙️ Management System</h1>
        <p>Manage all college operations from one place</p>
      </div>

      <div className="management-grid">
        {managementModules.map((module) => (
          <div className="management-card" key={module.page}>
            <div className="management-icon">
              {module.icon}
            </div>

            <h2>{module.title}</h2>

            <p>{module.description}</p>

            <button onClick={() => setSelectedModule(module.page)}>
              Open →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementDashboard;