import React, { useEffect, useState } from "react";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    teacherId: "",
    name: "",
    email: "",
    subject: "",
    department: "",
  });

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://college-management-system-sqtg.onrender.com/api/teachers"
      );

      const data = await response.json();

      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
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
        "https://college-management-system-sqtg.onrender.com/api/teachers",
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
        alert("Teacher added successfully");

        setForm({
          teacherId: "",
          name: "",
          email: "",
          subject: "",
          department: "",
        });

        setShowForm(false);
        fetchTeachers();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.teacherId} ${teacher.name} ${teacher.email} ${teacher.subject} ${teacher.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="management-page">
      <div className="management-page-header">
        <div>
          <h1>👨‍🏫 Teacher Management</h1>
          <p>Manage teacher records</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add Teacher"}
        </button>
      </div>

      {showForm && (
        <div className="management-form-card">
          <h2>Add Teacher</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="teacherId"
              placeholder="Teacher ID"
              value={form.teacherId}
              onChange={handleChange}
              required
            />

            <input
              name="name"
              placeholder="Teacher Name"
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
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Save Teacher
            </button>
          </form>
        </div>
      )}

      <div className="management-list-card">
        <div className="management-list-header">
          <h2>Teachers</h2>

          <input
            type="text"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading teachers...</p>
        ) : filteredTeachers.length === 0 ? (
          <p>No teachers found.</p>
        ) : (
          <div className="teacher-table">
            {filteredTeachers.map((teacher) => (
              <div
                className="teacher-row"
                key={teacher._id}
              >
                <span>{teacher.teacherId}</span>
                <span>{teacher.name}</span>
                <span>{teacher.email}</span>
                <span>{teacher.subject}</span>
                <span>{teacher.department}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherManagement;