import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username:"", email:"", password:"", role:"student", company_name:"" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await register(form);
      navigate(user.role === "student" ? "/dashboard" : "/company");
    } catch (err) {
      const data = err.response?.data;
      setError(data?.email?.[0] || data?.password?.[0] || data?.detail || "Registration failed.");
    }
  };

  return (
    <div className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <span className="eyebrow">GET STARTED</span>
        <h1>Create account</h1>
        {error && <div className="alert error">{error}</div>}
        <label>Username<input required value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/></label>
        <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Password<input type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
        <label>Account Type
          <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="student">Student</option>
            <option value="company">Company</option>
          </select>
        </label>
        {form.role === "company" && (
          <label>Company Name<input required value={form.company_name} onChange={e=>setForm({...form,company_name:e.target.value})}/></label>
        )}
        <button className="button primary full">Create Account</button>
        <p className="center">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
