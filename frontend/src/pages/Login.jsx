import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "student" ? "/dashboard" : user.role === "company" ? "/company" : "/admin");
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || "Invalid login details.");
    }
  };

  return (
    <div className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Login</h1>
        <p className="muted">Access your internship dashboard.</p>
        {error && <div className="alert error">{error}</div>}
        <label>Email<input type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></label>
        <label>Password<input type="password" required value={form.password} onChange={e => setForm({...form, password:e.target.value})} /></label>
        <button className="button primary full">Login</button>
        <p className="center">New here? <Link to="/register">Create an account</Link></p>
      </form>
    </div>
  );
}
