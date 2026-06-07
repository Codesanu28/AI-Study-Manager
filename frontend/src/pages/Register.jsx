import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const res = await api.post(
    "/auth/register",
    formData
  );

  alert(
    res.data.message ||
    "Registration Successful"
  );

  navigate("/login");
} catch (error) {
  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );
}

};

return (
<div
style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background:
"linear-gradient(135deg, #0f172a, #1e293b)",
fontFamily: "Arial",
}}
>
<div
style={{
width: "420px",
background: "#fff",
padding: "35px",
borderRadius: "16px",
boxShadow:
"0 10px 30px rgba(0,0,0,0.25)",
}}
>
<h1
style={{
textAlign: "center",
color: "#1e293b",
marginBottom: "10px",
}}
>
AI Study Manager </h1>


    <p
      style={{
        textAlign: "center",
        color: "#64748b",
        marginBottom: "25px",
      }}
    >
      Create your account
    </p>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Create Account
      </button>
    </form>

    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <p
        style={{
          color: "#64748b",
        }}
      >
        Already have an account?
      </p>

      <button
        onClick={() =>
          navigate("/login")
        }
        style={{
          width: "100%",
          padding: "12px",
          border: "2px solid #2563eb",
          background: "#fff",
          color: "#2563eb",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Go To Login
      </button>
    </div>
  </div>
</div>


);
}

export default Register;
