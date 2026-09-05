import React, { useState } from "react";

function StudentDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
const [isEditingProfile, setIsEditingProfile] = useState(false);

const [profileData, setProfileData] = useState({
  name: "Rahul Kumar",
  studentId: "STU1001",
  rollNumber: "23CSE001",
  course: "B.Tech Computer Science",
  department: "Computer Science & Engineering",
  section: "CSE-A",
  semester: "4",
  email: "rahul.kumar@example.com",
  phone: "98XXXXXXXX",
  guardianName: "Rajesh Kumar",
  guardianPhone: "97XXXXXXXX",
});

const handleProfileChange = (e) => {
  const { name, value } = e.target;

  setProfileData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const saveProfile = () => {
  setIsEditingProfile(false);
};
  const menuItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "attendance", icon: "📊", label: "Attendance" },
    { id: "marks", icon: "📈", label: "Marks & Results" },
    { id: "assignments", icon: "📝", label: "Assignments" },
    { id: "timetable", icon: "🗓️", label: "Timetable" },
    { id: "notifications", icon: "🔔", label: "Notifications" },
  ];

  const attendance = [
    {
      subject: "Data Structures",
      present: 42,
      total: 48,
      percentage: 87.5,
    },
    {
      subject: "Database Management",
      present: 39,
      total: 45,
      percentage: 86.7,
    },
    {
      subject: "Operating Systems",
      present: 40,
      total: 46,
      percentage: 87,
    },
    {
      subject: "Computer Networks",
      present: 35,
      total: 42,
      percentage: 83.3,
    },
  ];

  const marks = [
    {
      subject: "Data Structures",
      internal: 18,
      external: 72,
      total: 90,
      grade: "A+",
    },
    {
      subject: "Database Management",
      internal: 17,
      external: 68,
      total: 85,
      grade: "A",
    },
    {
      subject: "Operating Systems",
      internal: 16,
      external: 65,
      total: 81,
      grade: "A",
    },
    {
      subject: "Computer Networks",
      internal: 18,
      external: 64,
      total: 82,
      grade: "A",
    },
    {
      subject: "Mathematics",
      internal: 19,
      external: 70,
      total: 89,
      grade: "A+",
    },
  ];

  const assignments = [
    {
      title: "Binary Tree Implementation",
      subject: "Data Structures",
      due: "15 August 2026",
      status: "Pending",
    },
    {
      title: "SQL Queries",
      subject: "Database Management",
      due: "12 August 2026",
      status: "Submitted",
    },
    {
      title: "Process Scheduling",
      subject: "Operating Systems",
      due: "18 August 2026",
      status: "Pending",
    },
    {
      title: "Computer Networks Report",
      subject: "Computer Networks",
      due: "20 August 2026",
      status: "Submitted",
    },
    {
      title: "Numerical Methods",
      subject: "Mathematics",
      due: "22 August 2026",
      status: "Pending",
    },
  ];

  const notifications = [
    {
      icon: "📢",
      title: "Internal Exam Schedule",
      message:
        "The internal examination schedule for Semester 4 has been published.",
      time: "2 hours ago",
      unread: true,
    },
    {
      icon: "📝",
      title: "Assignment Deadline",
      message:
        "DBMS assignment submission deadline is Friday, 14 August 2026.",
      time: "Yesterday",
      unread: true,
    },
    {
      icon: "📚",
      title: "New Study Material",
      message:
        "New Data Structures study material has been uploaded by your faculty.",
      time: "2 days ago",
      unread: true,
    },
    {
      icon: "📅",
      title: "Holiday Notice",
      message:
        "College will remain closed on 15 August on account of Independence Day.",
      time: "3 days ago",
      unread: false,
    },
    {
      icon: "🎓",
      title: "Scholarship Application",
      message:
        "Students can apply for the annual scholarship through the college portal.",
      time: "5 days ago",
      unread: false,
    },
  ];

  const timetable = [
    {
      time: "09:00 - 10:00",
      monday: "Data Structures",
      tuesday: "DBMS",
      wednesday: "Mathematics",
      thursday: "Operating Systems",
      friday: "Computer Networks",
      saturday: "Data Structures",
    },
    {
      time: "10:00 - 11:00",
      monday: "DBMS",
      tuesday: "Operating Systems",
      wednesday: "Data Structures",
      thursday: "Mathematics",
      friday: "DBMS",
      saturday: "Computer Networks",
    },
    {
      time: "11:30 - 12:30",
      monday: "Computer Networks",
      tuesday: "Mathematics",
      wednesday: "Operating Systems",
      thursday: "Data Structures",
      friday: "Mathematics",
      saturday: "Software Engineering",
    },
    {
      time: "12:30 - 01:30",
      monday: "Software Engineering",
      tuesday: "Computer Networks",
      wednesday: "DBMS",
      thursday: "Computer Networks",
      friday: "Operating Systems",
      saturday: "Mathematics",
    },
    {
      time: "02:30 - 03:30",
      monday: "Operating Systems Lab",
      tuesday: "Data Structures Lab",
      wednesday: "Computer Networks Lab",
      thursday: "DBMS Lab",
      friday: "Software Engineering",
      saturday: "Project Work",
    },
    {
      time: "03:30 - 04:30",
      monday: "Project Work",
      tuesday: "Software Engineering",
      wednesday: "Project Work",
      thursday: "Mathematics",
      friday: "Project Work",
      saturday: "Library",
    },
  ];

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="student-dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-header">
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>
            🎓
          </div>

          <h2>Student Portal</h2>

          <p>College Management System</p>
        </div>

        <div className="sidebar-menu">

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>

              <span>{item.label}</span>
            </button>
          ))}

        </div>

        <div className="logout-button">

          <button onClick={handleLogout}>
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>
            <h1>
              {activePage === "dashboard"
                ? "Student Dashboard"
                : menuItems.find(
                    (item) => item.id === activePage
                  )?.label}
            </h1>

            <p>
              Welcome back, Rahul! Here's your academic overview.
            </p>
          </div>

          <div className="student-info">

            <div>
              <strong>Rahul Kumar</strong>

              <p>STU1001</p>
            </div>

            <div className="student-avatar">
              👨‍🎓
            </div>

          </div>

        </div>


        {/* DASHBOARD */}

        {activePage === "dashboard" && (
          <>
            <div className="stats-grid">

              <div className="stat-card">
                <h3>Attendance</h3>
                <strong>86.2%</strong>
                <span>Overall attendance</span>
              </div>

              <div className="stat-card">
                <h3>Current CGPA</h3>
                <strong>8.7</strong>
                <span>Semester 4</span>
              </div>

              <div className="stat-card">
                <h3>Assignments</h3>
                <strong>3</strong>
                <span>Pending submissions</span>
              </div>

              <div className="stat-card">
                <h3>Notifications</h3>
                <strong>3</strong>
                <span>Unread notifications</span>
              </div>

            </div>

            <div className="dashboard-card">

              <div className="card-header">
                <div>
                  <h2>Academic Overview</h2>
                  <p>Your current academic performance</p>
                </div>
              </div>

              <div className="profile-grid">

                <div className="profile-item">
                  <label>Student Name</label>
                  <strong>Rahul Kumar</strong>
                </div>

                <div className="profile-item">
                  <label>Student ID</label>
                  <strong>STU1001</strong>
                </div>

                <div className="profile-item">
                  <label>Course</label>
                  <strong>B.Tech Computer Science</strong>
                </div>

                <div className="profile-item">
                  <label>Semester</label>
                  <strong>Semester 4</strong>
                </div>

                <div className="profile-item">
                  <label>Department</label>
                  <strong>Computer Science & Engineering</strong>
                </div>

                <div className="profile-item">
                  <label>Academic Year</label>
                  <strong>2026</strong>
                </div>

              </div>

            </div>
          </>
        )}


       {/* PROFILE */}

