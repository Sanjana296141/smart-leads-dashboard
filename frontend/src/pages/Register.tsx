import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE REGISTER
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/");

    } catch (error: any) {

      alert(
        error.response.data.message
      );

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
          />

          {/* ROLE */}
          <select
            name="role"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
            value={formData.role}
            onChange={handleChange}
          >

            <option value="sales">
              Sales User
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          {/* BUTTON */}
          <button
            className="w-full bg-green-600 text-white p-3 rounded-lg"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;