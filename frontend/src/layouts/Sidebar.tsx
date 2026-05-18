function Sidebar() {

  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Smart CRM
      </h1>

      <ul className="space-y-4">

        <li className="hover:text-blue-400 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          Leads
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          Analytics
        </li>

      </ul>

    </div>

  );
}

export default Sidebar;