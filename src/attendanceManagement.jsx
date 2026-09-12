import React, { useEffect, useState } from "react";

const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    studentId: "",
    date: "",
    status: "Present",
  });

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://college-management-system-sqtg.onrender.com/api/attendance"
      );

      const data = await response.json();

      if (data.success) {
        setAttendance(data.attendance);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "https://college-management-system-sqtg.onrender.com/api/students"
      );

      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://college-management-system-sqtg.onrender.com/api/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Attendance saved successfully");

        setForm({
          studentId: "",
          date: "",
          status: "Present",
        });

        setShowForm(false);
        fetchAttendance();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const filteredAttendance = attendance.filter((item) =>
    `${item.studentId} ${item.date} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="management-page">
      <div className="management-page-header">
        <div>
          <h1>📊 Attendance Management</h1>
          <p>Manage student attendance</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Mark Attendance"}
        </button>
      </div>

      {showForm && (
        <div className="management-form-card">
          <h2>Mark Attendance</h2>

          <form onSubmit={handleSubmit}>
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              required
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option
                  key={student._id}
                  value={student.studentId}
                >
                  {student.studentId} - {student.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <button type="submit">
              Save Attendance
            </button>
          </form>
        </div>
      )}

      <div className="management-list-card">
        <div className="management-list-header">
          <h2>Attendance Records</h2>

          <input
            type="text"
            placeholder="Search attendance..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading attendance...</p>
        ) : filteredAttendance.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <div className="attendance-table">
            {filteredAttendance.map((item) => (
              <div
                className="attendance-row"
                key={item._id}
              >
                <span>{item.studentId}</span>
                <span>{item.date}</span>

                <span
                  className={
                    item.status === "Present"
                      ? "attendance-present"
                      : "attendance-absent"
                  }
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;