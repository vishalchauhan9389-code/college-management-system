import React, { useEffect, useState } from "react";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    semester: "",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/students"
      );

      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      const url = editingId
        ? `http://localhost:5000/api/students/${editingId}`
        : "http://localhost:5000/api/students";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          editingId
            ? "Student updated successfully"
            : "Student added successfully"
        );

        setForm({
          studentId: "",
          name: "",
          email: "",
          phone: "",
          course: "",
          semester: "",
        });

        setEditingId(null);
        setShowForm(false);

        fetchStudents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (student) => {
    setForm({
      studentId: student.studentId || "",
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      course: student.course || "",
      semester: student.semester || "",
    });

    setEditingId(student._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Student deleted successfully");
        fetchStudents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.studentId} ${student.name} ${student.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="management-page">

      <div className="management-page-header">
        <div>
          <h1>👨‍🎓 Student Management</h1>
          <p>Manage student records</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add Student"}
        </button>
      </div>

      {showForm && (
        <div className="management-form-card">

          <h2>
            {editingId ? "Edit Student" : "Add Student"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              name="studentId"
              placeholder="Student ID"
              value={form.studentId}
              onChange={handleChange}
              required
            />

            <input
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              name="course"
              placeholder="Course"
              value={form.course}
              onChange={handleChange}
            />

            <input
              name="semester"
              placeholder="Semester"
              value={form.semester}
              onChange={handleChange}
            />

            <button type="submit">
              {editingId ? "Update Student" : "Save Student"}
            </button>

          </form>
        </div>
      )}

      <div className="management-list-card">

        <div className="management-list-header">

          <h2>Students</h2>

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="student-table">

            {filteredStudents.map((student) => (

              <div
                className="student-row"
                key={student._id}
              >

                <span>{student.studentId}</span>
                <span>{student.name}</span>
                <span>{student.email}</span>
                <span>{student.course}</span>

                <div>

                  <button
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default StudentManagement;