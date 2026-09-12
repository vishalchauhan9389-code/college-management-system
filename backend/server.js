const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
const PORT = 5000;
const Student = require("./models/Student");
const Assignment = require("./models/Assignment");
const Marks = require("./models/Marks");
const Attendance = require("./models/Attendance");
const Teacher = require("./models/Teacher");
const Subject = require("./models/Subject");
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "College Management System Backend is running!",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend connection successful",
  });
});

app.post("/api/login", async (req, res) => {
  try {
    const { role, username, password } = req.body;

    const user = await User.findOne({
      role: role,
      username: username,
      password: password,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});
app.post("/api/seed-users", async (req, res) => {
  try {
    await User.deleteMany({});

    await User.insertMany([
      {
        role: "Student",
        username: "STU1001",
        password: "student123",
      },
      {
        role: "Teacher",
        username: "TCH1001",
        password: "teacher123",
      },
      {
        role: "Admin",
        username: "ADM1001",
        password: "admin123",
      },
      {
        role: "Management",
        username: "MGT1001",
        password: "management123",
      },
    ]);

    res.json({
      success: true,
      message: "All users added successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Users could not be added",
    });
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.post("/api/students", async (req, res) => {
  try {
    const { studentId, name, email, course, semester } = req.body;

    const student = new Student({
      studentId,
      name,
      email,
      course,
      semester,
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    console.error("Add student error:", error);

    res.status(500).json({
      success: false,
      message: "Student could not be added",
    });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Get students error:", error);

    res.status(500).json({
      success: false,
      message: "Could not fetch students",
    });
  }
});
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const deletedStudent = await Student.findOneAndDelete({ studentId });

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);

    res.status(500).json({
      success: false,
      message: "Student could not be deleted",
    });
  }
});
app.put("/api/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },
      {
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        semester: req.body.semester,
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Update student error:", error);

    res.status(500).json({
      success: false,
      message: "Student could not be updated",
    });
  }
});
// Get attendance
app.get("/api/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({ date: -1 });

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error("Fetch attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
});


// Save attendance
app.post("/api/attendance", async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    const attendance = await Attendance.findOneAndUpdate(
      { studentId, date },
      { studentId, date, status },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Attendance saved successfully",
      attendance,
    });
  } catch (error) {
    console.error("Save attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save attendance",
    });
  }
});
// Get assignments
app.get("/api/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      assignments,
    });
  } catch (error) {
    console.error("Fetch assignments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
    });
  }
});

// Add assignment
app.post("/api/assignments", async (req, res) => {
  try {
    const { title, subject, description, dueDate } = req.body;

    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Assignment added successfully",
      assignment,
    });
  } catch (error) {
    console.error("Add assignment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add assignment",
    });
  }
});

// Delete assignment
app.delete("/api/assignments/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    console.error("Delete assignment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete assignment",
    });
  }
});
// Get marks
app.get("/api/marks", async (req, res) => {
  try {
    const marks = await Marks.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      marks,
    });
  } catch (error) {
    console.error("Fetch marks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch marks",
    });
  }
});

// Add / update marks
app.post("/api/marks", async (req, res) => {
  try {
    const { studentId, subject, marks, totalMarks } = req.body;

    const result = await Marks.findOneAndUpdate(
      { studentId, subject },
      {
        studentId,
        subject,
        marks,
        totalMarks: totalMarks || 100,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Marks saved successfully",
      marks: result,
    });
  } catch (error) {
    console.error("Save marks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save marks",
    });
  }
});
app.post("/api/teachers", async (req, res) => {
  try {
    const { teacherId, name, email, subject, department } = req.body;

    const teacher = new Teacher({
      teacherId,
      name,
      email,
      subject,
      department,
    });

    await teacher.save();

    res.status(201).json({
      success: true,
      message: "Teacher added successfully",
      teacher,
    });
  } catch (error) {
    console.error("Add teacher error:", error);

    res.status(500).json({
      success: false,
      message: "Teacher could not be added",
    });
  }
});
app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      teachers,
    });
  } catch (error) {
    console.error("Fetch teachers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
    });
  }
});
app.post("/api/subjects", async (req, res) => {
  try {
    const { subjectId, name, department, semester, teacher } = req.body;

    const subject = new Subject({
      subjectId,
      name,
      department,
      semester,
      teacher,
    });

    await subject.save();

    res.status(201).json({
      success: true,
      message: "Subject added successfully",
      subject,
    });
  } catch (error) {
    console.error("Add subject error:", error);

    res.status(500).json({
      success: false,
      message: "Subject could not be added",
    });
  }
});
app.get("/api/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      subjects,
    });
  } catch (error) {
    console.error("Fetch subjects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch subjects",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});