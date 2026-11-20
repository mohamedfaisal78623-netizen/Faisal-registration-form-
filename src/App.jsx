
import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    blood: "",
    register: "",
    department: "",
    year: "",
    semester: "",
    email: "",
    phone: "",
    address: ""
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (students.some(s => s.register === form.register.trim())) {
      setMessage("Register number already exists!");
      return;
    }

    setStudents([...students, {
      ...form,
      name: form.name.trim(),
      register: form.register.trim()
    }]);

    setMessage("Student registered successfully!");

    setForm({
      name: "", dob: "", gender: "", blood: "",
      register: "", department: "", year: "",
      semester: "", email: "", phone: "", address: ""
    });
  };

  const handleDelete = (register) => {
    setStudents(students.filter(s => s.register !== register));
  };

  const handleReset = () => {
    setForm({
      name: "", dob: "", gender: "", blood: "",
      register: "", department: "", year: "",
      semester: "", email: "", phone: "", address: ""
    });
    setMessage("");
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">C</div>
          <div>
            <h2>COLLEGE ERP</h2>
            <p>STUDENT MANAGEMENT SYSTEM</p>
          </div>
        </div>
        <span className="portal">ADMIN PORTAL</span>
      </header>

      <main className="container">
        <div className="heading">
          <span className="tag">STUDENT SERVICES</span>
          <h1>Student Registration</h1>
          <p>Register and manage student academic information.</p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <section>
            <h3>01. Personal Information</h3>
            <div className="grid">
              <div className="field">
                <label>Full Name *</label>
                <input name="name" value={form.name}
                  onChange={handleChange} placeholder="Enter full name"
                  required />
              </div>

              <div className="field">
                <label>Date of Birth *</label>
                <input type="date" name="dob" value={form.dob}
                  onChange={handleChange} required />
              </div>

              <div className="field">
                <label>Gender *</label>
                <select name="gender" value={form.gender}
                  onChange={handleChange} required>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field">
                <label>Blood Group</label>
                <select name="blood" value={form.blood}
                  onChange={handleChange}>
                  <option value="">Select blood group</option>
                  {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(x =>
                    <option key={x}>{x}</option>
                  )}
                </select>
              </div>
            </div>
          </section>

          <section>
            <h3>02. Academic Information</h3>
            <div className="grid">
              <div className="field">
                <label>Register Number *</label>
                <input name="register" value={form.register}
                  onChange={handleChange} placeholder="Enter register number"
                  required />
              </div>

              <div className="field">
                <label>Department *</label>
                <select name="department" value={form.department}
                  onChange={handleChange} required>
                  <option value="">Select department</option>
                  <option>Artificial Intelligence and Data Science</option>
                  <option>Computer Science Engineering</option>
                  <option>Information Technology</option>
                  <option>Electronics and Communication</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                </select>
              </div>

              <div className="field">
                <label>Academic Year *</label>
                <select name="year" value={form.year}
                  onChange={handleChange} required>
                  <option value="">Select year</option>
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Fourth Year</option>
                </select>
              </div>

              <div className="field">
                <label>Semester *</label>
                <select name="semester" value={form.semester}
                  onChange={handleChange} required>
                  <option value="">Select semester</option>
                  {[1,2,3,4,5,6,7,8].map(x =>
                    <option key={x}>Semester {x}</option>
                  )}
                </select>
              </div>
            </div>
          </section>

          <section>
            <h3>03. Contact Information</h3>
            <div className="grid">
              <div className="field">
                <label>Email Address *</label>
                <input type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="student@example.com"
                  required />
              </div>

              <div className="field">
                <label>Mobile Number *</label>
                <input type="tel" name="phone" value={form.phone}
                  onChange={handleChange} placeholder="10-digit mobile number"
                  pattern="[0-9]{10}" maxLength="10" required />
              </div>

              <div className="field full">
                <label>Residential Address *</label>
                <textarea name="address" value={form.address}
                  onChange={handleChange} placeholder="Enter your address"
                  required />
              </div>
            </div>
          </section>

          {message && <p className="message">{message}</p>}

          <div className="actions">
            <button type="button" className="reset" onClick={handleReset}>
              Reset Form
            </button>
            <button type="submit" className="submit">
              Register Student →
            </button>
          </div>
        </form>

        <div className="records">
          <div className="records-heading">
            <div>
              <h2>Registered Students</h2>
              <p>Student registration records</p>
            </div>
            <span className="count">{students.length} Students</span>
          </div>

          {students.length === 0 ? (
            <p className="empty">No student records available yet.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Register No.</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.register}>
                      <td>{s.name}</td>
                      <td>{s.register}</td>
                      <td>{s.department}</td>
                      <td>{s.year}</td>
                      <td>
                        <button type="button"
                          className="delete"
                          onClick={() => handleDelete(s.register)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer>© 2026 College ERP | Student Management Portal</footer>
      </main>
    </div>
  );
}

export default App;
