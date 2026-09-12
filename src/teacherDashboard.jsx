import { useEffect, useState } from "react";
function TeacherDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
const [studentSubjectFilter, setStudentSubjectFilter] = useState("all");
const [showMarkAttendance, setShowMarkAttendance] = useState(false);
const [assignments, setAssignments] = useState([]);
const [showCreateAssignment, setShowCreateAssignment] = useState(false);
const [marks, setMarks] = useState([]);
const [showEnterMarks, setShowEnterMarks] = useState(false);
const [attendanceDate, setAttendanceDate] = useState(
  new Date().toISOString().split("T")[0]
);
const [newMark, setNewMark] = useState({
  studentId: "",
  subject: "",
  marks: "",
});
const [attendanceStatus, setAttendanceStatus] = useState({});
const [newStudent, setNewStudent] = useState({
  studentId: "",
  name: "",
  email: "",
  course: "",
  semester: "",
  subject: "",
});
useEffect(() => {
  if (activePage === "students" || activePage === "attendance") {
    fetchStudents();
  }
 if (activePage === "marks") {
  return (
    <div className="teacher-content">
      <div className="teacher-page-card">

        <div className="teacher-marks-header">
          <div>
            <h2>📈 Marks & Results</h2>
            <p>Manage student marks and academic results</p>
          </div>

          <button
            className="teacher-primary-button"
            onClick={() => setShowEnterMarks(true)}
          >
            + Enter Marks
          </button>
        </div>

        {/* ENTER MARKS FORM */}
        {showEnterMarks && (
          <div className="teacher-page-card">
            <h3>Enter Student Marks</h3>

            <div className="teacher-form-grid">

              <select
                value={newMark.studentId}
                onChange={(e) =>
                  setNewMark({
                    ...newMark,
                    studentId: e.target.value,
                  })
                }
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option
                    key={student.studentId}
                    value={student.studentId}
                  >
                    {student.name} ({student.studentId})
                  </option>
                ))}
              </select>

              <select
                value={newMark.subject}
                onChange={(e) =>
                  setNewMark({
                    ...newMark,
                    subject: e.target.value,
                  })
                }
              >
                <option value="">Select Subject</option>
                <option value="Data Structures">
                  Data Structures
                </option>
                <option value="Operating Systems">
                  Operating Systems
                </option>
                <option value="Computer Networks">
                  Computer Networks
                </option>
                <option value="Database Management">
                  Database Management
                </option>
              </select>

              <input
                type="number"
                min="0"
                max="100"
                placeholder="Enter Marks"
                value={newMark.marks}
                onChange={(e) =>
                  setNewMark({
                    ...newMark,
                    marks: e.target.value,
                  })
                }
              />

            </div>

            <div>
              <button
                className="teacher-primary-button"
                onClick={saveMarks}
              >
                Save Marks
              </button>

              <button
                className="teacher-view-student"
                onClick={() => setShowEnterMarks(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        <div className="teacher-marks-summary">

          <div>
            <span>Total Results</span>
            <strong>{marks.length}</strong>
          </div>

          <div>
            <span>Average Marks</span>
            <strong>
              {marks.length
                ? Math.round(
                    marks.reduce(
                      (sum, item) => sum + Number(item.marks || 0),
                      0
                    ) / marks.length
                  )
                : 0}
              %
            </strong>
          </div>

          <div>
            <span>Highest Marks</span>
            <strong>
              {marks.length
                ? Math.max(
                    ...marks.map((item) =>
                      Number(item.marks || 0)
                    )
                  )
                : 0}
              %
            </strong>
          </div>

          <div>
            <span>Pass Rate</span>
            <strong>
              {marks.length
                ? Math.round(
                    (marks.filter(
                      (item) => Number(item.marks || 0) >= 40
                    ).length /
                      marks.length) *
                      100
                  )
                : 0}
              %
            </strong>
          </div>

        </div>

        {/* RESULTS TABLE */}
        <div className="teacher-results-table">

          <div className="teacher-results-row teacher-results-heading">
            <span>Student</span>
            <span>ID</span>
            <span>Subject</span>
            <span>Marks</span>
            <span>Grade</span>
            <span>Action</span>
          </div>

          {marks.length === 0 ? (
            <div className="teacher-results-row">
              <span>No marks found</span>
            </div>
          ) : (
            marks.map((student, index) => {

              const mark = Number(student.marks || 0);

              let grade = "F";

              if (mark >= 90) {
                grade = "A+";
              } else if (mark >= 80) {
                grade = "A";
              } else if (mark >= 70) {
                grade = "B+";
              } else if (mark >= 60) {
                grade = "B";
              } else if (mark >= 50) {
                grade = "C";
              } else if (mark >= 40) {
                grade = "D";
              }

              return (
                <div
                  className="teacher-results-row"
                  key={student._id || index}
                >

                  <div className="teacher-result-student">

                    <div className="teacher-mini-avatar">
                      {(student.name || student.studentName || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <strong>
                      {student.name ||
                        student.studentName ||
                        student.studentId}
                    </strong>

                  </div>

                  <span>
                    {student.studentId}
                  </span>

                  <span>
                    {student.subject}
                  </span>

                  <strong className="teacher-marks-value">
                    {mark}%
                  </strong>

                  <strong className="teacher-grade">
                    {grade}
                  </strong>

                  <button
                    className="teacher-view-student"
                    onClick={() =>
                      alert(
                        `Student: ${
                          student.name ||
                          student.studentName ||
                          student.studentId
                        }\n\nSubject: ${
                          student.subject
                        }\nMarks: ${mark}%\nGrade: ${grade}`
                      )
                    }
                  >
                    View
                  </button>

                </div>
              );
            })
          )}

        </div>

      </div>
    </div>
  );
}
  if (activePage === "assignments") {

    fetchAssignments();

  }
}, [activePage]);

  const fetchStudents = async () => {
  try {
    setLoadingStudents(true);

    const response = await fetch("https://college-management-system-sqtg.onrender.com/api/students");
    const data = await response.json();

    if (data.success) {
      setStudents(data.students);
    }
  } catch (error) {
    console.error("Failed to fetch students:", error);
  } finally {
    setLoadingStudents(false);
  }
}; 
const fetchMarks = async () => {
  try {
    const response = await fetch("https://college-management-system-sqtg.onrender.com/api/marks");
    const data = await response.json();

    if (data.success) {
      setMarks(data.marks);
    }
  } catch (error) {
    console.error("Failed to fetch marks:", error);
  }
};

const saveMarks = async () => {
  try {
    if (
      !newMark.studentId ||
      !newMark.subject ||
      newMark.marks === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/marks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: newMark.studentId,
          subject: newMark.subject,
          marks: Number(newMark.marks),
          totalMarks: 100,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setMarks((prev) => [data.marks, ...prev]);

      setNewMark({
        studentId: "",
        subject: "",
        marks: "",
      });

      setShowEnterMarks(false);

      alert("Marks saved successfully!");
    } else {
      alert(data.message || "Failed to save marks");
    }
  } catch (error) {
    console.error("Save marks error:", error);
    alert("Failed to save marks");
  }
};
  const fetchAssignments = async () => {
  try {
    
    const response = await fetch("https://college-management-system-sqtg.onrender.com/api/assignments");
    const data = await response.json();

    if (data.success) {
      setAssignments(data.assignments);
    }
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
  }
};
  const addStudent = async () => {
  try {
    const response = await fetch("https://college-management-system-sqtg.onrender.com/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });

    const data = await response.json();

    if (data.success) {
      alert("Student added successfully!");

    setNewStudent({
  studentId: "",
  name: "",
  email: "",
  course: "",
  semester: "",
  subject: "",
});

      setShowAddStudent(false);

      fetchStudents();
    } else {
      alert(data.message || "Student could not be added");
    }
  } catch (error) {
    console.error("Failed to add student:", error);
    alert("Failed to connect to backend");
  }
};
const updateStudent = async () => {
  try {
    const response = await fetch(
      `https://college-management-system-sqtg.onrender.com/api/students/${editingStudent.studentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingStudent.name,
          email: editingStudent.email,
          course: editingStudent.course,
          semester: editingStudent.semester,
          subject: editingStudent.subject,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Student updated successfully!");
      setEditingStudent(null);
      fetchStudents();
    } else {
      alert(data.message || "Student could not be updated");
    }
  } catch (error) {
    console.error("Update student error:", error);
    alert("Failed to connect to backend");
  }
};
  const menuItems = [
    { id: "dashboard", icon: "🏠", name: "Dashboard" },
    { id: "profile", icon: "👤", name: "My Profile" },
    { id: "subjects", icon: "📚", name: "My Subjects" },
    { id: "students", icon: "👨‍🎓", name: "Students" },
    { id: "attendance", icon: "📊", name: "Attendance" },
    { id: "assignments", icon: "📝", name: "Assignments" },
    { id: "marks", icon: "📈", name: "Marks & Results" },
    { id: "timetable", icon: "🗓️", name: "Timetable" },
  ];

  const subjects = [
    {
      icon: "💻",
      name: "Data Structures",
      code: "CSE201",
      students: 42,
      semester: "3rd Semester",
      description: "Arrays, linked lists, trees, graphs and algorithms.",
    },
    {
      icon: "⚙️",
      name: "Operating Systems",
      code: "CSE203",
      students: 38,
      semester: "3rd Semester",
      description: "Processes, scheduling, memory and file systems.",
    },
    {
      icon: "🌐",
      name: "Computer Networks",
      code: "CSE204",
      students: 44,
      semester: "4th Semester",
      description: "Networking, protocols, routing and communication.",
    },
    {
      icon: "🗄️",
      name: "Database Management",
      code: "CSE202",
      students: 40,
      semester: "3rd Semester",
      description: "SQL, database design, normalization and transactions.",
    },
  ];
const filteredStudents = students.filter((student) => {
  const matchesSearch =
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.studentId.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase());

  const matchesSubject =
    studentSubjectFilter === "all" ||
    student.course.toLowerCase() === studentSubjectFilter.toLowerCase();

  return matchesSearch && matchesSubject;
});
const saveAttendance = async () => {
  try {
    for (const student of students) {
      const status = attendanceStatus[student.studentId] || "Absent";

      await fetch("https://college-management-system-sqtg.onrender.com/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: student.studentId,
          date: attendanceDate,
          status,
        }),
      });
    }

    alert("Attendance saved successfully!");
  } catch (error) {
    console.error("Attendance error:", error);
    alert("Failed to save attendance");
  }
};
  const renderPage = () => {
    if (activePage === "dashboard") {
      return (
        <div className="teacher-content">

          <div className="teacher-welcome-card">
            <div>
              <p className="teacher-small-title">WELCOME BACK</p>
              <h1>Hello, Dr. Rajesh Kumar 👋</h1>
              <p>
                Manage your classes, students and academic activities
                from your dashboard.
              </p>
            </div>

            <div className="teacher-welcome-icon">
              👨‍🏫
            </div>
          </div>

          <div className="teacher-stat-grid">

            <div className="teacher-stat-card">
              <div className="teacher-stat-icon">📚</div>
              <div>
                <span>My Subjects</span>
                <strong>4</strong>
              </div>
            </div>

            <div className="teacher-stat-card">
              <div className="teacher-stat-icon">👨‍🎓</div>
              <div>
                <span>Total Students</span>
                <strong>124</strong>
              </div>
            </div>

            <div className="teacher-stat-card">
              <div className="teacher-stat-icon">📝</div>
              <div>
                <span>Assignments</span>
                <strong>{assignments.length}</strong>
              </div>
            </div>

            <div className="teacher-stat-card">
              <div className="teacher-stat-icon">📊</div>
              <div>
                <span>Average Attendance</span>
                <strong>86%</strong>
              </div>
            </div>

          </div>

          <div className="teacher-dashboard-grid">

            <div className="teacher-panel">

              <div className="teacher-panel-header">
                <div>
                  <h2>📅 Today's Classes</h2>
                  <p>Your scheduled classes for today</p>
                </div>
              </div>

              <div className="teacher-class-list">

                <div className="teacher-class-item">
                  <div className="teacher-time">09:00 AM</div>

                  <div>
                    <strong>Data Structures</strong>
                    <span>CSE201 • Room 204</span>
                  </div>

                  <span className="teacher-class-status">
                    Completed
                  </span>
                </div>

                <div className="teacher-class-item">
                  <div className="teacher-time">11:00 AM</div>

                  <div>
                    <strong>Operating Systems</strong>
                    <span>CSE203 • Room 201</span>
                  </div>

                  <span className="teacher-class-status upcoming">
                    Upcoming
                  </span>
                </div>

                <div className="teacher-class-item">
                  <div className="teacher-time">02:00 PM</div>

                  <div>
                    <strong>Computer Networks</strong>
                    <span>CSE204 • Room 203</span>
                  </div>

                  <span className="teacher-class-status upcoming">
                    Upcoming
                  </span>
                </div>

              </div>
            </div>

            <div className="teacher-panel">

              <div className="teacher-panel-header">
                <div>
                  <h2>⚡ Quick Actions</h2>
                  <p>Frequently used options</p>
                </div>
              </div>

              <div className="teacher-quick-actions">

                <button onClick={() => setActivePage("attendance")}>
                  📊 Mark Attendance
                </button>

                <button onClick={() => setActivePage("assignments")}>
                  📝 Create Assignment
                </button>

                <button onClick={() => setActivePage("marks")}>
                  📈 Update Marks
                </button>

                <button onClick={() => setActivePage("students")}>
                  👨‍🎓 View Students
                </button>

              </div>

            </div>

          </div>
        </div>
      );
    }


    /* PROFILE */

    if (activePage === "profile") {
      return (
        <div className="teacher-content">

          <div className="teacher-page-card">

            <h2>👤 My Profile</h2>
            <p>Teacher profile information</p>

            <div className="teacher-profile-box">

              <div className="teacher-profile-avatar">
                👨‍🏫
              </div>

              <div>
                <h2>Dr. Rajesh Kumar</h2>
                <p>Computer Science & Engineering</p>
                <span>Employee ID: TCH1001</span>
              </div>

            </div>

            <div className="teacher-info-grid">

              <div>
                <label>Email</label>
                <p>rajesh.kumar@college.edu</p>
              </div>

              <div>
                <label>Department</label>
                <p>Computer Science</p>
              </div>

              <div>
                <label>Designation</label>
                <p>Assistant Professor</p>
              </div>

              <div>
                <label>Experience</label>
                <p>8 Years</p>
              </div>

            </div>

          </div>

        </div>
      );
    }


    /* MY SUBJECTS */

    if (activePage === "subjects") {
      return (
        <div className="teacher-content">

          <div className="teacher-page-card">

            <div className="teacher-section-top">

              <div>
                <h2>📚 My Subjects</h2>
                <p>
                  Manage all subjects assigned to you
                </p>
              </div>

              <div className="teacher-subject-count">
                4 Subjects
              </div>

            </div>


            <div className="teacher-subject-grid">

              {subjects.map((subject) => (
                <div
                  className="teacher-subject-card"
                  key={subject.code}
                >

                  <div className="teacher-subject-icon">
                    {subject.icon}
                  </div>

                  <div className="teacher-subject-content">

                    <span className="teacher-subject-code">
                      {subject.code}
                    </span>

                    <h3>{subject.name}</h3>

                    <p>{subject.description}</p>

                    <div className="teacher-subject-details">

                      <span>
                        👨‍🎓 {subject.students} Students
                      </span>

                      <span>
                        🎓 {subject.semester}
                      </span>

                    </div>

                    <button
                      className="teacher-subject-button"
                      onClick={() => setActivePage("students")}
                    >
                      View Students →
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      );
    }


    /* STUDENTS */

   if (activePage === "students") {
 if (editingStudent) {
  return (
    <div className="teacher-content">
      <div className="teacher-page-card">
        <h2>✏️ Edit Student</h2>
        <p>Update student details</p>

        <div>
          <label>Student ID</label>
          <input
            type="text"
            value={editingStudent.studentId}
            disabled
          />
        </div>

        <div>
          <label>Name</label>
          <input
            type="text"
            value={editingStudent.name}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                name: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={editingStudent.email}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                email: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Course</label>
          <input
            type="text"
            value={editingStudent.course}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                course: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Semester</label>
          <input
            type="text"
            value={editingStudent.semester}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                semester: e.target.value,
              })
            }
          />
        </div>

 <button
  className="teacher-primary-button"
  onClick={async () => {
    await fetchStudents();
    setShowMarkAttendance(true);
  }}
>
  + Mark Attendance
</button>

        <button
          className="teacher-secondary-button"
          onClick={() => setEditingStudent(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
if (showAddStudent) {
  return (
    <div className="teacher-content">
      <div className="teacher-page-card">
        <h2>➕ Add Student</h2>
        <p>Enter student details</p>

        <div>
          <label>Student ID</label>
          <input
  type="text"
  placeholder="STU1002"
  value={newStudent.studentId}
  onChange={(e) =>
    setNewStudent({
      ...newStudent,
      studentId: e.target.value,
    })
  }
/>
        </div>

        <div>
          <label>Name</label>
          <input
  type="text"
  placeholder="Student name"
  value={newStudent.name}
  onChange={(e) =>
    setNewStudent({
      ...newStudent,
      name: e.target.value,
    })
  }
/>
        </div>

        <div>
          <label>Email</label>
          <input
  type="email"
  placeholder="student@example.com"
  value={newStudent.email}
  onChange={(e) =>
    setNewStudent({
      ...newStudent,
      email: e.target.value,
    })
  }
/>
        </div>

        <div>
          <label>Course</label>
         <input
  type="text"
  placeholder="B.Tech CSE"
  value={newStudent.course}
  onChange={(e) =>
    setNewStudent({
      ...newStudent,
      course: e.target.value,
    })
  }
/>
        </div>

        <div>
          <label>Semester</label>
          <input
  type="text"
  placeholder="4"
  value={newStudent.semester}
  onChange={(e) =>
    setNewStudent({
      ...newStudent,
      semester: e.target.value,
    })
  }
/>
        </div>
<div>
  <label>Subject</label>

  <select
    value={newStudent.subject}
    onChange={(e) =>
      setNewStudent({
        ...newStudent,
        subject: e.target.value,
      })
    }
  >
    <option value="">Select Subject</option>
    <option value="Data Structures">Data Structures</option>
    <option value="Operating Systems">Operating Systems</option>
    <option value="Computer Networks">Computer Networks</option>
    <option value="Database Management">
      Database Management
    </option>
  </select>
</div>
   <button
  className="teacher-primary-button"
  onClick={addStudent}
>
  Save Student
</button>

        <button
          className="teacher-secondary-button"
          onClick={() => setShowAddStudent(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="teacher-content">

      <div className="teacher-page-card">

        <div className="teacher-students-header">
          <div>
            <h2>👨‍🎓 Students</h2>
            <p>Manage and view students enrolled in your subjects</p>
          </div>

        <div className="teacher-student-total">
  {students.length} Students
</div>
          <button
  className="teacher-primary-button"
  onClick={() => setShowAddStudent(true)}
>
  + Add Student
</button>
        </div>

        <div className="teacher-student-controls">

          <div className="teacher-search-box">
            🔎
            <input
  type="text"
  placeholder="Search student..."
  value={studentSearch}
  onChange={(e) => setStudentSearch(e.target.value)}
/>
          </div>

          <select
  className="teacher-subject-filter"
  value={studentSubjectFilter}
  onChange={(e) => setStudentSubjectFilter(e.target.value)}
>
  <option value="all">All Subjects</option>
  <option value="data structures">Data Structures</option>
  <option value="operating systems">Operating Systems</option>
  <option value="computer networks">Computer Networks</option>
  <option value="database management">
    Database Management
  </option>
</select>

        </div>

        <div className="teacher-student-table teacher-student-table-new">

          <div className="teacher-student-row teacher-student-heading">
            <span>Student</span>
            <span>ID</span>
            <span>Email</span>
            <span>Course</span>
            <span>Semester</span>
            <span>Action</span>
          </div>

          {filteredStudents.map((student) => (
  <div
    className="teacher-student-row"
    key={student.studentId}
  >
    <div className="teacher-student-name">
      <div className="teacher-mini-avatar">
        {student.name.charAt(0)}
      </div>

      <div>
        <strong>{student.name}</strong>
        <small>Student</small>
      </div>
    </div>

    <span>{student.studentId}</span>

    <span>{student.email}</span>

    <span>{student.course}</span>

    <span>{student.semester}</span>

    <button
      className="teacher-view-student"
      onClick={() =>
        alert(
          `${student.name}\nID: ${student.studentId}\nEmail: ${student.email}\nCourse: ${student.course}\nSemester: ${student.semester}`
        )
      }
    >
      View
      
    </button>
<button
  className="teacher-edit-student"
  onClick={() => {
    setEditingStudent({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      course: student.course,
      semester: student.semester,
      subject: student.subject || "",
    });
  }}
>
  Edit
</button>
    <button
  className="teacher-delete-student"
  onClick={async () => {
    const confirmDelete = window.confirm(
      `Delete ${student.name}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://college-management-system-sqtg.onrender.com/api/students/${student.studentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Student deleted successfully!");
        fetchStudents();
      } else {
        alert(data.message || "Student could not be deleted");
      }
    } catch (error) {
      console.error("Delete student error:", error);
      alert("Failed to connect to backend");
    }
  }}
>
  Delete
</button>
  </div>
))}

        </div>

      </div>

    </div>
  );
}

    /* ATTENDANCE */

   if (activePage === "attendance") {
   if (showMarkAttendance) {
  return (
    <div className="teacher-content">
      <div className="teacher-page-card">

        <h2>📋 Mark Attendance</h2>
        <p>Select Present or Absent for each student</p>

        {students.map((student) => (
          <div
            className="teacher-student-row"
            key={student.studentId}
          >
            <div className="teacher-student-name">
              <div className="teacher-mini-avatar">
                {student.name.charAt(0)}
              </div>

              <div>
                <strong>{student.name}</strong>
                <small>{student.studentId}</small>
              </div>
            </div>

            <select
              value={attendanceStatus[student.studentId] || "Absent"}
              onChange={(e) =>
                setAttendanceStatus({
                  ...attendanceStatus,
                  [student.studentId]: e.target.value,
                })
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        ))}

        <button
          className="teacher-primary-button"
          onClick={saveAttendance}
        >
          Save Attendance
        </button>

        <button
          className="teacher-secondary-button"
          onClick={() => setShowMarkAttendance(false)}
        >
          Back
        </button>

      </div>
    </div>
  );
}
  const attendanceData = [
    {
      subject: "Data Structures",
      code: "CSE201",
      students: 42,
      present: 38,
      percentage: 90,
    },
    {
      subject: "Operating Systems",
      code: "CSE203",
      students: 38,
      present: 33,
      percentage: 87,
    },
    {
      subject: "Computer Networks",
      code: "CSE204",
      students: 44,
      present: 37,
      percentage: 84,
    },
    {
      subject: "Database Management",
      code: "CSE202",
      students: 40,
      present: 36,
      percentage: 90,
    },
  ];

  return (

    <div className="teacher-content">

      <div className="teacher-page-card">

        <div className="teacher-attendance-header">
          <div>
            <h2>📊 Attendance</h2>
            <p>Monitor attendance of your students</p>
          </div>
         <button
  className="teacher-primary-button"
  onClick={saveAttendance}
>
  Save Attendance
</button>
          <button
            className="teacher-primary-button"
            onClick={() => setShowMarkAttendance(true)}
          >
            + Mark Attendance
          </button>
        </div>

        <div className="teacher-attendance-summary">

          <div>
            <span>Total Students</span>
            <strong>124</strong>
          </div>

          <div>
            <span>Present Today</span>
            <strong>108</strong>
          </div>

          <div>
            <span>Absent Today</span>
            <strong>16</strong>
          </div>

          <div>
            <span>Overall Attendance</span>
            <strong>87%</strong>
          </div>

        </div>

        <div className="teacher-attendance-list">

          {attendanceData.map((item) => (
            <div
              className="teacher-attendance-card"
              key={item.code}
            >

              <div className="teacher-attendance-subject">
                <div className="teacher-attendance-icon">
                  📚
                </div>

                <div>
                  <strong>{item.subject}</strong>
                  <span>{item.code}</span>
                </div>
              </div>

              <div className="teacher-attendance-info">
                <span>Students</span>
                <strong>{item.students}</strong>
              </div>

              <div className="teacher-attendance-info">
                <span>Present</span>
                <strong>{item.present}</strong>
              </div>

              <div className="teacher-attendance-progress">

                <div className="teacher-attendance-percent">
                  {item.percentage}%
                </div>

                <div className="teacher-progress-bar">
                  <div
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  ></div>
                </div>

              </div>

              <button
                className="teacher-attendance-view"
                onClick={() =>
                  alert(
                    `${item.subject}\n\nStudents: ${item.students}\nPresent: ${item.present}\nAttendance: ${item.percentage}%`
                  )
                }
              >
                View
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

    /* ASSIGNMENTS */
if (activePage === "assignments") {
  const assignments = [
    {
      title: "Binary Trees Assignment",
      subject: "Data Structures",
      due: "15 Aug 2026",
      submitted: 32,
      total: 42,
      status: "Active",
    },
    {
      title: "Process Scheduling",
      subject: "Operating Systems",
      due: "20 Aug 2026",
      submitted: 28,
      total: 38,
      status: "Active",
    },
    {
      title: "Network Protocols",
      subject: "Computer Networks",
      due: "22 Aug 2026",
      submitted: 35,
      total: 44,
      status: "Active",
    },
  ];
  if (showCreateAssignment) {
  return (
    <div className="teacher-content">
      <div className="teacher-page-card">

        <h2>➕ Create Assignment</h2>

        <input
          type="text"
          placeholder="Assignment title"
          value={newAssignment.title}
          onChange={(e) =>
            setNewAssignment({
              ...newAssignment,
              title: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Subject"
          value={newAssignment.subject}
          onChange={(e) =>
            setNewAssignment({
              ...newAssignment,
              subject: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          value={newAssignment.description}
          onChange={(e) =>
            setNewAssignment({
              ...newAssignment,
              description: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={newAssignment.dueDate}
          onChange={(e) =>
            setNewAssignment({
              ...newAssignment,
              dueDate: e.target.value,
            })
          }
        />

        <button
          className="teacher-primary-button"
          onClick={addAssignment}
        >
          Save Assignment
        </button>

        <button
          className="teacher-secondary-button"
          onClick={() => setShowCreateAssignment(false)}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
  return (
    <div className="teacher-content">
      <div className="teacher-page-card">

        <div className="teacher-assignment-header">
          <div>
            <h2>📝 Assignments</h2>
            <p>Create and manage assignments for your students</p>
          </div>

          <button
            className="teacher-primary-button"
            onClick={() => setShowCreateAssignment(true)}
          >
            + Create Assignment
          </button>
        </div>

        <div className="teacher-assignment-summary">

          <div>
            <span>Total Assignments</span>
            <strong>18</strong>
          </div>

          <div>
            <span>Active</span>
            <strong>12</strong>
          </div>

          <div>
            <span>Submissions</span>
            <strong>95</strong>
          </div>

          <div>
            <span>Pending</span>
            <strong>29</strong>
          </div>

        </div>

        <div className="teacher-assignment-list">

          {assignments.map((assignment) => (
            <div
              className="teacher-assignment-card"
              key={assignment.title}
            >

              <div className="teacher-assignment-icon">
                📝
              </div>

              <div className="teacher-assignment-info">
                <strong>{assignment.title}</strong>

                <span>
                  {assignment.subject}
                </span>

                <small>
                  Due: {assignment.due}
                </small>
              </div>

              <div className="teacher-submission-info">
                <strong>
                  {assignment.submitted}/{assignment.total}
                </strong>

                <span>
                  Submitted
                </span>
              </div>

              <div>
                <span className="teacher-assignment-status">
                  {assignment.status}
                </span>
              </div>

              <button
                className="teacher-view-student"
                onClick={() =>
                  alert(
                    `${assignment.title}\n\nSubject: ${assignment.subject}\nDue: ${assignment.dueDate}\nSubmissions: ${assignment.submitted}/${assignment.total}`
                  )
                }
              >
                View
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}


    /* TIMETABLE */

if (activePage === "marks") {
  if (showEnterMarks) {
  return (
    <div className="teacher-content">
      <div className="teacher-page-card">

        <h2>📈 Enter Marks</h2>
        <p>Enter marks for a student</p>

        <select
          value={newMark.studentId}
          onChange={(e) =>
            setNewMark({
              ...newMark,
              studentId: e.target.value,
            })
          }
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option
              key={student.studentId}
              value={student.studentId}
            >
              {student.name} - {student.studentId}
            </option>
          ))}
        </select>

        <select
          value={newMark.subject}
          onChange={(e) =>
            setNewMark({
              ...newMark,
              subject: e.target.value,
            })
          }
        >
          <option value="">Select Subject</option>
          <option value="Data Structures">Data Structures</option>
          <option value="Operating Systems">Operating Systems</option>
          <option value="Computer Networks">Computer Networks</option>
          <option value="Database Management">
            Database Management
          </option>
        </select>

        <input
          type="number"
          placeholder="Enter marks"
          min="0"
          max="100"
          value={newMark.marks}
          onChange={(e) =>
            setNewMark({
              ...newMark,
              marks: e.target.value,
            })
          }
        />

        <button
          className="teacher-primary-button"
          onClick={saveMarks}
        >
          Save Marks
        </button>

        <button
          className="teacher-secondary-button"
          onClick={() => setShowEnterMarks(false)}
        >
          Back
        </button>

      </div>
    </div>
  );
}

  return (
    <div className="teacher-content">

      <div className="teacher-page-card">

        <div className="teacher-marks-header">
          <div>
            <h2>📈 Marks & Results</h2>
            <p>Manage student marks and academic results</p>
          </div>

          <button
            className="teacher-primary-button"
          onClick={() => setShowEnterMarks(true)}
          >
            + Enter Marks
          </button>
        </div>

        <div className="teacher-marks-summary">

          <div>
            <span>Total Students</span>
            <strong>124</strong>
          </div>

          <div>
            <span>Average Marks</span>
            <strong>87%</strong>
          </div>

          <div>
            <span>Highest Marks</span>
            <strong>94%</strong>
          </div>

          <div>
            <span>Pass Rate</span>
            <strong>96%</strong>
          </div>

        </div>

        <div className="teacher-results-table">

          <div className="teacher-results-row teacher-results-heading">
            <span>Student</span>
            <span>ID</span>
            <span>Subject</span>
            <span>Marks</span>
            <span>Grade</span>
            <span>Action</span>
          </div>

          {marks.map((student) => (
            <div
              className="teacher-results-row"
              key={student.id}
            >

              <div className="teacher-result-student">
                <div className="teacher-mini-avatar">
                  {student.name.charAt(0)}
                </div>

                <strong>{student.name}</strong>
              </div>

              <span>{student.id}</span>

              <span>{student.subject}</span>

              <strong className="teacher-marks-value">
                {student.marks}%
              </strong>

              <strong className="teacher-grade">
                {student.grade}
              </strong>

              <button
                className="teacher-view-student"
                onClick={() =>
                  alert(
                    `${student.name}\n\nSubject: ${student.subject}\nMarks: ${student.marks}%\nGrade: ${student.grade}`
                  )
                }
              >
                View
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
if (activePage === "timetable") {
  const schedule = [
    {
      day: "Monday",
      time: "09:00 AM",
      subject: "Data Structures",
      room: "Room 204",
    },
    {
      day: "Tuesday",
      time: "11:00 AM",
      subject: "Operating Systems",
      room: "Room 201",
    },
    {
      day: "Wednesday",
      time: "02:00 PM",
      subject: "Computer Networks",
      room: "Room 203",
    },
    {
      day: "Thursday",
      time: "10:00 AM",
      subject: "Database Management",
      room: "Room 204",
    },
    {
      day: "Friday",
      time: "09:00 AM",
      subject: "Data Structures",
      room: "Room 204",
    },
  ];

  return (
    <div className="teacher-content">
      <div className="teacher-page-card">

        <div className="teacher-timetable-header">
          <div>
            <h2>🗓️ Timetable</h2>
            <p>Your weekly teaching schedule</p>
          </div>

          <button
            className="teacher-primary-button"
            onClick={() => alert("Timetable editing will be added next.")}
          >
            ✏️ Edit Timetable
          </button>
        </div>

        <div className="teacher-timetable-grid">

          {schedule.map((item) => (
            <div
              className="teacher-timetable-card"
              key={item.day}
            >
              <div className="teacher-day-box">
                {item.day.slice(0, 3)}
              </div>

              <div className="teacher-timetable-info">
                <strong>{item.subject}</strong>

                <span>
                  🕐 {item.time}
                </span>

                <span>
                  📍 {item.room}
                </span>
              </div>

              <div className="teacher-timetable-day">
                {item.day}
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
    return null;
  };


  return (
    <div className="teacher-dashboard">

      <aside className="teacher-sidebar">

        <div className="teacher-logo">
          <div>🏫</div>
          <span>College CMS</span>
        </div>


        <div className="teacher-user-box">

          <div className="teacher-avatar">
            👨‍🏫
          </div>

          <div>
            <strong>Dr. Rajesh Kumar</strong>
            <span>Teacher</span>
          </div>

        </div>


        <nav className="teacher-nav">

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={
                activePage === item.id
                  ? "teacher-nav-item active"
                  : "teacher-nav-item"
              }
              onClick={() => setActivePage(item.id)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}

        </nav>


        <button
          className="teacher-logout"
          onClick={() => window.location.reload()}
        >
          🚪 Logout
        </button>

      </aside>


      <main className="teacher-main">

        <header className="teacher-topbar">

          <div>

            <h2>
              {menuItems.find(
                (item) => item.id === activePage
              )?.name}
            </h2>

            <p>
              College Management System
            </p>

          </div>


          <div className="teacher-topbar-right">

            <span className="teacher-online-dot"></span>

            Online

          </div>

        </header>


        {renderPage()}

      </main>

    </div>
  );
}

export default TeacherDashboard;