{activePage === "profile" && (
  <section className="profile-page">

    {/* PROFILE HEADER */}
    <div className="profile-top-card">

      <div className="profile-big-circle">
        RK
      </div>

      <div className="profile-heading-info">
        <h2>{profileData.name}</h2>

        <p>
          Student ID: {profileData.studentId}
        </p>

        <p>
          {profileData.course} • {profileData.department} • Semester{" "}
          {profileData.semester}
        </p>
      </div>

      <div className="profile-edit-area">

        {!isEditingProfile ? (
          <button
            className="profile-edit-button"
            onClick={() => setIsEditingProfile(true)}
          >
            ✏️ Edit Profile
          </button>
        ) : (
          <div className="profile-edit-buttons">

            <button
              className="profile-save-button"
              onClick={saveProfile}
            >
              💾 Save Changes
            </button>

            <button
              className="profile-cancel-button"
              onClick={() => setIsEditingProfile(false)}
            >
              ✕ Cancel
            </button>

          </div>
        )}

      </div>

    </div>


    {/* PERSONAL INFORMATION */}

    <div className="profile-section">

      <div className="profile-section-title">

        <div>
          <h2>👤 Personal Information</h2>
          <p>Your personal and academic details</p>
        </div>

      </div>

      {!isEditingProfile ? (

        <div className="profile-grid">

          <div className="profile-field">
            <span>Student ID</span>
            <strong>{profileData.studentId}</strong>
          </div>

          <div className="profile-field">
            <span>Full Name</span>
            <strong>{profileData.name}</strong>
          </div>

          <div className="profile-field">
            <span>Roll Number</span>
            <strong>{profileData.rollNumber}</strong>
          </div>

          <div className="profile-field">
            <span>Email</span>
            <strong>{profileData.email}</strong>
          </div>

          <div className="profile-field">
            <span>Phone</span>
            <strong>{profileData.phone}</strong>
          </div>

          <div className="profile-field">
            <span>Department</span>
            <strong>{profileData.department}</strong>
          </div>

          <div className="profile-field">
            <span>Course</span>
            <strong>{profileData.course}</strong>
          </div>

          <div className="profile-field">
            <span>Section</span>
            <strong>{profileData.section}</strong>
          </div>

          <div className="profile-field">
            <span>Semester</span>
            <strong>{profileData.semester}</strong>
          </div>

        </div>

      ) : (

        <div className="profile-edit-grid">

          <div className="profile-input-group">
            <label>Student ID</label>
            <input
              name="studentId"
              value={profileData.studentId}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Full Name</label>
            <input
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Roll Number</label>
            <input
              name="rollNumber"
              value={profileData.rollNumber}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Phone</label>
            <input
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Department</label>
            <input
              name="department"
              value={profileData.department}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Course</label>
            <input
              name="course"
              value={profileData.course}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Section</label>
            <input
              name="section"
              value={profileData.section}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Semester</label>
            <input
              name="semester"
              value={profileData.semester}
              onChange={handleProfileChange}
            />
          </div>

        </div>

      )}

    </div>


    {/* GUARDIAN INFORMATION */}

    <div className="profile-section">

      <div className="profile-section-title">

        <div>
          <h2>👨‍👦 Guardian Information</h2>
          <p>Parent / guardian contact details</p>
        </div>

      </div>

      {!isEditingProfile ? (

        <div className="profile-grid">

          <div className="profile-field">
            <span>Guardian Name</span>
            <strong>{profileData.guardianName}</strong>
          </div>

          <div className="profile-field">
            <span>Relation</span>
            <strong>Father</strong>
          </div>

          <div className="profile-field">
            <span>Guardian Phone</span>
            <strong>{profileData.guardianPhone}</strong>
          </div>

        </div>

      ) : (

        <div className="profile-edit-grid">

          <div className="profile-input-group">
            <label>Guardian Name</label>
            <input
              name="guardianName"
              value={profileData.guardianName}
              onChange={handleProfileChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Guardian Phone</label>
            <input
              name="guardianPhone"
              value={profileData.guardianPhone}
              onChange={handleProfileChange}
            />
          </div>

        </div>

      )}

    </div>


    {/* ACADEMIC SUMMARY */}

    <div className="profile-section">

      <div className="profile-section-title">

        <div>
          <h2>🎓 Academic Summary</h2>
          <p>Your current academic information</p>
        </div>

      </div>

      <div className="profile-summary-grid">

        <div className="profile-summary-card">
          <span>📚 Course</span>
          <strong>{profileData.course}</strong>
          <small>Current Course</small>
        </div>

        <div className="profile-summary-card">
          <span>🏫 Department</span>
          <strong>CSE</strong>
          <small>{profileData.department}</small>
        </div>

        <div className="profile-summary-card">
          <span>📖 Semester</span>
          <strong>{profileData.semester}</strong>
          <small>Current Semester</small>
        </div>

        <div className="profile-summary-card">
          <span>🎯 Section</span>
          <strong>{profileData.section}</strong>
          <small>Class Section</small>
        </div>

      </div>

    </div>

  </section>
)}

      {/* ATTENDANCE */}

{activePage === "attendance" && (
  <section className="attendance-page">

    {/* HEADER */}
    <div className="attendance-header-card">

      <div>
        <h2>📊 Attendance Overview</h2>
        <p>Track your subject-wise attendance and academic presence</p>
      </div>

      <div className="attendance-overall">
        <div className="attendance-circle">
          <strong>87%</strong>
          <span>Overall</span>
        </div>
      </div>

    </div>


    {/* SUMMARY CARDS */}

    <div className="attendance-summary-grid">

      <div className="attendance-summary-card">
        <div className="attendance-summary-icon">📅</div>

        <div>
          <span>Total Classes</span>
          <strong>120</strong>
        </div>
      </div>


      <div className="attendance-summary-card">
        <div className="attendance-summary-icon">✅</div>

        <div>
          <span>Classes Attended</span>
          <strong>104</strong>
        </div>
      </div>


      <div className="attendance-summary-card">
        <div className="attendance-summary-icon">❌</div>

        <div>
          <span>Classes Missed</span>
          <strong>16</strong>
        </div>
      </div>


      <div className="attendance-summary-card">
        <div className="attendance-summary-icon">🎯</div>

        <div>
          <span>Attendance</span>
          <strong>87%</strong>
        </div>
      </div>

    </div>


    {/* SUBJECT-WISE ATTENDANCE */}

    <div className="attendance-section-card">

      <div className="attendance-section-heading">
        <div>
          <h2>📚 Subject-wise Attendance</h2>
          <p>Your attendance for each subject</p>
        </div>
      </div>


      <div className="subject-attendance-list">

        {/* CSE */}

        <div className="subject-attendance-item">

          <div className="subject-info">
            <div className="subject-icon">💻</div>

            <div>
              <h3>Data Structures</h3>
              <p>CSE201</p>
            </div>
          </div>

          <div className="subject-attendance-middle">

            <div className="attendance-progress-background">
              <div
                className="attendance-progress-fill"
                style={{ width: "92%" }}
              ></div>
            </div>

            <span>46 / 50 classes</span>

          </div>

          <div className="subject-percentage good">
            92%
          </div>

        </div>


        {/* DBMS */}

        <div className="subject-attendance-item">

          <div className="subject-info">
            <div className="subject-icon">🗄️</div>

            <div>
              <h3>Database Management</h3>
              <p>CSE202</p>
            </div>
          </div>

          <div className="subject-attendance-middle">

            <div className="attendance-progress-background">
              <div
                className="attendance-progress-fill"
                style={{ width: "88%" }}
              ></div>
            </div>

            <span>44 / 50 classes</span>

          </div>

          <div className="subject-percentage good">
            88%
          </div>

        </div>


        {/* OS */}

        <div className="subject-attendance-item">

          <div className="subject-info">
            <div className="subject-icon">⚙️</div>

            <div>
              <h3>Operating Systems</h3>
              <p>CSE203</p>
            </div>
          </div>

          <div className="subject-attendance-middle">

            <div className="attendance-progress-background">
              <div
                className="attendance-progress-fill"
                style={{ width: "84%" }}
              ></div>
            </div>

            <span>42 / 50 classes</span>

          </div>

          <div className="subject-percentage average">
            84%
          </div>

        </div>


        {/* COMPUTER NETWORK */}

        <div className="subject-attendance-item">

          <div className="subject-info">
            <div className="subject-icon">🌐</div>

            <div>
              <h3>Computer Networks</h3>
              <p>CSE204</p>
            </div>
          </div>

          <div className="subject-attendance-middle">

            <div className="attendance-progress-background">
              <div
                className="attendance-progress-fill"
                style={{ width: "80%" }}
              ></div>
            </div>

            <span>40 / 50 classes</span>

          </div>

          <div className="subject-percentage average">
            80%
          </div>

        </div>


        {/* MATHEMATICS */}

        <div className="subject-attendance-item">

          <div className="subject-info">
            <div className="subject-icon">📐</div>

            <div>
              <h3>Engineering Mathematics</h3>
              <p>MAT201</p>
            </div>
          </div>

          <div className="subject-attendance-middle">

            <div className="attendance-progress-background">
              <div
                className="attendance-progress-fill"
                style={{ width: "90%" }}
              ></div>
            </div>

            <span>45 / 50 classes</span>

          </div>

          <div className="subject-percentage good">
            90%
          </div>

        </div>


        {/* COMMUNICATION */}

        <div className="subject-attendance-item">

          <div className="subject-info">
            <div className="subject-icon">🗣️</div>

            <div>
              <h3>Communication Skills</h3>
              <p>ENG201</p>
            </div>
          </div>

          <div className="subject-attendance-middle">

            <div className="attendance-progress-background">
              <div
                className="attendance-progress-fill"
                style={{ width: "78%" }}
              ></div>
            </div>

            <span>39 / 50 classes</span>

          </div>

          <div className="subject-percentage warning">
            78%
          </div>

        </div>

      </div>

    </div>


    {/* ATTENDANCE RULE */}

    <div className="attendance-notice">

      <div className="attendance-notice-icon">
        💡
      </div>

      <div>
        <h3>Attendance Requirement</h3>

        <p>
          Students are expected to maintain at least 75% attendance
          in each subject to remain eligible for regular academic
          activities and examinations.
        </p>
      </div>

    </div>


    {/* RECENT ATTENDANCE */}

    <div className="attendance-section-card">

      <div className="attendance-section-heading">
        <div>
          <h2>🕐 Recent Attendance</h2>
          <p>Your latest attendance records</p>
        </div>
      </div>


      <div className="recent-attendance-list">

        <div className="recent-attendance-row">

          <div>
            <strong>Data Structures</strong>
            <span>Monday • 10:00 AM</span>
          </div>

          <span className="present-badge">
            ✓ Present
          </span>

        </div>


        <div className="recent-attendance-row">

          <div>
            <strong>Database Management</strong>
            <span>Monday • 12:00 PM</span>
          </div>

          <span className="present-badge">
            ✓ Present
          </span>

        </div>


        <div className="recent-attendance-row">

          <div>
            <strong>Operating Systems</strong>
            <span>Tuesday • 09:00 AM</span>
          </div>

          <span className="absent-badge">
            ✕ Absent
          </span>

        </div>


        <div className="recent-attendance-row">

          <div>
            <strong>Computer Networks</strong>
            <span>Tuesday • 11:00 AM</span>
          </div>

          <span className="present-badge">
            ✓ Present
          </span>

        </div>

      </div>

    </div>

  </section>
)}

        {/* MARKS & RESULTS */}

{activePage === "marks" && (
  <section className="marks-page">

    {/* HEADER */}

    <div className="marks-header-card">

      <div>
        <h2>📈 Marks & Results</h2>
        <p>View your subject-wise academic performance</p>
      </div>

      <div className="semester-badge">
        Semester 4
      </div>

    </div>


    {/* RESULT SUMMARY */}

    <div className="marks-summary-grid">

      <div className="marks-summary-card">
        <div className="marks-summary-icon">🎯</div>
        <div>
          <span>SGPA</span>
          <strong>8.6</strong>
        </div>
      </div>

      <div className="marks-summary-card">
        <div className="marks-summary-icon">📊</div>
        <div>
          <span>Overall Percentage</span>
          <strong>86%</strong>
        </div>
      </div>

      <div className="marks-summary-card">
        <div className="marks-summary-icon">📚</div>
        <div>
          <span>Total Subjects</span>
          <strong>6</strong>
        </div>
      </div>

      <div className="marks-summary-card">
        <div className="marks-summary-icon">🏆</div>
        <div>
          <span>Result Status</span>
          <strong className="result-pass">PASS</strong>
        </div>
      </div>

    </div>


    {/* SUBJECT MARKS */}

    <div className="marks-section-card">

      <div className="marks-section-heading">
        <div>
          <h2>📚 Semester 4 Results</h2>
          <p>Subject-wise marks and grades</p>
        </div>
      </div>


      <div className="marks-table-wrapper">

        <table className="marks-table">

          <thead>
            <tr>
              <th>Subject</th>
              <th>Code</th>
              <th>Internal</th>
              <th>External</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>
                <strong>Data Structures</strong>
              </td>
              <td>CSE201</td>
              <td>28 / 30</td>
              <td>62 / 70</td>
              <td><strong>90 / 100</strong></td>
              <td>
                <span className="grade-badge grade-a-plus">
                  A+
                </span>
              </td>
              <td>
                <span className="result-badge">
                  ✓ Pass
                </span>
              </td>
            </tr>


            <tr>
              <td>
                <strong>Database Management</strong>
              </td>
              <td>CSE202</td>
              <td>26 / 30</td>
              <td>58 / 70</td>
              <td><strong>84 / 100</strong></td>
              <td>
                <span className="grade-badge grade-a">
                  A
                </span>
              </td>
              <td>
                <span className="result-badge">
                  ✓ Pass
                </span>
              </td>
            </tr>


            <tr>
              <td>
                <strong>Operating Systems</strong>
              </td>
              <td>CSE203</td>
              <td>25 / 30</td>
              <td>57 / 70</td>
              <td><strong>82 / 100</strong></td>
              <td>
                <span className="grade-badge grade-a">
                  A
                </span>
              </td>
              <td>
                <span className="result-badge">
                  ✓ Pass
                </span>
              </td>
            </tr>


            <tr>
              <td>
                <strong>Computer Networks</strong>
              </td>
              <td>CSE204</td>
              <td>24 / 30</td>
              <td>55 / 70</td>
              <td><strong>79 / 100</strong></td>
              <td>
                <span className="grade-badge grade-b-plus">
                  B+
                </span>
              </td>
              <td>
                <span className="result-badge">
                  ✓ Pass
                </span>
              </td>
            </tr>


            <tr>
              <td>
                <strong>Engineering Mathematics</strong>
              </td>
              <td>MAT201</td>
              <td>27 / 30</td>
              <td>61 / 70</td>
              <td><strong>88 / 100</strong></td>
              <td>
                <span className="grade-badge grade-a">
                  A
                </span>
              </td>
              <td>
                <span className="result-badge">
                  ✓ Pass
                </span>
              </td>
            </tr>


            <tr>
              <td>
                <strong>Communication Skills</strong>
              </td>
              <td>ENG201</td>
              <td>23 / 30</td>
              <td>54 / 70</td>
              <td><strong>77 / 100</strong></td>
              <td>
                <span className="grade-badge grade-b-plus">
                  B+
                </span>
              </td>
              <td>
                <span className="result-badge">
                  ✓ Pass
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>


    {/* PERFORMANCE */}

    <div className="marks-section-card">

      <div className="marks-section-heading">
        <div>
          <h2>📊 Performance Overview</h2>
          <p>Your marks compared across subjects</p>
        </div>
      </div>


      <div className="performance-list">

        <div className="performance-row">

          <div className="performance-name">
            <strong>Data Structures</strong>
            <span>90%</span>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill"
              style={{ width: "90%" }}
            ></div>
          </div>

        </div>


        <div className="performance-row">

          <div className="performance-name">
            <strong>Database Management</strong>
            <span>84%</span>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill"
              style={{ width: "84%" }}
            ></div>
          </div>

        </div>


        <div className="performance-row">

          <div className="performance-name">
            <strong>Operating Systems</strong>
            <span>82%</span>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill"
              style={{ width: "82%" }}
            ></div>
          </div>

        </div>


        <div className="performance-row">

          <div className="performance-name">
            <strong>Computer Networks</strong>
            <span>79%</span>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill"
              style={{ width: "79%" }}
            ></div>
          </div>

        </div>


        <div className="performance-row">

          <div className="performance-name">
            <strong>Engineering Mathematics</strong>
            <span>88%</span>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill"
              style={{ width: "88%" }}
            ></div>
          </div>

        </div>


        <div className="performance-row">

          <div className="performance-name">
            <strong>Communication Skills</strong>
            <span>77%</span>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill"
              style={{ width: "77%" }}
            ></div>
          </div>

        </div>

      </div>

    </div>


    {/* GRADE SCALE */}

    <div className="grade-scale-card">

      <h3>📋 Grade Scale</h3>

      <div className="grade-scale-list">

        <div>
          <span className="grade-badge grade-a-plus">A+</span>
          <span>90 - 100</span>
        </div>

        <div>
          <span className="grade-badge grade-a">A</span>
          <span>80 - 89</span>
        </div>

        <div>
          <span className="grade-badge grade-b-plus">B+</span>
          <span>70 - 79</span>
        </div>

        <div>
          <span className="grade-badge grade-b">B</span>
          <span>60 - 69</span>
        </div>

        <div>
          <span className="grade-badge grade-c">C</span>
          <span>50 - 59</span>
        </div>

      </div>

    </div>

  </section>
)}

      {/* ASSIGNMENTS */}

{activePage === "assignments" && (
  <section className="assignments-page">

    {/* HEADER */}

    <div className="assignments-header-card">

      <div>
        <h2>📝 Assignments</h2>
        <p>View and track all your academic assignments</p>
      </div>

      <div className="assignment-count-badge">
        6 Assignments
      </div>

    </div>


    {/* SUMMARY */}

    <div className="assignments-summary-grid">

      <div className="assignment-summary-card">
        <div className="assignment-summary-icon">📋</div>

        <div>
          <span>Total</span>
          <strong>6</strong>
        </div>
      </div>


      <div className="assignment-summary-card">
        <div className="assignment-summary-icon">⏳</div>

        <div>
          <span>Pending</span>
          <strong>2</strong>
        </div>
      </div>


      <div className="assignment-summary-card">
        <div className="assignment-summary-icon">✅</div>

        <div>
          <span>Submitted</span>
          <strong>3</strong>
        </div>
      </div>


      <div className="assignment-summary-card">
        <div className="assignment-summary-icon">⚠️</div>

        <div>
          <span>Due Soon</span>
          <strong>1</strong>
        </div>
      </div>

    </div>


    {/* ASSIGNMENT LIST */}

    <div className="assignments-section-card">

      <div className="assignments-section-heading">
        <div>
          <h2>📚 My Assignments</h2>
          <p>Current semester assignments</p>
        </div>
      </div>


      <div className="assignment-list">


        {/* ASSIGNMENT 1 */}

        <div className="assignment-card">

          <div className="assignment-subject-icon">
            💻
          </div>

          <div className="assignment-main">

            <div className="assignment-title-row">
              <h3>Data Structures — Binary Trees</h3>

              <span className="assignment-pending">
                Pending
              </span>
            </div>

            <p className="assignment-subject">
              Data Structures • CSE201
            </p>

            <div className="assignment-meta">
              <span>📅 Due: 15 Aug 2026</span>
              <span>🎯 Marks: 20</span>
            </div>

          </div>

          <button className="assignment-view-button">
            View Details
          </button>

        </div>


        {/* ASSIGNMENT 2 */}

        <div className="assignment-card">

          <div className="assignment-subject-icon">
            🗄️
          </div>

          <div className="assignment-main">

            <div className="assignment-title-row">
              <h3>Database Normalization</h3>

              <span className="assignment-due-soon">
                Due Soon
              </span>
            </div>

            <p className="assignment-subject">
              Database Management • CSE202
            </p>

            <div className="assignment-meta">
              <span>📅 Due: 18 Aug 2026</span>
              <span>🎯 Marks: 25</span>
            </div>

          </div>

          <button className="assignment-view-button">
            View Details
          </button>

        </div>


        {/* ASSIGNMENT 3 */}

        <div className="assignment-card">

          <div className="assignment-subject-icon">
            ⚙️
          </div>

          <div className="assignment-main">

            <div className="assignment-title-row">
              <h3>Process Scheduling</h3>

              <span className="assignment-submitted">
                Submitted
              </span>
            </div>

            <p className="assignment-subject">
              Operating Systems • CSE203
            </p>

            <div className="assignment-meta">
              <span>📅 Submitted: 10 Aug 2026</span>
              <span>🎯 Marks: 20</span>
            </div>

          </div>

          <button className="assignment-view-button submitted-button">
            View Submission
          </button>

        </div>


        {/* ASSIGNMENT 4 */}

        <div className="assignment-card">

          <div className="assignment-subject-icon">
            🌐
          </div>

          <div className="assignment-main">

            <div className="assignment-title-row">
              <h3>Network Protocols</h3>

              <span className="assignment-pending">
                Pending
              </span>
            </div>

            <p className="assignment-subject">
              Computer Networks • CSE204
            </p>

            <div className="assignment-meta">
              <span>📅 Due: 22 Aug 2026</span>
              <span>🎯 Marks: 25</span>
            </div>

          </div>

          <button className="assignment-view-button">
            View Details
          </button>

        </div>


        {/* ASSIGNMENT 5 */}

        <div className="assignment-card">

          <div className="assignment-subject-icon">
            📐
          </div>

          <div className="assignment-main">

            <div className="assignment-title-row">
              <h3>Fourier Series Problems</h3>

              <span className="assignment-submitted">
                Submitted
              </span>
            </div>

            <p className="assignment-subject">
              Engineering Mathematics • MAT201
            </p>

            <div className="assignment-meta">
              <span>📅 Submitted: 08 Aug 2026</span>
              <span>🎯 Marks: 20</span>
            </div>

          </div>

          <button className="assignment-view-button submitted-button">
            View Submission
          </button>

        </div>


        {/* ASSIGNMENT 6 */}

        <div className="assignment-card">

          <div className="assignment-subject-icon">
            🗣️
          </div>

          <div className="assignment-main">

            <div className="assignment-title-row">
              <h3>Professional Communication</h3>

              <span className="assignment-submitted">
                Submitted
              </span>
            </div>

            <p className="assignment-subject">
              Communication Skills • ENG201
            </p>

            <div className="assignment-meta">
              <span>📅 Submitted: 05 Aug 2026</span>
              <span>🎯 Marks: 15</span>
            </div>

          </div>

          <button className="assignment-view-button submitted-button">
            View Submission
          </button>

        </div>

      </div>

    </div>


    {/* UPCOMING DEADLINES */}

    <div className="assignment-deadline-card">

      <div className="assignment-deadline-icon">
        ⏰
      </div>

      <div>
        <h3>Upcoming Deadline</h3>

        <p>
          <strong>Data Structures — Binary Trees</strong>
          {" "}is due on <strong>15 August 2026</strong>.
        </p>
      </div>

    </div>

  </section>
)}
{/* TIMETABLE */}

{activePage === "timetable" && (
  <section className="timetable-page">

    {/* HEADER */}

    <div className="timetable-header-card">

      <div>
        <h2>🗓️ Class Timetable</h2>
        <p>Your weekly class schedule</p>
      </div>

      <div className="timetable-semester-badge">
        Semester 4
      </div>

    </div>


    {/* TODAY */}

    <div className="today-class-card">

      <div className="today-class-icon">
        📚
      </div>

      <div className="today-class-info">

        <span className="today-label">
          TODAY'S CLASSES
        </span>

        <h3>Data Structures</h3>

        <p>
          CSE201 • Room 204 • 10:00 AM - 11:00 AM
        </p>

      </div>

      <span className="ongoing-badge">
        Upcoming
      </span>

    </div>


    {/* WEEKLY TIMETABLE */}

    <div className="timetable-section-card">

      <div className="timetable-section-heading">

        <div>
          <h2>📅 Weekly Schedule</h2>
          <p>Monday to Saturday</p>
        </div>

      </div>


      <div className="timetable-table-wrapper">

        <table className="timetable-table">

          <thead>

            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="time-cell">
                09:00 - 10:00
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Operating Systems</strong>
                  <span>CSE203</span>
                  <small>Room 201</small>
                </div>
              </td>

              <td>
                <div className="class-box purple-class">
                  <strong>Mathematics</strong>
                  <span>MAT201</span>
                  <small>Room 105</small>
                </div>
              </td>

              <td>
                <div className="class-box green-class">
                  <strong>Database</strong>
                  <span>CSE202</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box orange-class">
                  <strong>Networks</strong>
                  <span>CSE204</span>
                  <small>Room 203</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Data Structures</strong>
                  <span>CSE201</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box purple-class">
                  <strong>Mathematics</strong>
                  <span>MAT201</span>
                  <small>Room 105</small>
                </div>
              </td>

            </tr>


            <tr>

              <td className="time-cell">
                10:00 - 11:00
              </td>

              <td>
                <div className="class-box blue-class current-class">
                  <strong>Data Structures</strong>
                  <span>CSE201</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box green-class">
                  <strong>Database</strong>
                  <span>CSE202</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box orange-class">
                  <strong>Networks</strong>
                  <span>CSE204</span>
                  <small>Room 203</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Operating Systems</strong>
                  <span>CSE203</span>
                  <small>Room 201</small>
                </div>
              </td>

              <td>
                <div className="class-box purple-class">
                  <strong>Mathematics</strong>
                  <span>MAT201</span>
                  <small>Room 105</small>
                </div>
              </td>

              <td>
                <div className="class-box green-class">
                  <strong>Database</strong>
                  <span>CSE202</span>
                  <small>Room 204</small>
                </div>
              </td>

            </tr>


            <tr>

              <td className="time-cell">
                11:00 - 12:00
              </td>

              <td>
                <div className="class-box green-class">
                  <strong>Database</strong>
                  <span>CSE202</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box orange-class">
                  <strong>Networks</strong>
                  <span>CSE204</span>
                  <small>Room 203</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Operating Systems</strong>
                  <span>CSE203</span>
                  <small>Room 201</small>
                </div>
              </td>

              <td>
                <div className="class-box purple-class">
                  <strong>Mathematics</strong>
                  <span>MAT201</span>
                  <small>Room 105</small>
                </div>
              </td>

              <td>
                <div className="class-box green-class">
                  <strong>Database</strong>
                  <span>CSE202</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Data Structures</strong>
                  <span>CSE201</span>
                  <small>Room 204</small>
                </div>
              </td>

            </tr>


            {/* BREAK */}

            <tr>

              <td className="time-cell">
                12:00 - 01:00
              </td>

              <td colSpan="6">
                <div className="break-box">
                  🍱 Lunch Break
                </div>
              </td>

            </tr>


            <tr>

              <td className="time-cell">
                01:00 - 02:00
              </td>

              <td>
                <div className="class-box orange-class">
                  <strong>Networks</strong>
                  <span>CSE204</span>
                  <small>Room 203</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Data Structures</strong>
                  <span>CSE201</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box purple-class">
                  <strong>Mathematics</strong>
                  <span>MAT201</span>
                  <small>Room 105</small>
                </div>
              </td>

              <td>
                <div className="class-box green-class">
                  <strong>Database</strong>
                  <span>CSE202</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Operating Systems</strong>
                  <span>CSE203</span>
                  <small>Room 201</small>
                </div>
              </td>

              <td>
                <div className="class-box orange-class">
                  <strong>Networks</strong>
                  <span>CSE204</span>
                  <small>Room 203</small>
                </div>
              </td>

            </tr>


            <tr>

              <td className="time-cell">
                02:00 - 03:00
              </td>

              <td>
                <div className="class-box purple-class">
                  <strong>Mathematics</strong>
                  <span>MAT201</span>
                  <small>Room 105</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Operating Systems</strong>
                  <span>CSE203</span>
                  <small>Room 201</small>
                </div>
              </td>

              <td>
                <div className="class-box green-class">
                  <strong>Database</strong>
                  <span>CSE202</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Data Structures</strong>
                  <span>CSE201</span>
                  <small>Room 204</small>
                </div>
              </td>

              <td>
                <div className="class-box orange-class">
                  <strong>Networks</strong>
                  <span>CSE204</span>
                  <small>Room 203</small>
                </div>
              </td>

              <td>
                <div className="class-box blue-class">
                  <strong>Operating Systems</strong>
                  <span>CSE203</span>
                  <small>Room 201</small>
                </div>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>


    {/* FACULTY / CLASS INFO */}

    <div className="timetable-info-grid">

      <div className="timetable-info-card">

        <div className="timetable-info-icon">
          👨‍🏫
        </div>

        <div>
          <h3>Class Coordinator</h3>
          <p>Dr. Rajesh Kumar</p>
          <span>CSE Department</span>
        </div>

      </div>


      <div className="timetable-info-card">

        <div className="timetable-info-icon">
          🏫
        </div>

        <div>
          <h3>Class Room</h3>
          <p>Block A — Room 204</p>
          <span>Computer Science Department</span>
        </div>

      </div>

    </div>

  </section>
)}
        {/* NOTIFICATIONS */}

        {activePage === "notifications" && (
          <section className="dashboard-card">

            <div className="card-header">

              <div>
                <h2>Notifications</h2>
                <p>
                  Stay updated with college announcements
                </p>
              </div>

            </div>

            <div className="notifications-list">

              {notifications.map((item) => (
                <div
                  className="notification-item"
                  key={item.title}
                >

                  <div className="notice-icon">
                    {item.icon}
                  </div>

                  <div>

                    <h3>{item.title}</h3>

                    <p>{item.message}</p>

                    <small>
                      🕐 {item.time}
                    </small>

                  </div>

                </div>
              ))}

            </div>

          </section>
        )}

        <footer className="dashboard-footer">
          © 2026 College Management System
        </footer>

      </main>

    </div>
  );
}

export default StudentDashboard;