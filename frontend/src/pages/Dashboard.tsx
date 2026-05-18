import { useEffect, useState } from "react";
import API from "../api/api";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

function Dashboard() {

  // LEADS STATE
  const [leads, setLeads] = useState<Lead[]>([]);

  // SEARCH STATE
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // FILTER STATE
  const [statusFilter, setStatusFilter] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // ROLE
  const role = localStorage.getItem("role");

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
  });

  // FETCH LEADS
  const fetchLeads = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        `/leads?search=${debouncedSearch}&status=${statusFilter}&page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(response.data.leads);

      setTotalPages(response.data.totalPages);

    } catch (error) {

      console.log(error);

    }
  };

  // DEBOUNCED SEARCH
  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search);

    }, 500);

    return () => clearTimeout(timer);

  }, [search]);

  // FETCH WHEN FILTER/PAGE CHANGES
  useEffect(() => {

    fetchLeads();

  }, [debouncedSearch, statusFilter, currentPage]);

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

  // CREATE LEAD
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/leads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lead Added Successfully");

      fetchLeads();

      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website",
      });

    } catch (error) {

      console.log(error);

    }
  };

  // EXPORT CSV
  const exportCSV = () => {

    const headers = [
      "Name",
      "Email",
      "Status",
      "Source",
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.status,
      lead.source,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const link = document.createElement("a");

    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);

    link.setAttribute(
      "download",
      "leads.csv"
    );

    link.style.visibility = "hidden";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // DELETE LEAD
  const deleteLead = async (
    id: string
  ) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lead Deleted");

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Smart Leads Dashboard 🚀
        </h1>

        <div className="flex gap-4">

          {/* EXPORT CSV BUTTON */}
          {role === "admin" && (

            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={exportCSV}
            >
              Export CSV
            </button>

          )}

          {/* LOGOUT BUTTON */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {

              localStorage.removeItem("token");

              localStorage.removeItem("role");

              window.location.href = "/";

            }}
          >
            Logout
          </button>

        </div>

      </div>

      {/* ADD LEAD FORM */}
      {role === "admin" && (

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Add Lead
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Lead Name"
              className="border p-3 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Lead Email"
              className="border p-3 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="status"
              className="border p-3 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.status}
              onChange={handleChange}
            >

              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>

            </select>

            <select
              name="source"
              className="border p-3 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.source}
              onChange={handleChange}
            >

              <option>Website</option>
              <option>Instagram</option>
              <option>Referral</option>

            </select>

            <button
              className="bg-blue-600 text-white p-3 rounded-lg col-span-2"
            >
              Add Lead
            </button>

          </form>

        </div>

      )}

      {/* SEARCH + FILTER */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search by name or email..."
            className="border p-3 rounded-lg flex-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="border p-3 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>

          </select>

        </div>

      </div>

      {/* LEADS TABLE */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-200 dark:bg-gray-700">

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Source
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr
                key={lead._id}
                className="border-b"
              >

                <td className="p-3">
                  {lead.name}
                </td>

                <td className="p-3">
                  {lead.email}
                </td>

                <td className="p-3">
                  {lead.status}
                </td>

                <td className="p-3">
                  {lead.source}
                </td>

                <td className="p-3">

                  {/* DELETE BUTTON */}
                  {role === "admin" && (

                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() =>
                        deleteLead(lead._id)
                      }
                    >
                      Delete
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">

        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() =>
              setCurrentPage(index + 1)
            }
          >
            {index + 1}
          </button>

        ))}

        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Dashboard;