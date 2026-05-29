import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {

    const res = await API.post("/auth/login", user);

    localStorage.setItem("token", res.data);

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Admin Login
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />
          <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="w-full border p-4 rounded-xl"
                    />

                    <button
                      onClick={login}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl"
                    >
                      Login
                    </button>

                  </div>

                </div>

              </div>
            );
          }

          export default Login;