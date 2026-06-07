import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
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

```
try {
  const res = await api.post(
    "/auth/login",
    formData
  );

  if (res.data.token) {
    localStorage.setItem(
      "token",
      res.data.token
    );
  }

  alert("Login Successful");
  navigate("/dashboard");
} catch (error) {
  alert(
    error.response?.data?.message ||
      "Login Failed"
  );
}
```

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
width: "400px",
background: "#ffffff",
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

```
    <p
      style={{
        textAlign: "center",
        color: "#64748b",
        marginBottom: "25px",
      }}
    >
      Login to continue
    </p>

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#2563eb",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Login
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
        Don't have an account?
      </p>

      <button
        onClick={() =>
          navigate("/register")
        }
        style={{
          width: "100%",
          padding: "12px",
          border: "2px solid #2563eb",
          borderRadius: "8px",
          background: "#fff",
          color: "#2563eb",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Create New Account
      </button>
    </div>
  </div>
</div>


);
}

export default Login;
