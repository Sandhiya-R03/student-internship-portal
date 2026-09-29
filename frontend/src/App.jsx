import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Internships from "./pages/Internships";
import InternshipDetails from "./pages/InternshipDetails";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App(){
 return <Layout><Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/internships" element={<Internships/>}/>
  <Route path="/internships/:id" element={<ProtectedRoute><InternshipDetails/></ProtectedRoute>}/>
  <Route path="/dashboard" element={<ProtectedRoute role="student"><StudentDashboard/></ProtectedRoute>}/>
  <Route path="/profile" element={<ProtectedRoute role="student"><StudentProfile/></ProtectedRoute>}/>
  <Route path="/company" element={<ProtectedRoute role="company"><CompanyDashboard/></ProtectedRoute>}/>
  <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>}/>
 </Routes></Layout>
}
