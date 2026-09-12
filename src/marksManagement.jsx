import React, { useEffect, useState } from "react";

const MarksManagement = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    studentId: "",
    subject: "",
    marks: "",
    totalMarks: "100",
    exam: "",
  });

  const fetchMarks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://college-management-system-sqtg.onrender.com/api/marks"
      );

      const data = await response.json();

      if (data.success) {
        setMarks(data.marks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarks();
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
        "https://college-management-system-sqtg.onrender.com/api/marks",
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
        alert("Marks added successfully");

        setForm({
          studentId: "",
          subject: "",
          marks: "",
          totalMarks: "100",
          exam: "",
        });

        setShowForm(false);
        fetchMarks();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const filteredMarks = marks.filter((item) =>
    `${item.studentId} ${item.subject} ${item.exam}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="management-page">
      <div className="management-page-header">
        <div>
          <h1>📈 Marks & Results</h1>
          <p>Manage student marks and results</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add Marks"}
        </button>
      </div>

      {showForm && (
        <div className="management-form-card">
          <h2>Add Marks</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="studentId"
              placeholder="Student ID"
              value={form.studentId}
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
              name="marks"
              type="number"
              placeholder="Marks Obtained"
              value={form.marks}
              onChange={handleChange}
              required
            />

            <input
              name="totalMarks"
              type="number"
              placeholder="Total Marks"
              value={form.totalMarks}
              onChange={handleChange}
              required
            />

            <input
              name="exam"
              placeholder="Exam Name"
              value={form.exam}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Save Marks
            </button>
          </form>
        </div>
      )}

      <div className="management-list-card">
        <div className="management-list-header">
          <h2>Results</h2>

          <input
            type="text"
            placeholder="Search results..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading results...</p>
        ) : filteredMarks.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="marks-table">
            {filteredMarks.map((item) => (
              <div className="marks-row" key={item._id}>
                <span>{item.studentId}</span>
                <span>{item.subject}</span>
                <span>
                  {item.marks} / {item.totalMarks}
                </span>
                <span>{item.exam}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksManagement;