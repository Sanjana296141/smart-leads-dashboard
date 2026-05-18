import { useEffect, useState } from "react";

function Navbar() {

  const [darkMode, setDarkMode] = useState(false);

  // LOAD THEME
  useEffect(() => {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

      document.documentElement.classList.add("dark");

      setDarkMode(true);

    }

  }, []);

  // TOGGLE THEME
  const toggleTheme = () => {

    if (darkMode) {

      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");

    } else {

      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");

    }

    setDarkMode(!darkMode);

  };

  return (

    <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center transition">

      <h2 className="text-2xl font-bold text-black dark:text-white">
        Dashboard
      </h2>

      <div className="flex gap-4">

        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg text-black dark:text-white"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {

            localStorage.removeItem("token");

            window.location.href = "/";

          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;