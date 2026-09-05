import React, { useEffect, useState } from "react";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    subjectCode: "",
    name: "",
    department: "",
    semester: "",
  });

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/subjects"
      );

      const data = await response.json();

      if (data.success) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
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
        "http://localhost:5000/api/subjects",
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
        alert("Subject added successfully");

        setForm({
          subjectCode: "",
          name: "",
          department: "",
          semester: "",
        });

        setShowForm(false);
        fetchSubjects();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
    `${subject.subjectCode} ${subject.name} ${subject.department} ${subject.semester}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="management-page">
      <div className="management-page-header">
        <div>
          <h1>📚 Subject Management</h1>
          <p>Manage subject records</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add Subject"}
        </button>
      </div>

      {showForm && (
        <div className="management-form-card">
          <h2>Add Subject</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="subjectCode"
              placeholder="Subject Code"
              value={form.subjectCode}
              onChange={handleChange}
              required
            />

            <input
              name="name"
              placeholder="Subject Name"
              value={form.name}
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

            <input
              name="semester"
              placeholder="Semester"
              value={form.semester}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Save Subject
            </button>
          </form>
        </div>
      )}

      <div className="management-list-card">
        <div className="management-list-header">
          <h2>Subjects</h2>

          <input
            type="text"
            placeholder="Search subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading subjects...</p>
        ) : filteredSubjects.length === 0 ? (
          <p>No subjects found.</p>
        ) : (
          <div className="subject-table">
            {filteredSubjects.map((subject) => (
              <div
                className="subject-row"
                key={subject._id}
              >
                <span>{subject.subjectCode}</span>
                <span>{subject.name}</span>
                <span>{subject.department}</span>
                <span>{subject.semester}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectManagement;