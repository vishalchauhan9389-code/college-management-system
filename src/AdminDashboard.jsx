import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
const [activePage, setActivePage] = useState("dashboard");
const [students, setStudents] = useState([]);
const [loadingStudents, setLoadingStudents] = useState(false);

const [showStudentForm, setShowStudentForm] = useState(false);
const [savingStudent, setSavingStudent] = useState(false);

const [studentForm, setStudentForm] = useState({
  studentId: "",
  name: "",
  email: "",
  course: "",
  semester: "",
});
const [subjects, setSubjects] = useState([]);
const [loadingSubjects, setLoadingSubjects] = useState(false);

const [showSubjectForm, setShowSubjectForm] = useState(false);

const [subjectForm, setSubjectForm] = useState({
  subjectId: "",
  name: "",
  department: "",
  semester: "",
  teacher: "",
});

const [savingSubject, setSavingSubject] = useState(false);
const [teachers, setTeachers] = useState([]);
const [teacherForm, setTeacherForm] = useState({
  teacherId: "",
  name: "",
  email: "",
  subject: "",
  department: "",
});
const [savingTeacher, setSavingTeacher] = useState(false);
const [loadingTeachers, setLoadingTeachers] = useState(false);
const [attendance, setAttendance] = useState([]);
const [loadingAttendance, setLoadingAttendance] = useState(false);
const [assignments, setAssignments] = useState([]);
const [loadingAssignments, setLoadingAssignments] = useState(false);
const [showAssignmentForm, setShowAssignmentForm] = useState(false);
const [savingAssignment, setSavingAssignment] = useState(false);

const [assignmentForm, setAssignmentForm] = useState({
  title: "",
  subject: "",
  description: "",
  dueDate: "",
});
const [showTeacherForm, setShowTeacherForm] = useState(false);
const [marks, setMarks] = useState([]);
const [loadingMarks, setLoadingMarks] = useState(false);
const [showMarksForm, setShowMarksForm] = useState(false);
const [savingMarks, setSavingMarks] = useState(false);

const [marksForm, setMarksForm] = useState({
  studentId: "",
  subject: "",
  marks: "",
  totalMarks: "",
  examType: "",
});
const [users, setUsers] = useState([]);
const [loadingUsers, setLoadingUsers] = useState(false);
const fetchStudents = async () => {
  try {
    setLoadingStudents(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/students"
    );

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
const addStudent = async (e) => {
  e.preventDefault();

  try {
    setSavingStudent(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentForm),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Student added successfully!");

      setStudentForm({
        studentId: "",
        name: "",
        email: "",
        course: "",
        semester: "",
      });

      setShowStudentForm(false);
      fetchStudents();
    } else {
      alert(data.message);
    }
} catch (error) {
  console.error("Add student error:", error);
  alert(error.message);
}finally {
    setSavingStudent(false);
  }
};
const fetchTeachers = async () => {
  try {
    setLoadingTeachers(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/students"
    );

    const data = await response.json();

    if (data.success) {
      setTeachers(data.teachers);
    }
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
  } finally {
    setLoadingTeachers(false);
  }
};
const addTeacher = async (e) => {
  e.preventDefault();

  try {
    setSavingTeacher(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/teachers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherForm),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Teacher added successfully!");

      setTeacherForm({
        teacherId: "",
        name: "",
        email: "",
        subject: "",
        department: "",
      });

      setShowTeacherForm(false);
      fetchTeachers();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Add teacher error:", error);
    alert(error.message);
  } finally {
    setSavingTeacher(false);
  }
};
const fetchSubjects = async () => {
  try {
    setLoadingSubjects(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/subjects"
    );

    const data = await response.json();

    if (data.success) {
      setSubjects(data.subjects);
    }
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
  } finally {
    setLoadingSubjects(false);
  }
};
const fetchAssignments = async () => {
  try {
    setLoadingAssignments(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/assignments"
    );

    const data = await response.json();const addAssignment = async (e) => {
  e.preventDefault();

  try {
    setSavingAssignment(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/assignments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentForm),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Assignment added successfully!");

      setAssignmentForm({
        title: "",
        subject: "",
        description: "",
        dueDate: "",
      });

      setShowAssignmentForm(false);
      fetchAssignments();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Add assignment error:", error);
    alert("Assignment could not be added");
  } finally {
    setSavingAssignment(false);
  }
};

    if (data.success) {
      setAssignments(data.assignments);
    }
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
  } finally {
    setLoadingAssignments(false);
  }
};
const fetchMarks = async () => {
  try {
    setLoadingMarks(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/marks"
    );

    const data = await response.json();

    if (data.success) {
      setMarks(data.marks);
    }
  } catch (error) {
    console.error("Failed to fetch marks:", error);
  } finally {
    setLoadingMarks(false);
  }
};
const addMarks = async (e) => {
  e.preventDefault();

  try {
    setSavingMarks(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/marks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(marksForm),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Marks added successfully!");

      setMarksForm({
        studentId: "",
        subject: "",
        marks: "",
        totalMarks: "",
        examType: "",
      });

      setShowMarksForm(false);
      fetchMarks();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Add marks error:", error);
    alert("Marks could not be added");
  } finally {
    setSavingMarks(false);
  }
};
const addAssignment = async (e) => {
  e.preventDefault();

  try {
    setSavingAssignment(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/assignments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentForm),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Assignment added successfully!");

      setAssignmentForm({
        title: "",
        subject: "",
        description: "",
        dueDate: "",
      });

      setShowAssignmentForm(false);
      fetchAssignments();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Add assignment error:", error);
    alert("Assignment could not be added");
  } finally {
    setSavingAssignment(false);
  }
};
const fetchAttendance = async () => {
  try {
    setLoadingAttendance(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/attendance"
    );

    const data = await response.json();

    if (data.success) {
      setAttendance(data.attendance);
    }
  } catch (error) {
    console.error("Failed to fetch attendance:", error);
  } finally {
    setLoadingAttendance(false);
  }
};
const fetchUsers = async () => {
  try {
    setLoadingUsers(true);

    const response = await fetch(
      "https://college-management-system-sqtg.onrender.com/api/users"
    );

    const data = await response.json();

    if (data.success) {
      setUsers(data.users);
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    setLoadingUsers(false);
  }
};
const addSubject = async (e) => {
  e.preventDefault();

  try {
    setSavingSubject(true);

    const response = await fetch("https://college-management-system-sqtg.onrender.com/api/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectForm),
    });

    const data = await response.json();

    if (data.success) {
      alert("Subject added successfully!");

      setSubjectForm({
        subjectId: "",
        name: "",
        department: "",
        semester: "",
        teacher: "",
      });

      setShowSubjectForm(false);
      fetchSubjects();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Add subject error:", error);
    alert("Subject could not be added");
  } finally {
    setSavingSubject(false);
  }
};

useEffect(() => {
  if (activePage === "students") {
    fetchStudents();
  }

  if (activePage === "teachers") {
    fetchTeachers();
  }
  if (activePage === "subjects") {
  fetchSubjects();
}
if (activePage === "attendance") {
  fetchAttendance();
}
if (activePage === "assignments") {
  fetchAssignments();
}
if (activePage === "marks") {
  fetchMarks();
}
if (activePage === "users") {
  fetchUsers();
}
}, [activePage]);

  const menuItems = [
    { id: "dashboard", icon: "🏠", name: "Dashboard" },
    { id: "students", icon: "👨‍🎓", name: "Students" },
    { id: "teachers", icon: "👨‍🏫", name: "Teachers" },
    { id: "subjects", icon: "📚", name: "Subjects" },
    { id: "attendance", icon: "📊", name: "Attendance" },
    { id: "assignments", icon: "📝", name: "Assignments" },
    { id: "marks", icon: "📈", name: "Marks & Results" },
    { id: "users", icon: "👥", name: "Users" },
  ];

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>🎓 College Admin</h2>
          <span>Management System</span>
        </div>

        <nav className="admin-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={
                activePage === item.id
                  ? "admin-menu-item active"
                  : "admin-menu-item"
              }
              onClick={() => setActivePage(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">

        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your college from one place</p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>Admin</small>
            </div>
          </div>
        </header>

        {/* DASHBOARD PAGE */}
        {activePage === "dashboard" && (
          <div className="admin-content">

            <div className="admin-welcome-card">
              <h2>Welcome, Administrator 👋</h2>
              <p>
                Here you can manage students, teachers, subjects,
                attendance and academic records.
              </p>
            </div>

            <div className="admin-stat-grid">

              <div className="admin-stat-card">
                <span>👨‍🎓</span>
                <div>
                  <small>Total Students</small>
                  <strong>124</strong>
                </div>
              </div>

              <div className="admin-stat-card">
                <span>👨‍🏫</span>
                <div>
                  <small>Total Teachers</small>
                  <strong>18</strong>
                </div>
              </div>

              <div className="admin-stat-card">
                <span>📚</span>
                <div>
                  <small>Total Subjects</small>
                  <strong>24</strong>
                </div>
              </div>

              <div className="admin-stat-card">
                <span>📊</span>
                <div>
                  <small>Attendance</small>
                  <strong>92%</strong>
                </div>
              </div>

            </div>

            <div className="admin-section-card">
              <h2>Quick Overview</h2>

              <div className="admin-overview-grid">

                <div>
                  <strong>42</strong>
                  <span>Assignments</span>
                </div>

                <div>
                  <strong>356</strong>
                  <span>Marks Records</span>
                </div>

                <div>
                  <strong>118</strong>
                  <span>Active Users</span>
                </div>

                <div>
                  <strong>6</strong>
                  <span>Departments</span>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* OTHER PAGES */}
       {activePage === "students" && (
  <div className="admin-content">
    <div className="admin-section-card">

      <h2>👨‍🎓 Students</h2>
      <p>Manage all registered students</p>
      <button
  className="admin-add-btn"
  onClick={() => setShowStudentForm(true)}
>
  + Add Student
</button>

{showStudentForm && (
  <form onSubmit={addStudent} className="admin-form">

    <input
      type="text"
      placeholder="Student ID"
      value={studentForm.studentId}
      onChange={(e) =>
        setStudentForm({
          ...studentForm,
          studentId: e.target.value,
        })
      }
      required
    />

    <input
      type="text"
      placeholder="Student Name"
      value={studentForm.name}
      onChange={(e) =>
        setStudentForm({
          ...studentForm,
          name: e.target.value,
        })
      }
      required
    />

    <input
      type="email"
      placeholder="Email"
      value={studentForm.email}
      onChange={(e) =>
        setStudentForm({
          ...studentForm,
          email: e.target.value,
        })
      }
      required
    />

    <input
      type="text"
      placeholder="Course"
      value={studentForm.course}
      onChange={(e) =>
        setStudentForm({
          ...studentForm,
          course: e.target.value,
        })
      }
      required
    />

    <input
      type="number"
      placeholder="Semester"
      value={studentForm.semester}
      onChange={(e) =>
        setStudentForm({
          ...studentForm,
          semester: e.target.value,
        })
      }
      required
    />

    <button type="submit" disabled={savingStudent}>
      {savingStudent ? "Saving..." : "Save Student"}
    </button>

    <button
      type="button"
      onClick={() => setShowStudentForm(false)}
    >
      Cancel
    </button>

  </form>
)}
      {loadingStudents ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="admin-students-list">

          {students.map((student) => (
            <div
              className="admin-student-row"
              key={student.studentId}
            >
              <div>
                <strong>{student.name}</strong>
                <small>{student.studentId}</small>
              </div>

              <span>{student.email}</span>

              <span>{student.course}</span>

              <span>
                Semester {student.semester}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  </div>
)}
{activePage === "teachers" && (
  <div className="admin-content">
    <div className="admin-section-card">

      <h2>👨‍🏫 Teachers</h2>

      <p>Manage all registered teachers</p>
      <button onClick={() => setShowTeacherForm(true)}>
  ➕ Add Teacher
</button>
{showTeacherForm && (
  <form onSubmit={addTeacher} className="teacher-form">

    <input
      type="text"
      placeholder="Teacher ID"
      value={teacherForm.teacherId}
      onChange={(e) =>
        setTeacherForm({
          ...teacherForm,
          teacherId: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Teacher Name"
      value={teacherForm.name}
      onChange={(e) =>
        setTeacherForm({
          ...teacherForm,
          name: e.target.value,
        })
      }
    />

    <input
      type="email"
      placeholder="Email"
      value={teacherForm.email}
      onChange={(e) =>
        setTeacherForm({
          ...teacherForm,
          email: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Subject"
      value={teacherForm.subject}
      onChange={(e) =>
        setTeacherForm({
          ...teacherForm,
          subject: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Department"
      value={teacherForm.department}
      onChange={(e) =>
        setTeacherForm({
          ...teacherForm,
          department: e.target.value,
        })
      }
    />

    <button type="submit" disabled={savingTeacher}>
      {savingTeacher ? "Saving..." : "Save Teacher"}
    </button>

    <button
      type="button"
      onClick={() => setShowTeacherForm(false)}
    >
      Cancel
    </button>

  </form>
)}

      {loadingTeachers ? (
        <p>Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <div className="admin-teachers-list">

          {teachers.map((teacher) => (
            <div
              className="admin-teacher-row"
              key={teacher.teacherId}
            >

              <div>
                <strong>{teacher.name}</strong>
                <small>{teacher.teacherId}</small>
              </div>

              <span>{teacher.email}</span>

              <span>{teacher.subject}</span>

              <span>{teacher.department}</span>

            </div>
          ))}

        </div>
      )}

    </div>
  </div>
)}
{activePage === "subjects" && (
  <div className="admin-content">
    <div className="admin-section-card">

      <h2>📚 Subjects</h2>

      <p>Manage all registered subjects</p>

      <button onClick={() => setShowSubjectForm(true)}>
        ➕ Add Subject
      </button>

      {showSubjectForm && (
        <form onSubmit={addSubject} className="subject-form">

          <input
            type="text"
            placeholder="Subject ID"
            value={subjectForm.subjectId}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                subjectId: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Subject Name"
            value={subjectForm.name}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Department"
            value={subjectForm.department}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                department: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Semester"
            value={subjectForm.semester}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                semester: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Teacher ID"
            value={subjectForm.teacher}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                teacher: e.target.value,
              })
            }
          />

          <button type="submit" disabled={savingSubject}>
            {savingSubject ? "Saving..." : "Save Subject"}
          </button>

          <button
            type="button"
            onClick={() => setShowSubjectForm(false)}
          >
            Cancel
          </button>

        </form>
      )}

      {loadingSubjects ? (
        <p>Loading subjects...</p>
      ) : subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <div className="admin-subjects-list">
          {subjects.map((subject) => (
            <div
              className="admin-subject-row"
              key={subject.subjectId}
            >
              <div>
                <strong>{subject.name}</strong>
                <small>{subject.subjectId}</small>
              </div>

              <span>{subject.department}</span>
              <span>Semester {subject.semester}</span>
              <span>{subject.teacher}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
)}
{activePage === "attendance" && (
  <div className="admin-content">
    <div className="admin-section-card">

      <h2>📊 Attendance</h2>

      <p>Manage student attendance</p>

      {loadingAttendance ? (
        <p>Loading attendance...</p>
      ) : attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <div className="admin-attendance-list">
          {attendance.map((record) => (
            <div
              className="admin-attendance-row"
              key={record._id}
            >
              <strong>{record.studentId}</strong>
              <span>{record.date}</span>
              <span>{record.status}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
)}
{activePage === "assignments" && (
  <div className="admin-content">
    <div className="admin-section-card">

      <h2>📝 Assignments</h2>

      <p>Manage all assignments</p>
      <button
  className="admin-add-btn"
  onClick={() => setShowAssignmentForm(true)}
>
  + Add Assignment
</button>
{showAssignmentForm && (
  <form onSubmit={addAssignment} className="admin-form">
    <input
      type="text"
      placeholder="Assignment Title"
      value={assignmentForm.title}
      onChange={(e) =>
        setAssignmentForm({
          ...assignmentForm,
          title: e.target.value,
        })
      }
      required
    />

    <input
      type="text"
      placeholder="Subject"
      value={assignmentForm.subject}
      onChange={(e) =>
        setAssignmentForm({
          ...assignmentForm,
          subject: e.target.value,
        })
      }
      required
    />

    <textarea
      placeholder="Description"
      value={assignmentForm.description}
      onChange={(e) =>
        setAssignmentForm({
          ...assignmentForm,
          description: e.target.value,
        })
      }
      required
    />

    <input
      type="date"
      value={assignmentForm.dueDate}
      onChange={(e) =>
        setAssignmentForm({
          ...assignmentForm,
          dueDate: e.target.value,
        })
      }
      required
    />

    <button type="submit" disabled={savingAssignment}>
      {savingAssignment ? "Saving..." : "Save Assignment"}
    </button>

    <button
      type="button"
      onClick={() => setShowAssignmentForm(false)}
    >
      Cancel
    </button>
  </form>
)}
      {loadingAssignments ? (
        <p>Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <div className="admin-assignments-list">
          {assignments.map((assignment) => (
            <div
              className="admin-assignment-row"
              key={assignment._id}
            >
              <div>
                <strong>{assignment.title}</strong>
                <small>{assignment.subject}</small>
              </div>

              <span>{assignment.description}</span>
              <span>Due: {assignment.dueDate}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
)}
{activePage === "marks" && (
  <div className="admin-content">
    <div className="admin-section-card">
      <h2>📈 Marks & Results</h2>
      <p>Manage student marks and results</p>
      
      <button
        className="admin-add-btn"
        onClick={() => setShowMarksForm(true)}
      >
        + Add Marks
      </button>
      {showMarksForm && (
  <form onSubmit={addMarks} className="admin-form">
    <input
      type="text"
      placeholder="Student ID"
      value={marksForm.studentId}
      onChange={(e) =>
        setMarksForm({
          ...marksForm,
          studentId: e.target.value,
        })
      }
      required
    />

    <input
      type="text"
      placeholder="Subject"
      value={marksForm.subject}
      onChange={(e) =>
        setMarksForm({
          ...marksForm,
          subject: e.target.value,
        })
      }
      required
    />

    <input
      type="number"
      placeholder="Marks"
      value={marksForm.marks}
      onChange={(e) =>
        setMarksForm({
          ...marksForm,
          marks: e.target.value,
        })
      }
      required
    />

    <input
      type="number"
      placeholder="Total Marks"
      value={marksForm.totalMarks}
      onChange={(e) =>
        setMarksForm({
          ...marksForm,
          totalMarks: e.target.value,
        })
      }
      required
    />

    <input
      type="text"
      placeholder="Exam Type"
      value={marksForm.examType}
      onChange={(e) =>
        setMarksForm({
          ...marksForm,
          examType: e.target.value,
        })
      }
      required
    />

    <button type="submit" disabled={savingMarks}>
      {savingMarks ? "Saving..." : "Save Marks"}
    </button>

    <button
      type="button"
      onClick={() => setShowMarksForm(false)}
    >
      Cancel
    </button>
  </form>
)}
{loadingMarks ? (
  <p>Loading marks...</p>
) : marks.length === 0 ? (
  <p>No marks found.</p>
) : (
  <div className="admin-marks-list">
    {marks.map((mark) => (
      <div className="admin-marks-row" key={mark._id}>
        <strong>{mark.studentId}</strong>
        <span>{mark.subject}</span>
        <span>
          {mark.marks} / {mark.totalMarks}
        </span>
      </div>
    ))}
  </div>
)}
    </div>
  </div>
)}

{activePage === "users" && (
  <div className="admin-content">
    <div className="admin-section-card">
      <h2>👥 Users</h2>
      <p>Manage all users</p>

      {loadingUsers ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="admin-users-list">
          {users.map((user) => (
            <div className="admin-user-row" key={user._id}>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <span>{user.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}
      </main>
    </div>
  );
};

export default AdminDashboard;