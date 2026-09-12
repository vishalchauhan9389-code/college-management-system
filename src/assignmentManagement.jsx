import React, { useEffect, useState } from "react";

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
  });

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://college-management-system-sqtg.onrender.com/api/assignments"
      );

      const data = await response.json();

      if (data.success) {
        setAssignments(data.assignments);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
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
        "https://college-management-system-sqtg.onrender.com/api/assignments",
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
        alert("Assignment added successfully");

        setForm({
          title: "",
          subject: "",
          description: "",
          dueDate: "",
        });

        setShowForm(false);
        fetchAssignments();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const filteredAssignments = assignments.filter((assignment) =>
    `${assignment.title} ${assignment.subject} ${assignment.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="management-page">
      <div className="management-page-header">
        <div>
          <h1>📝 Assignment Management</h1>
          <p>Manage college assignments</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add Assignment"}
        </button>
      </div>

      {showForm && (
        <div className="management-form-card">
          <h2>Add Assignment</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Assignment Title"
              value={form.title}
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
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Save Assignment
            </button>
          </form>
        </div>
      )}

      <div className="management-list-card">
        <div className="management-list-header">
          <h2>Assignments</h2>

          <input
            type="text"
            placeholder="Search assignment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading assignments...</p>
        ) : filteredAssignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          <div className="assignment-table">
            {filteredAssignments.map((assignment) => (
              <div
                className="assignment-row"
                key={assignment._id}
              >
                <span>{assignment.title}</span>
                <span>{assignment.subject}</span>
                <span>{assignment.dueDate}</span>
                <span>{assignment.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentManagement;